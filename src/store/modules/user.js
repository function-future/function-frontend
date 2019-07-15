import api from '@/api/controller/user'

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
