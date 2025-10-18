# KCB 后端生产部署指南

本指南适用于将 `MiniProgram/laravel后端` 部署到远程服务器（推荐 Ubuntu + Nginx + PHP-FPM）。其他环境（CentOS、宝塔、IIS、Docker）也可参考。

## 环境要求
- PHP `>= 8.0.2`，建议 `8.2`
- PHP 扩展：`pdo_mysql`、`openssl`、`mbstring`、`curl`、`xml`、`ctype`、`json`、`bcmath`、`zip`
- Composer `>= 2.x`
- Nginx + PHP-FPM（或 Apache + mod_php/FPM）
- MySQL 数据库（可用外部数据库）
- HTTPS 证书（微信小程序真机必须）

## 1. 安装依赖（Ubuntu 示例）
```bash
sudo apt update
sudo apt install -y nginx git unzip
sudo apt install -y php8.2-fpm php8.2-cli php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl php8.2-zip php8.2-bcmath php8.2-gd
# 安装 Composer
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
composer -V
```

## 2. 上传/拉取代码
- 推荐路径：`/var/www/kcb`（可自定义）
- 将仓库内容复制到服务器（SCP/SFTP）或拉取代码：
```bash
sudo mkdir -p /var/www/kcb
sudo chown -R $USER:$USER /var/www/kcb
# 将本地代码上传至 /var/www/kcb
```

## 3. 环境配置
进入 `MiniProgram/laravel后端`：
```bash
cd /var/www/kcb/MiniProgram/laravel后端
cp deploy/.env.production.example .env
php artisan key:generate
```
修改 `.env`：
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://your-domain.com`
- `DB_HOST`、`DB_PORT`、`DB_DATABASE`、`DB_USERNAME`、`DB_PASSWORD`
- （可选）`WECHAT_MINI_APPID`、`WECHAT_MINI_SECRET`

## 4. 安装依赖与优化
```bash
composer install --no-dev --optimize-autoloader
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## 5. 权限与日志
```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo find storage -type d -exec chmod 775 {} \;
sudo chmod -R 775 bootstrap/cache
```
查看 Laravel 日志：`storage/logs/laravel.log`

## 6. Nginx 站点配置
将示例配置复制启用（按需调整路径与 PHP-FPM）：
```bash
sudo cp deploy/nginx.kcb.conf.example /etc/nginx/sites-available/kcb.conf
sudo ln -s /etc/nginx/sites-available/kcb.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```
- 配置中的 `root` 应指向 `.../laravel后端/public`
- `fastcgi_pass` 使用 `unix:/run/php/php8.2-fpm.sock` 或 `127.0.0.1:9000`
- 如需 HTTPS，先用 `certbot` 签发证书：
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 7. 健康检查
```bash
# 基础页面
curl -I https://your-domain.com/
# API 测试（需要 POST）
curl -X POST https://your-domain.com/api/getStartDay -d "school_id=1"
curl -X POST https://your-domain.com/api/init -d "school_id=1"
```
返回 `{"code":200,...}` 表示连通性正常。

## 8. 微信小程序域名校验
- 后台 → 开发设置 → `request合法域名` 添加：`https://your-domain.com`
- 必须使用 HTTPS 有效证书，端口 `443`
- 开发者工具可勾选“不校验合法域名…”进行调试；真机必须配置白名单
- 前端 `BASE_URL` 改为：`https://your-domain.com/api/`

## 9. 常见问题
- 500 错误：检查 `.env`、数据库连通性、`storage` 权限、PHP 扩展
- 404/405：确认使用 `POST` 而非 `GET`；Nginx `try_files` 指向 `index.php`
- 真机无法访问：前端不得使用 `localhost/127.0.0.1`，改为公网域名，且在白名单

## 10. 备选环境
- 宝塔/BT 面板：站点运行目录指向 `public`，PHP 版本>=8.0，按面板配置 FPM 与伪静态（可导入本示例）
- Windows + IIS：站点根指向 `public`，启用 URL Rewrite，添加 Laravel 规则；安装 PHP + FastCGI
- Docker：可使用 `nginx:alpine` + `php:8.2-fpm` 组合，挂载代码与 `.env`，Nginx 配置与上文一致

---
如需，我可以根据你的实际服务器类型（云厂商、操作系统、面板或是否用 Docker）生成专属命令与配置文件，并一键适配 PHP-FPM 套接字、`root` 路径和证书配置。