import Vue from 'vue'
import Vuex from 'vuex'

import stickyNotes from './modules/stickyNotes.js'
import announcements from './modules/announcements.js'
import activityBlogs from './modules/activity-blogs.js'
import courses from './modules/courses.js'
import discussions from './modules/discussions.js'
import assignments from './modules/assignments.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stickyNotes,
    announcements,
    activityBlogs,
    courses,
    discussions,
    assignments
  }
})
