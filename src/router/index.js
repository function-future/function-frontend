import Vue from 'vue'
import Router from 'vue-router'
import feeds from '@/views/Feeds/Feeds.vue'
import announcements from '@/views/Announcements/Announcements.vue'
import activityBlogs from '@/views/ActivityBlogs/ActivityBlogs.vue'
import activityBlogDetail from '@/views/ActivityBlogs/ActivityBlogDetail.vue'
import editActivityBlog from '@/views/ActivityBlogs/EditActivityBlog.vue'
import users from '@/views/Users/Users.vue'
import stickyNotes from '@/views/StickyNotes/StickyNotesDetail.vue'
import editStickyNote from '@/views/StickyNotes/EditStickyNote.vue'
import config from '@/config/index'

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
      path: config.app.pages.activityBlogs.list,
      name: 'activityBlogs',
      component: activityBlogs,
      meta: {
        title: 'Activity Blogs'
      }
    },
    {
      path: config.app.pages.activityBlogs.detail,
      name: 'activityBlogDetail',
      component: activityBlogDetail,
      meta: {
        title: 'Activity Blog Detail'
      }
    },
    {
      path: config.app.pages.activityBlogs.edit,
      name: 'editActivityBlog',
      component: editActivityBlog,
      meta: {
        title: 'Edit Activity Blog'
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
      path: config.app.pages.stickyNotes.detail,
      name: 'stickyNotes',
      component: stickyNotes,
      meta: {
        title: 'Sticky Notes'
      }
    },
    {
      path: config.app.pages.stickyNotes.edit,
      name: 'editStickyNote',
      component: editStickyNote,
      meta: {
        title: 'Edit Sticky Notes'
      }
    }
  ]
})
