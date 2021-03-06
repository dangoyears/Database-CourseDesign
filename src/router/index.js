import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = () => import('../components/login/login.vue')
const admin = () => import('../components/admin/admin.vue')
const teacher = () => import('../components/teacher/teacher.vue')
const student = () => import('../components/student/student.vue')

export default new Router({
  // mode: 'history',
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
      component: admin,
      meta: {
        auth: true
      }
    },
    {
      name: 'teacher',
      path: '/teacher',
      component: teacher,
      meta: {
        auth: true
      }
    },
    {
      name: 'student',
      path: '/student',
      component: student,
      meta: {
        auth: true
      }
    }
  ]
})