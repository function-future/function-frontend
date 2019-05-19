import Vue from 'vue'
import Vuex from 'vuex'

import stickyNotes from './modules/stickyNotes.js'
import assignments from './modules/assignments.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stickyNotes,
    assignments
  }
})
