import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// import fetch from 'vue-fetch'
import ElementUI from 'element-ui'

Vue.use(ElementUI, { size: 'small' })
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
