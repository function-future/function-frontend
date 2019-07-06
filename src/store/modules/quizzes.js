import quizApi from '@/api/controller/quizzes'

export const state = {
  quizList: [],
  quiz: {}
}

export const mutations = {
  GET_QUIZ_LIST (state, payload) {
    state.quizList = payload
  },
  SET_QUIZ (state, payload) {
    state.quiz = payload
  }
}

export const actions = {
  fetchQuizList ({ commit }, { data, callback, fail }) {
    quizApi.getQuizList(({data: response, paging}) => {
      commit('GET_QUIZ_LIST', response.quizzes)
      callback && callback(paging)
    }, data, fail)
  },
  createQuiz ({ commit }, { payload, data, callback, fail }) {
    quizApi.createQuiz(() => {
      commit('SET_QUIZ', payload)
      callback && callback()
    }, data, payload, fail)
  },
  fetchQuizById ({ commit }, { data, callback, fail }) {
    quizApi.getQuizById(({data: response}) => {
      commit('SET_QUIZ', response)
      callback && callback()
    }, data, fail)
  },
  updateQuizDetail ({ commit }, { payload, data, callback, fail }) {
    quizApi.updateQuiz(() => {
      commit('SET_QUIZ', payload)
      callback && callback()
    }, data, payload, fail)
  },
  deleteQuizById ({ commit }, { data, callback, fail }) {
    quizApi.deleteQuiz(() => {
      callback && callback()
    }, data, fail)
  }
}


export const getters = {
  quizList (state) {
    return state.quizList
  },
  quiz (state) {
    return state.quiz
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
