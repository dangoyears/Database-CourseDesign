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
// 导航守卫路由跳转时判断是否已登陆
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)) {
    let sessionData = sessionStorage.getItem("DBcourse-login");
    if(!sessionData) {
      next({
        name: 'login'
      });
    }
  }
  else {
    next();
  }
})