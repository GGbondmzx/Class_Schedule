import App from './App'


// #ifndef VUE3
import Vue from 'vue'

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import { myRequest } from './http/api.js' // 引入api文件
// Vue.prototype.$http = myRequest // 挂载到原型上
export function createApp() {
  const app = createSSRApp(App)
  app.config.globalProperties.$http =myRequest
  return {
    app
  }
}
// #endif