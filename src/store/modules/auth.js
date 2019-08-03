import authApi from '@/api/controller/auth'
import configApi from '@/api/controller/config'

export const state = {
  currentUser: {},
  menuList: {},
  accessList: {}
}

export const mutations = {
  SET_CURRENT_USER (state, payload) {
    state.currentUser = { ...payload }
  },
  SET_MENU_LIST (state, payload) {
    state.menuList = { ...payload }
  },
  SET_ACCESS_LIST (state, payload) {
    state.accessList = { ...payload }
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
    authApi.attemptLogout(() => {
      commit('SET_CURRENT_USER', {})
      callback()
    }, fail)
  },
  getMenuList ({ commit }) {
    configApi.getMenuList((response) => {
      commit('SET_MENU_LIST', response)
    })
  },
  getAccessList ({ commit }, { data, callback, fail } = {}) {
    configApi.getAccessList((response) => {
      commit('SET_ACCESS_LIST', response)
      callback()
    }, data, fail)
  },
  setCurrentUser ({ commit }, { data }) {
    commit('SET_CURRENT_USER', data)
  },
  setMenuList ({ commit }, { data }) {
    commit('SET_MENU_LIST', data)
  }
}

export const getters = {
  currentUser (state) {
    return state.currentUser
  },
  menuList (state) {
    return state.menuList
  },
  accessList (state) {
    return state.accessList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
