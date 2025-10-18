#!/usr/bin/env bash
set -euo pipefail

# One-click deploy script for KCB Laravel backend on remote server
# Target directory: /jianda/dist3 (files of laravel backend placed directly here)

DIST_DIR="/jianda/dist3"
ROOT_DIR="$DIST_DIR"
NGINX_CONF_APT="/etc/nginx/sites-available/kcb.conf"
NGINX_ENABLED_APT="/etc/nginx/sites-enabled/kcb.conf"
NGINX_CONF_YUM="/etc/nginx/conf.d/kcb.conf"
SERVER_NAME="_"
APP_URL="http://101.43.167.131:5119"

# Detect package manager
if command -v apt-get >/dev/null 2>&1; then
  PKG=apt
elif command -v dnf >/dev/null 2>&1; then
  PKG=dnf
elif command -v yum >/dev/null 2>&1; then
  PKG=yum
else
  echo "Unsupported OS: no apt/dnf/yum found" >&2
  exit 1
fi

echo "[1/8] Ensure target directory exists: $DIST_DIR"
mkdir -p "$DIST_DIR"

# Install dependencies
install_deps_apt() {
  apt-get update
  DEBIAN_FRONTEND=noninteractive apt-get install -y nginx unzip curl \
    php-fpm php-cli php-mysql php-xml php-mbstring php-curl php-zip php-bcmath
}
install_deps_yum() {
  yum -y install epel-release || true
  yum -y install nginx unzip curl \
    php php-fpm php-cli php-mysqlnd php-xml php-mbstring php-curl php-zip php-bcmath
}
install_deps_dnf() {
  dnf -y install nginx unzip curl \
    php php-fpm php-cli php-mysqlnd php-xml php-mbstring php-curl php-zip php-bcmath
}

echo "[2/8] Installing Nginx, PHP-FPM, PHP extensions, unzip, curl"
case "$PKG" in
  apt) install_deps_apt ;;
  yum) install_deps_yum ;;
  dnf) install_deps_dnf ;;
esac

# Enable and start services
echo "[3/8] Enable and start Nginx and PHP-FPM"
if systemctl list-unit-files | grep -E "php.*fpm" >/dev/null 2>&1; then
  PHP_FPM_SERVICE=$(systemctl list-unit-files | awk '/php.*fpm/ {print $1; exit}')
else
  PHP_FPM_SERVICE="php-fpm"
fi
systemctl enable --now nginx || true
systemctl enable --now "$PHP_FPM_SERVICE" || true
systemctl restart "$PHP_FPM_SERVICE" || true

# Detect php-fpm socket
if [ -S /run/php/php8.2-fpm.sock ]; then FPM_PASS="unix:/run/php/php8.2-fpm.sock"
elif [ -S /run/php/php8.1-fpm.sock ]; then FPM_PASS="unix:/run/php/php8.1-fpm.sock"
elif [ -S /run/php/php7.4-fpm.sock ]; then FPM_PASS="unix:/run/php/php7.4-fpm.sock"
else FPM_PASS="127.0.0.1:9000"; fi

echo "[4/8] Install Composer if missing"
if ! command -v composer >/dev/null 2>&1; then
  php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
  php composer-setup.php --install-dir=/usr/local/bin --filename=composer
  rm -f composer-setup.php
fi

# Move into project dir
cd "$ROOT_DIR"

# Prepare .env if missing
echo "[5/8] Prepare .env"
if [ -f deploy/.env.production.example ]; then
  cp -n deploy/.env.production.example .env || true
fi
if [ ! -f .env ]; then
  echo "APP_NAME=KCB" > .env
  echo "APP_ENV=production" >> .env
  echo "APP_KEY=" >> .env
  echo "APP_DEBUG=false" >> .env
  echo "APP_URL=$APP_URL" >> .env
  echo "LOG_CHANNEL=stack" >> .env
  echo "LOG_LEVEL=info" >> .env
  echo "APP_TIMEZONE=Asia/Shanghai" >> .env
fi
# Force APP_ENV/DEBUG/URL
sed -i "s|^APP_ENV=.*|APP_ENV=production|" .env || true
sed -i "s|^APP_DEBUG=.*|APP_DEBUG=false|" .env || true
sed -i "s|^APP_URL=.*|APP_URL=$APP_URL|" .env || true

# Laravel install and optimize
echo "[6/8] Composer install and Laravel optimize"
composer install --no-dev --optimize-autoloader
php artisan key:generate --force
php artisan config:cache
php artisan route:cache || true
php artisan view:cache || true

# Permissions
echo "[7/8] Set storage and cache permissions"
WEB_USER="www-data"
WEB_GROUP="www-data"
if id nginx >/dev/null 2>&1; then WEB_USER="nginx"; WEB_GROUP="nginx"; fi
chown -R "$WEB_USER":"$WEB_GROUP" storage bootstrap/cache
find storage -type d -exec chmod 775 {} \;
chmod -R 775 bootstrap/cache

# Nginx config
echo "[8/8] Write Nginx site config and reload"
NGINX_CONF_CONTENT=$(cat <<CONF
server {
    listen 80;
    server_name $SERVER_NAME;
    root $ROOT_DIR/public;
    index index.php index.html;
    charset utf-8;
    client_max_body_size 32M;

    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }
    location ~ \.php$ {
        try_files \$uri =404;
        fastcgi_pass $FPM_PASS;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        fastcgi_param DOCUMENT_ROOT \$realpath_root;
    }
    location ~ /\.ht { deny all; }
}
CONF
)

if [ "$PKG" = apt ]; then
  echo "$NGINX_CONF_CONTENT" > "$NGINX_CONF_APT"
  ln -sf "$NGINX_CONF_APT" "$NGINX_ENABLED_APT"
else
  echo "$NGINX_CONF_CONTENT" > "$NGINX_CONF_YUM"
fi

nginx -t
systemctl reload nginx

# Health check
sleep 1
HC1=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1/ || echo 000)
HC2=$(curl -s -o /dev/null -w '%{http_code}' -X POST http://127.0.0.1/api/init -d "school_id=1" || echo 000)

echo "Nginx / status: $HC1, API /api/init status: $HC2"
if [ "$HC2" != "200" ]; then
  echo "Warning: /api/init did not return 200. Check storage/logs/laravel.log and .env DB settings." >&2
fi

echo "Deploy completed. Point frontend BASE_URL to $APP_URL/api/"