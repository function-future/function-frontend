import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth.js'
import user from './modules/user.js'
import stickyNotes from './modules/stickyNotes.js'
import announcements from './modules/announcements.js'
import activityBlogs from './modules/activity-blogs.js'
import users from './modules/users.js'
import batches from './modules/batches.js'
import courses from './modules/courses.js'
import discussions from './modules/discussions.js'
import assignments from './modules/assignments.js'
import chatrooms from './modules/chatrooms'
import assignmentRooms from './modules/assignment-rooms'
import quizzes from './modules/quizzes'
import studentQuizzes from './modules/student-quiz'
import questionBanks from './modules/question-banks'
import points from './modules/points'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    user,
    stickyNotes,
    announcements,
    activityBlogs,
    users,
    batches,
    courses,
    discussions,
    assignments,
    chatrooms,
    assignmentRooms,
    quizzes,
    studentQuizzes,
    questionBanks,
    points
  }
})
