import api from '@/api/controller/files'

export const state = {
  files: []
}

export const mutations = {
  SET_FILES (state, payload) {
    state.files = { ...payload }
  }
}

export const actions = {
  fetchFiles ({ commit }, { data, callback, fail }) {
    api.getFileList(({ data: response }) => {
      commit('SET_FILES', response)
      callback(response)
    }, data, fail)
  },
  createFolder ({ commit }, { data, configuration, callback, fail }) {
    api.createFolder(({ data: response }) => {
      callback(response)
    }, data, fail, configuration)
  },
  uploadFile ({ commit }, { data, configuration, callback, fail }) {
    api.uploadFile(({ data: response }) => {
      callback(response)
    }, data, fail, configuration)
  },
  deleteFile ({ commit }, { data, callback, fail }) {
    api.deleteFile(({ data: response }) => {
      callback()
    }, data, fail)
  },
  downloadFile ({ commit }, { data, configuration, callback, fail }) {
    api.downloadFile(({ data: response }) => {
      callback(response)
    }, data, fail, configuration)
  },
  getFileDetail ({ commit }, { data, callback, fail }) {
    api.getFileDetail(({ data: response }) => {
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
