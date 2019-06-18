import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = () => import('../components/login/login.vue')
const admin = () => import('../components/admin/admin.vue')
const teacher = () => import('../components/teacher/teacher.vue')
const student = () => import('../components/student/student.vue')

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
    },
    {
      name: 'student',
      path: '/student',
      component: student
    }
  ]
})