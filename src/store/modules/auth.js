import authApi from '@/api/controller/auth'
import menuListApi from '@/api/controller/menu-list'

export const state = {
  currentUser: {},
  menuList: {}
}

export const mutations = {
  SET_CURRENT_USER (state, payload) {
    state.currentUser = { ...payload }
  },
  SET_MENU_LIST (state, payload) {
    state.menuList = { ...payload }
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
  },
  getMenuList ({ commit }) {
    menuListApi.getMenuList((response) => {
      commit('SET_MENU_LIST', response)
    })
  }
}

export const getters = {
  currentUser (state) {
    return state.currentUser
  },
  menuList (state) {
    return state.menuList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
