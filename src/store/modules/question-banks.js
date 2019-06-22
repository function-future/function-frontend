import questionBankApi from '@/api/controller/question-banks'

export const state = {
  questionBanks: [],
  questionBank: {}
}

export const mutations = {
  GET_QUESTION_BANK_LIST (state, payload) {
    state.questionBanks = payload
  },
  SET_QUESTION_BANK (state, payload) {
    state.questionBank = payload
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
      callback()
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
  }
}


export const getters = {
  questionBanks (state) {
    return state.questionBanks
  },
  questionBank (state) {
    return state.questionBank
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
