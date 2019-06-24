import stickyNotesApi from '@/api/controller/sticky-notes'

export const state = {
  stickyNote: {
    noteTitle: '',
    noteDescription: '',
    updatedAt: ''
  }
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
      const data = {
        title: response[0].title,
        description: response[0].description,
        updatedAt: response[0].updatedAt
      }
      commit('SET_STICKY_NOTES_INFO', data)
      callback()
    }, fail)
  },
  postStickyNotes ({ commit }, { data, callback, fail }) {
    stickyNotesApi.createStickyNote(({ data: response }) => {
      commit('SET_STICKY_NOTES_INFO', response)
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
