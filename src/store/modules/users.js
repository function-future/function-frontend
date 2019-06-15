import userApi from '@/api/controller/users'

export const state = {
  userList: [],
  user: {}
}

export const mutations = {
  SET_USERS (state, payload) {
    state.announcementList = [ ...payload ]
  },
  SET_USER_BY_ID (state, payload) {
    state.user = { ...payload }
  }
}

export const actions = {
  initialState ({ commit }) {
    commit('SET_USER_BY_ID', {})
    commit('SET_USERS', [])
  },
  fetchUsers ({ commit }, { data, callback, fail }) {
    userApi.getUserList(({ data: response }) => {
      commit('SET_USERS', response)
      callback()
    }, data, fail)
  },
  fetchUserById ({ commit }, { data, callback, fail }) {
    userApi.getUserDetail(({ data: response }) => {
      commit('SET_USER_BY_ID', response)
      callback()
    }, data, fail)
  },
  createUser ({ commit }, { data, callback, fail }) {
    userApi.createUser(({ data: response }) => {
      commit('SET_USER_BY_ID', response)
      callback()
    }, data, fail)
  },
  updateUser ({ commit }, { data, callback, fail }) {
    userApi.updateUser(({ data: response }) => {
      commit('SET_USER_BY_ID', response)
      callback()
    }, data, fail)
  },
  deleteUserById ({ state }, { data, callback, fail }) {
    userApi.deleteUser(() => {
      callback()
    }, data, fail)
  }
}

export const getters = {
  announcementList (state) {
    return state.announcementList
  },
  announcement (state) {
    return state.announcement
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
