import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import login from '../components/login/login.vue'
import admin from '../components/admin/admin.vue'
import teacher from '../components/teacher/teacher.vue'

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
      name: 'admin',
      path: '/admin',
      component: admin
    },
    {
      name: 'teacher',
      path: '/teacher',
      component: teacher
    }
  ]
})