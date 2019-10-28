import quizApi from '@/api/controller/quizzes'

export const state = {
  quizList: [],
  quiz: {},
  selectedBank: []
}

export const mutations = {
  GET_QUIZ_LIST (state, payload) {
    state.quizList = payload
  },
  SET_QUIZ (state, payload) {
    state.quiz = payload
  },
  SET_SELECTED_BANK (state, payload) {
    state.selectedBank = payload
  }
}

export const actions = {
  fetchQuizList ({ commit }, { data, callback, fail }) {
    quizApi.getQuizList(({data: response, paging}) => {
      commit('GET_QUIZ_LIST', response)
      callback && callback(response, paging)
    }, data, fail)
  },
  createQuiz ({ commit }, { payload, data, callback, fail }) {
    quizApi.createQuiz(() => {
      commit('SET_QUIZ', payload)
      callback && callback()
    }, data, payload, fail)
  },
  copyQuiz ({ state }, { payload, data, callback, fail }) {
    quizApi.copyQuiz(() => {
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
  },
  setSelectedBank ({ commit }, { payload }) {
    commit('SET_SELECTED_BANK', payload)
  }
}


export const getters = {
  quizList (state) {
    return state.quizList
  },
  quiz (state) {
    return state.quiz
  },
  selectedBank (state) {
    return state.selectedBank
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
