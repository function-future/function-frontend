import stickyNotesApi from '@/api/controller/sticky-notes'

const state = {
  noteTitle: '',
  noteDescription: '',
  updatedAt: ''
}

const mutations = {
  SET_STICKY_NOTES_INFO (state, payload) {
    state.noteTitle = payload.noteTitle
    state.noteDescription = payload.noteDescription
    state.updatedAt = payload.updatedAt
  }
}

const actions = {
    fetchStickyNotes ({ commit }, fail) {
    stickyNotesApi.getStickyNotes(({data: response}) => {
      const data = {
        noteTitle: response[0].title,
        noteDescription: response[0].description,
        updatedAt: response[0].updatedAt
      }
      commit('SET_STICKY_NOTES_INFO', data)
    }, fail)
  }
}

const getters = {
  stickyNotes (state) {
    let stickyNote = {
      noteTitle: state.noteTitle,
      noteDescription: state.noteDescription,
      updatedAt: state.updatedAt
    }
    return stickyNote || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
