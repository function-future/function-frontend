import Vue from 'vue'
import Vuex from 'vuex'

import placeholder from './modules/placeholder'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    placeholder
  }
})
