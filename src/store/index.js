import Vue from 'vue'
import Vuex from 'vuex'

import stickyNotes from './modules/stickyNotes.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    stickyNotes
  }
})
