
// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import App from './App'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
Vue.prototype.base_url = "http://192.168.110.21:9001" //指向服务器的IP地址
// Vue.prototype.base_url = "http://192.168.1.9:9001" //指向服务器的IP地址
