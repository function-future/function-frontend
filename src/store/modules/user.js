import api from '@/api/controller/user'
import resourceApi from '@/api/controller/resources'

export const state = {
  profile: {}
}

export const mutations = {
  SET_PROFILE (state, payload) {
    state.profile = { ...payload }
  }
}

export const actions = {
  fetchProfile ({ commit }, { callback, fail }) {
    api.getProfileData(({ data: response }) => {
      commit('SET_PROFILE', response)
      callback(response)
    }, fail)
  },
  changePassword ({ commit }, { data, callback, fail }) {
    api.changePassword(({ data: response }) => {
      callback(response)
    }, data, fail)
  },
  uploadProfilePicture ({ commit }, { data, configuration, callback, fail }) {
    resourceApi.uploadResource(({ data: response }) => {
      callback(response)
    }, data, fail, configuration)
  }
}

export const getters = {
  profile (state) {
    return state.profile
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
