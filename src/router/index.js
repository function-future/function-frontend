import Vue from 'vue'
import Router from 'vue-router'
import assignments from '@/views/Assignment/Assignment'
import addAssignment from '@/views/Assignment/AddAssignment'
import quizzes from '@/views/Quiz/Quiz'
import feeds from '@/views/Feeds/Feeds.vue'
import announcements from '@/views/Announcements/Announcements.vue'
import announcementDetail from '@/views/Announcements/AnnouncementDetail.vue'
import announcementForm from '@/views/Announcements/AnnouncementForm.vue'
import blogs from '@/views/ActivityBlogs/ActivityBlogs.vue'
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
      path: config.app.pages.blogs,
      name: 'blogs',
      component: blogs,
      meta: {
        title: 'Activity Blogs'
      }
    },
    {
      path: config.app.pages.announcements.list,
      name: 'announcements',
      component: announcements,
      meta: {
        title: 'Announcements'
      }
    },
    {
      path: config.app.pages.announcements.detail,
      name: 'announcementDetail',
      component: announcementDetail,
      meta: {
        title: 'Announcements Detail'
      }
    },
    {
      path: config.app.pages.announcements.edit,
      name: 'editAnnouncement',
      component: announcementForm,
      meta: {
        title: 'Edit Announcements'
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.announcements.add,
      name: 'addAnnouncement',
      component: announcementForm,
      meta: {
        title: 'Add Announcements'
      },
      props: { editMode: false }
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
        title: 'users'
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
        title: 'Edit Sticky Note'
      }
    },
    {
      path: config.app.pages.quizzes,
      name: 'quizzes',
      component: quizzes,
      meta: {
        title: 'Quizzes'
      }
    },
    {
      path: config.app.pages.assignments.list,
      name: 'assignments',
      component: assignments,
      meta: {
        title: 'Assignments'
      }
    },
    {
      path: config.app.pages.assignments.add,
      name: 'addAssignment',
      component: addAssignment,
      meta: {
        title: 'Add Assignment'
      }
    },
    {
      path: config.app.pages.finalJudging,
      name: 'finalJudging',
      component: feeds
    }
  ]
})
