import assignmentApi from '@/api/controller/assignments'

export const state = {
  assignmentList: [],
  assignment: {}
}

export const mutations = {
  GET_ASSIGNMENT_LIST (state, payload) {
    state.assignmentList = payload
  },
  SET_ASSIGNMENT (state, payload) {
    state.assignment = payload
  }
}

export const actions = {
  fetchAssignmentList ({ commit }, { data, fail }) {
    assignmentApi.getAssignmentsList(({data: response}) => {
      commit('GET_ASSIGNMENT_LIST', response)
    }, data, fail)
  },
  createAssignment ({ commit }, { payload, data, callback, fail }) {
    assignmentApi.createAssignment(() => {
      commit('SET_ASSIGNMENT', payload)
      console.log(state.assignment)
      callback()
    }, data, payload, fail)
  },
  fetchAssignmentDetail ({ commit }, { data, callback, fail }) {
    assignmentApi.getAssignmentById(({data: response}) => {
      commit('SET_ASSIGNMENT', response)
      callback()
    }, data, fail)
  }
}

export const getters = {
  assignmentList (state) {
    return state.assignmentList
  },
  assignment (state) {
    return state.assignment
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
