import userApi from '@/api/controller/users'
import resourceApi from '@/api/controller/resources'

export const state = {
  userList: {
    students: [],
    admins: [],
    mentors: [],
    judges: []
  },
  user: {}
}

export const mutations = {
  SET_STUDENTS (state, payload) {
    state.userList.students = [ ...payload ]
  },
  SET_ADMINS (state, payload) {
    state.userList.admins = [ ...payload ]
  },
  SET_MENTORS (state, payload) {
    state.userList.mentors = [ ...payload ]
  },
  SET_JUDGES (state, payload) {
    state.userList.judges = [ ...payload ]
  },
  SET_USER_BY_ID (state, payload) {
    state.user = { ...payload }
  }
}

export const actions = {
  initialState ({ commit }) {
    commit('SET_USER_BY_ID', {})
  },
  fetchUsersByRole ({ commit }, { data, callback, fail }) {
    userApi.getUserList((response) => {
      callback(response)
    }, data, fail)
  },
  fetchUsersByRoleAndName ({ commit }, { data, callback, fail }) {
    userApi.getUserListWithRoleAndName((response) => {
      callback(response)
    }, data, fail)
  },
  fetchStudentsByBatch ({ commit }, { data, callback, fail }) {
    userApi.getUserListWithBatch((response) => {
      callback(response)
    }, data, fail)
  },
  setStudentList ({ commit }, { data }) {
    commit('SET_STUDENTS', data)
  },
  setAdminList ({ commit }, { data }) {
    commit('SET_ADMINS', data)
  },
  setMentorList ({ commit }, { data }) {
    commit('SET_MENTORS', data)
  },
  setJudgeList ({ commit }, { data }) {
    commit('SET_JUDGES', data)
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
  },
  uploadProfilePicture ({ commit }, { data, configuration, callback, fail }) {
    resourceApi.uploadResource(({ data: response }) => {
      callback(response)
    }, data, fail, configuration)
  }
}

export const getters = {
  students (state) {
    return state.userList.students
  },
  admins (state) {
    return state.userList.admins
  },
  mentors (state) {
    return state.userList.mentors
  },
  judges (state) {
    return state.userList.judges
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
