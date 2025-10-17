import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/user/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [{
      path: 'pic-manage',
      name: 'pic-manage',
      component: () => import('../views/picture/manage.vue')
    },{
      path: 'news-manage',
      name: 'news-manage',
      component: () => import('../views/news/manage.vue')
    },{
      path: 'sys-setting',
      name: 'sys-setting',
      component: () => import('../views/setting/setting.vue')
    }]
  },
]





const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.afterEach((to, from) => {
  console.log(to, from);
  console.log(Date.now());
  if (to.fullPath !== '/') {
    if (Date.now() > localStorage.getItem("expire")) {
      console.log(Date.now());
      localStorage.clear();
      router.push('/')
    }
  }
})


export default router
