import assignmentApi from '@/api/controller/assignments'

export const state = {
  assignmentList: []
}

export const mutations = {
  GET_ASSIGNMENT_LIST (state, payload) {
    state.assignmentList = payload
  }
}

export const actions = {
  fetchAssignmentList ({ commit }, { data, fail }) {
    assignmentApi.getAssignmentsList(({data: response}) => {
      commit('GET_ASSIGNMENT_LIST', response)
      return this.assignmentList
    }, data, fail)
  }
}

export const getters = {
  assignmentList (state) {
    return state.assignmentList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
