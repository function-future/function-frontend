import questionBankApi from '@/api/controller/question-banks'

export const state = {
  questionBanks: [],
  questionBank: {},
  questionList: []
}

export const mutations = {
  GET_QUESTION_BANK_LIST (state, payload) {
    state.questionBanks = payload
  },
  SET_QUESTION_BANK (state, payload) {
    state.questionBank = payload
  },
  SET_QUESTIONS (state, payload) {
    state.questionList = payload
  }
}

export const actions = {
  fetchQuestionBankList ({ commit }, { data, fail }) {
    questionBankApi.getQuestionBankList(({data: response}) => {
      commit('GET_QUESTION_BANK_LIST', response)
    }, data, fail)
  },
  createQuestionBank ({ commit }, { payload, data, callback, fail }) {
    questionBankApi.createQuestionBank(() => {
      commit('SET_QUESTION_BANK', payload)
      callback && callback()
    }, data, payload, fail)
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
      callback()
    }, data, payload, fail)
  },
  fetchQuestionBankQuestionList ({ commit }, { data, fail }) {
    questionBankApi.getQuestionList(({data: response}) => {
      commit('SET_QUESTIONS', response)
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
