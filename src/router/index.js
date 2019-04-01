import Vue from 'vue'
import Router from 'vue-router'
import feeds from '../views/Feeds.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'feeds',
      component: feeds
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: feeds
    },
    {
      path: '/announcements',
      name: 'announcements',
      component: feeds
    },
    {
      path: '/courses',
      name: 'courses',
      component: feeds
    },
    {
      path: '/files',
      name: 'files',
      component: feeds
    },
    {
      path: '/users',
      name: 'users',
      component: feeds
    },
    {
      path: '/grades',
      name: 'grades',
      component: feeds
    }
  ]
})
