import userApi from '@/api/controller/users'

export const state = {
  userList: [],
  user: {}
}

export const mutations = {
  SET_USERS (state, payload) {
    state.userList = [ ...payload ]
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
    userApi.getUserList((response) => {
      // commit('SET_USERS', response)
      callback(response)
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
  userList (state) {
    return state.userList
  },
  user (state) {
    return state.user
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
