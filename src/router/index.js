import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: Home
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: Home
    },
    {
      path: '/courses',
      name: 'courses',
      component: Home
    },
    {
      path: '/files',
      name: 'files',
      component: Home
    },
    {
      path: '/users',
      name: 'users',
      component: Home
    },
    {
      path: '/grades',
      name: 'grades',
      component: Home
    }
  ]
})
