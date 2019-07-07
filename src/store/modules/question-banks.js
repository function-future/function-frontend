import questionBankApi from '@/api/controller/question-banks'

export const state = {
  questionBanks: [],
  questionBank: {},
  questionList: [],
  question: {}
}

export const mutations = {
  GET_QUESTION_BANK_LIST (state, payload) {
    state.questionBanks = payload
  },
  SET_QUESTION_BANK (state, payload) {
    state.questionBank = payload
  },
  SET_QUESTION_LIST (state, payload) {
    state.questionList = payload
  },
  SET_QUESTION (state, payload) {
    state.question = payload
  }
}

export const actions = {
  fetchQuestionBankList ({ commit }, { callback, data, fail }) {
    questionBankApi.getQuestionBankList(({data: response}) => {
      commit('GET_QUESTION_BANK_LIST', response)
      callback && callback()
    }, data, fail)
  },
  createQuestionBank ({ commit }, { payload, callback, fail }) {
    questionBankApi.createQuestionBank(() => {
      commit('SET_QUESTION_BANK', payload)
      callback && callback()
    }, payload, fail)
  },
  fetchQuestionBankDetail ({ commit }, { data, callback, fail }) {
    questionBankApi.getQuestionBankById(({data: response}) => {
      commit('SET_QUESTION_BANK', response)
      callback && callback()
    }, data, fail)
  },
  updateQuestionBank ({ commit }, { payload, data, callback, fail }) {
    questionBankApi.updateQuestionBank(() => {
      commit('SET_QUESTION_BANK', payload)
      callback && callback()
    }, data, payload, fail)
  },
  fetchQuestionBankQuestionList ({ commit }, { data, fail }) {
    questionBankApi.getQuestionList(({data: response}) => {
      commit('SET_QUESTION_LIST', response)
    }, data, fail)
  },
  createQuestion ({ commit }, { payload, data, callback, fail }) {
    questionBankApi.createQuestion(() => {
      commit('SET_QUESTION', payload)
      callback && callback()
    }, data, payload, fail)
  },
  fetchQuestionDetail ({ commit }, { data, callback, fail }) {
    questionBankApi.getQuestionById(({data: response}) => {
      commit('SET_QUESTION', response)
      callback && callback()
    }, data, fail)
  },
  updateQuestion ({ commit }, { payload, data, callback, fail }) {
    questionBankApi.updateQuestion(() => {
      commit('SET_QUESTION', payload)
      callback && callback()
    }, data, payload, fail)
  },
  deleteQuestionBankById ({ state }, { data, callback, fail }) {
    questionBankApi.deleteQuestionBank(() => {
      callback && callback()
    }, data, fail)
  }
}


export const getters = {
  questionBanks (state) {
    return state.questionBanks
  },
  questionBank (state) {
    return state.questionBank
  },
  questionList (state) {
    return state.questionList
  },
  question (state) {
    return state.question
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
