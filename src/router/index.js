import Vue from 'vue'
import Router from 'vue-router'
import feeds from '../views/Feeds/Feeds.vue'
import announcements from '../views/Announcements/Announcements.vue'
import blogs from '../views/ActivityBlogs/ActivityBlogs.vue'
import users from '../views/Users/Users.vue'
import stickyNotes from '../views/StickyNotes/StickyNotesDetail.vue'
import addStickyNote from '../views/StickyNotes/AddStickyNote.vue'
import config from '../config/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: config.app.pages.feeds,
      name: 'feeds',
      component: feeds,
      meta: {
        title: 'Feeds'
      }
    },
    {
      path: config.app.pages.blogs,
      name: 'blogs',
      component: blogs,
      meta: {
        title: 'Activity Blogs'
      }
    },
    {
      path: config.app.pages.announcements,
      name: 'announcements',
      component: announcements,
      meta: {
        title: 'Announcements'
      }
    },
    {
      path: config.app.pages.courses,
      name: 'courses',
      component: feeds,
      meta: {
        title: 'Courses'
      }
    },
    {
      path: config.app.pages.files,
      name: 'files',
      component: feeds,
      meta: {
        title: 'Files'
      }
    },
    {
      path: config.app.pages.users,
      name: 'users',
      component: users,
      meta: {
        title: 'Users'
      }
    },
    {
      path: config.app.pages.grades,
      name: 'grades',
      component: feeds,
      meta: {
        title: 'Grades'
      }
    },
    {
      path: config.app.pages.stickyNotes.list,
      name: 'stickyNotes',
      component: stickyNotes,
      meta: {
        title: 'Sticky Notes'
      }
    },
    {
      path: config.app.pages.stickyNotes.add,
      name: 'addStickyNote',
      component: addStickyNote,
      meta: {
        title: 'Add Sticky Notes'
      }
    }
  ]
})
