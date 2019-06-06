import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import login from '../components/login.vue'
import manager from '../components/manager.vue'

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