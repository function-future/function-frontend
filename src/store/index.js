import Vue from 'vue'
import Vuex from 'vuex'

import stickyNotes from './modules/stickyNotes.js'
import announcements from './modules/announcements.js'
import assignments from './modules/assignments.js'
import assignmentRooms from './modules/assignment-rooms'
import quizzes from './modules/quizzes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stickyNotes,
    announcements,
    assignments,
    assignmentRooms,
    quizzes
  }
})
