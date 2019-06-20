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
  fetchQuizList ({ commit }, { data, fail }) {
    quizApi.getQuizList(({data: response}) => {
      console.log(response.quizzes)
      commit('GET_QUIZ_LIST', response.quizzes)
    }, data, fail)
  },
  createQuiz ({ commit }, { payload, data, callback, fail }) {
    quizApi.createQuiz(() => {
      commit('SET_QUIZ', payload)
      console.log(state.assignment)
      callback()
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
      callback()
    }, data, payload, fail)
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
