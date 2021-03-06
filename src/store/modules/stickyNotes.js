import stickyNotesApi from '@/api/controller/sticky-notes'

export const state = {
  stickyNote: {}
}

export const mutations = {
  SET_STICKY_NOTES_INFO (state, payload) {
    state.stickyNote = { ...payload }
  }
}

export const actions = {
  initialState ({ commit }) {
    commit('SET_STICKY_NOTES_INFO', {})
  },
  fetchStickyNotes ({ commit }, { callback, fail }) {
    stickyNotesApi.getStickyNote(({ data: response }) => {
      commit('SET_STICKY_NOTES_INFO', response)
      callback()
    }, fail)
  },
  postStickyNotes ({ commit }, { data, callback, fail }) {
    stickyNotesApi.createStickyNote(({ data: response }) => {
      callback()
    }, data, fail)
  }
}

export const getters = {
  stickyNotes (state) {
    return state.stickyNote
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
