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
  fetchStickyNotes ({ commit }, fail) {
    stickyNotesApi.getStickyNote(({ data: response }) => {
      const data = {
        noteTitle: response[0].title,
        noteDescription: response[0].description,
        updatedAt: response[0].updatedAt
      }
      commit('SET_STICKY_NOTES_INFO', data)
    }, fail)
  },
  postStickyNotes ({ commit }, { data, fail }) {
    stickyNotesApi.createStickyNote(({ data }), data, fail)
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
