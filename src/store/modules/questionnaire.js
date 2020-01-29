import questionnaireApi from '@/api/controller/questionnaire'

export const state = {
  listQuestionnaires: [],
  currentQuestionnaireAdmin: {},
  currentQuestions: [],
  currentAppraisee: [],
  currentAppraiser: []
}

export const mutations = {
  RESET_LIST_QUESTIONNAIRES (state) {
    state.listQuestionnaires = []
  },
  PUSH_LIST_QUESTIONNAIRES (state, payload) {
    state.listQuestionnaires.push(...payload)
  },
  RESET_CURRENT_QUESTIONNAIRE_ADMIN (state) {
    state.currentQuestionnaireAdmin = {}
  },
  ASSIGN_CURRENT_QUESTIONNAIRE_ADMIN (state, payload) {
    state.currentQuestionnaireAdmin = payload
  },
  RESET_CURRENT_QUESTIONS (state) {
    state.currentQuestions = []
  },
  PUSH_CURRENT_QUESTIONS (state, payload) {
    state.currentQuestions.push(...payload)
  },
  RESET_CURRENT_APPRAISEE (state) {
    state.currentAppraisee = []
  },
  PUSH_CURRENT_APPRAISEE (state, payload) {
    state.currentAppraisee.push(...payload)
  },
  RESET_CURRENT_APPRAISER (state) {
    state.currentAppraiser = []
  },
  PUSH_CURRENT_APPRAISER (state, payload) {
    state.currentAppraiser.push(...payload)
  }
}

export const actions = {
  fetchListQuestionnaires ({ state, commit }, { data, fail }) {
    questionnaireApi.getQuestionnaires(response => {
      commit('RESET_LIST_QUESTIONNAIRES')
      commit('PUSH_LIST_QUESTIONNAIRES', response.data)
    }, fail, data)
  },
  fetchCurrentQuestionnaireAdmin ({ state, commit }, { data, fail }) {
    questionnaireApi.getQuestionnaire(response => {
      commit('RESET_CURRENT_QUESTIONNAIRE_ADMIN')
      commit('ASSIGN_CURRENT_QUESTIONNAIRE_ADMIN', response.data)
    }, fail, data)
  },
  setCurrentQuestionnaireAdmin ({ commit }, { data }) {
    commit('ASSIGN_CURRENT_QUESTIONNAIRE_ADMIN', data)
  },
  fetchCurrentQuestions ({ state, commit }, { data, fail, cb }) {
    questionnaireApi.getQuestionsQuestionnaire(response => {
      commit('RESET_CURRENT_QUESTIONS')
      commit('PUSH_CURRENT_QUESTIONS', response.data)
      cb && cb(response)
    }, fail, data)
  },
  fetchCurrentAppraisee ({ state, commit }, { data, fail, cb }) {
    questionnaireApi.getAppraiseeQuestionnaire(response => {
      commit('RESET_CURRENT_APPRAISEE')
      commit('PUSH_CURRENT_APPRAISEE', response.data)
      cb(response)
    }, fail, data)
  },
  fetchCurrentAppraiser ({ state, commit }, { data, fail, cb }) {
    questionnaireApi.getAppraiserQuestionnaire(response => {
      commit('RESET_CURRENT_APPRAISER')
      commit('PUSH_CURRENT_APPRAISER', response.data)
      cb(response)
    }, fail, data)
  }
}

export const getters = {
  listQuestionnaires (state) {
    return state.listQuestionnaires
  },
  currentQuestionnaireAdmin (state) {
    return state.currentQuestionnaireAdmin
  },
  currentQuestions (state) {
    return state.currentQuestions
  },
  currentAppraisee (state) {
    return state.currentAppraisee
  },
  currentAppraiser (state) {
    return state.currentAppraiser
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
