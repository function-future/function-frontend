import Vue from 'vue'
import Router from 'vue-router'
import feeds from '../views/Feeds.vue'
import announcements from '../views/Announcements.vue'
import blogs from '../views/ActivityBlogs.vue'
import quizzes from '../views/Quiz'
import config from '../config/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: config.app.pages.feeds,
      name: 'feeds',
      component: feeds
    },
    {
      path: config.app.pages.blogs,
      name: 'blogs',
      component: blogs
    },
    {
      path: config.app.pages.announcements,
      name: 'announcements',
      component: announcements
    },
    {
      path: config.app.pages.courses,
      name: 'courses',
      component: feeds
    },
    {
      path: config.app.pages.files,
      name: 'files',
      component: feeds
    },
    {
      path: config.app.pages.users,
      name: 'users',
      component: feeds
    },
    {
      path: config.app.pages.quizzes,
      name: 'quizzes',
      component: quizzes
    },
    {
      path: config.app.pages.assignments,
      name: 'assignments',
      component: feeds
    },
    {
      path: config.app.pages.finalComparisons,
      name: 'finalComparisons',
      component: feeds
    }
  ]
})
