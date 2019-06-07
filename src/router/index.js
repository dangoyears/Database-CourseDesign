import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import login from '../components/login/login.vue'
import manager from '../components/manager/manager.vue'

export default new Router({
  routes: [
    {
      path: '',
      component: login
    },
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'manager',
      path: '/manager',
      component: manager
    }
  ]
})