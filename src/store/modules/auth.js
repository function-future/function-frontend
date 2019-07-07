import authApi from '@/api/controller/auth'

export const state = {
  currentUser: {}
}

export const mutations = {
  SET_CURRENT_USER (state, payload) {
    state.currentUser = { ...payload }
  }
}

export const actions = {
  attemptLogin ({ commit }, { data, callback, fail }) {
    authApi.attemptLogin(({ data: response }) => {
      commit('SET_CURRENT_USER', response)
      callback()
    }, data, fail)
  },
  getLoginStatus ({ commit }, { callback, fail }) {
    authApi.getLoginStatus(({ data: response }) => {
      commit('SET_CURRENT_USER', response)
      callback()
    }, fail)
  },
  attemptLogout ({ commit }, { callback, fail }) {
    authApi.attemptLogout(({ data: response }) => {
      commit('SET_CURRENT_USER', {})
      callback()
    }, fail)
  }
}

export const getters = {
  currentUser (state) {
    return state.currentUser
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
