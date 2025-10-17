<template>
  <div>
    <!-- 搭建页面的主体结构 -->
    <el-container>
      <el-header class="header">
        柏学于扬
        <div class="userinfo" v-if="token">
          <span @click="logout()">[注销]</span>
        </div>
        <div class="userinfo" v-else>
          未登录
        </div>
      </el-header>

      <el-container>
        <el-aside width="200px" class="scroll-container aside">
          <!-- 垂直导航 -->
          <el-menu :router=true unique-opened :default-active="this.$route.path" style="border-right: none"
            background-color="#333" text-color="#ddd" active-text-color="#fff">
            <el-submenu index="picture">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">轮播图</span>
              </template>
              <el-menu-item index="/home/pic-manage">
                <i class="el-icon-menu"></i>
                <span>轮播图管理</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="news">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">校园头条</span>
              </template>
              <el-menu-item index="/home/news-manage">
                <i class="el-icon-menu"></i>
                <span>头条管理</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="setting">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span slot="title">系统设置</span>
              </template>
              <el-menu-item index="/home/sys-setting">
                <i class="el-icon-menu"></i>
                <span>系统设置</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      token:''
    }
  },
  created () {
    this.getToken();
  },
  methods: {
    logout() {
      // 调用vuex的方法注销用户信息
      localStorage.clear()
      this.$router.push('/')
    },
    getToken(){
      this.token = localStorage.getItem('token')
    }
  },
}
</script>

<style scoped>
.header {
  background-color: #333;
  color: #fff;
  line-height: 60px;
  font-size: 1.3em;
}

.aside {
  background-color: #333;
  height: calc(100vh - 60px);
}

.main {
  height: calc(100vh - 60px);
}

.el-menu-item.is-active {
  font-weight: bold;
}

.userinfo {
  color: white;
  float: right;
  font-size: 16px;
}

.userinfo span:hover {
  color: #999;
  cursor: pointer;
}
</style>
