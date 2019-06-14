import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Element from 'element-ui'
import base from './base/index'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(Element)
Vue.use(base)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
