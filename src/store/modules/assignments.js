import assignmentApi from '@/api/controller/assignments'

export const state = {
  assignmentList: [],
  studentAssignments: [],
  assignment: {}
}

export const mutations = {
  GET_ASSIGNMENT_LIST (state, payload) {
    state.assignmentList = payload
  },
  GET_STUDENT_ASSIGNMENT_LIST (state, payload) {
    state.studentAssignments = payload
  },
  SET_ASSIGNMENT (state, payload) {
    state.assignment = payload
  }
}

export const actions = {
  fetchAssignmentList ({ commit }, { data, callback, fail }) {
    assignmentApi.getAssignmentsList(({data: response, paging}) => {
      commit('GET_ASSIGNMENT_LIST', response)
      callback && callback(response, paging)
    }, data, fail)
  },
  fetchStudentAssignmentList ({ commit }, { data, callback, fail }) {
    assignmentApi.getStudentAssignments(({data: response, paging}) => {
      commit('GET_STUDENT_ASSIGNMENT_LIST', response)
      callback && callback(paging)
    }, data, fail)
  },
  createAssignment ({ commit }, { payload, data, callback, fail }) {
    assignmentApi.createAssignment(() => {
      commit('SET_ASSIGNMENT', payload)
      callback && callback()
    }, data, payload, fail)
  },
    copyAssignment ({ state }, { payload, data, callback, fail }) {
    assignmentApi.copyAssignment(() => {
      callback && callback()
    }, data, payload, fail)
  },
  fetchAssignmentDetail ({ commit }, { data, callback, fail }) {
    assignmentApi.getAssignmentById(({data: response}) => {
      commit('SET_ASSIGNMENT', response)
      callback && callback(response)
    }, data, fail)
  },
  updateAssignmentDetail ({ commit }, { payload, data, callback, fail }) {
    assignmentApi.updateAssignment(() => {
      commit('SET_ASSIGNMENT', payload)
      callback && callback()
    }, data, payload, fail)
  },
  deleteAssignmentById ({ state }, { data, callback, fail }) {
    assignmentApi.deleteAssignment(() => {
      callback && callback()
    }, data, fail)
  }
}



export const getters = {
  assignmentList (state) {
    return state.assignmentList
  },
  studentAssignments (state) {
    return state.studentAssignments
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
