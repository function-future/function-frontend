import studentQuizApi from '@/api/controller/student-quiz'

export const state = {
  studentQuizList: [],
  studentQuizDetail: {},
  studentQuizQuestions: []
}

export const mutations = {
  GET_STUDENT_QUIZ_LIST (state, payload) {
    state.studentQuizList = payload
  },
  SET_STUDENT_QUIZ_DETAIL (state, payload) {
    state.studentQuizDetail = payload
  },
  SET_STUDENT_QUIZ_QUESTIONS (state, payload) {
    state.studentQuizQuestions = payload
  }
}

export const actions = {
  fetchStudentQuizList ({ commit }, { data, callback, fail }) {
    studentQuizApi.getQuizzes(({data: response, paging}) => {
      commit('GET_STUDENT_QUIZ_LIST', response)
      callback && callback(paging)
    }, data, fail)
  },
  fetchStudentQuizDetail ({ commit }, { data, callback, fail }) {
    studentQuizApi.getQuizDetail(({data: response}) => {
      commit('SET_STUDENT_QUIZ_DETAIL', response)
      callback && callback(response)
    }, data, fail)
  },
  fetchStudentQuizQuestions ({ commit }, { data, callback, fail }) {
    studentQuizApi.getQuestions(({data: response}) => {
      commit('SET_STUDENT_QUIZ_QUESTIONS', response)
      callback && callback()
    }, data, fail)
  },
  fetchStudentQuizTimeLimit ({ state }, { data, callback, fail }) {
    studentQuizApi.getTimeLimit(({data: response}) => {
      callback && callback(response)
    }, data, fail)
  },
  submitAnswers ({ commit }, { payload, data, callback, fail }) {
    studentQuizApi.postQuizAnswer((response) => {
      callback && callback(response)
    }, data, payload, fail)
  },
}



export const getters = {
  studentQuizList (state) {
    return state.studentQuizList
  },
  studentQuizDetail (state) {
    return state.studentQuizDetail
  },
  studentQuizQuestions (state) {
    return state.studentQuizQuestions
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
