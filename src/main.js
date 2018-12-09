import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import fetch from 'vue-fetch'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css'
import "babel-polyfill"
import VueLazyLoad from 'vue-lazyload'

Vue.use(ElementUI, { size: 'small' })
Vue.use(VueLazyLoad)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
