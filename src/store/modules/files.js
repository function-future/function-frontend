import api from '@/api/controller/files'

export const state = {
  files: []
}

export const mutations = {
  SET_FILES (state, payload) {
    state.files = [ ...payload ]
  }
}

export const actions = {
  fetchFiles ({ commit }, { data, callback, fail }) {
    api.getFileList(({ data: response }) => {
      commit('SET_FILES', response)
      callback(response)
    }, data, fail)
  }
}

export const getters = {
  files (state) {
    return state.files
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
