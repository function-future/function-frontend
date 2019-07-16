import questionnaireApi from '@/api/controller/questionnaire'

export const state = {
  currentQuestionnaireAdmin: {},
  currentQuestions: [],
  currentAppraisee: [],
  currentAppraiser: []
}

export const mutations = {
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
  fetchCurrentQuestionnaireAdmin ({ state, commit }, { data, fail }) {
    questionnaireApi.getQuestionnaire(response => {
      commit('RESET_CURRENT_QUESTIONNAIRE_ADMIN')
      commit('ASSIGN_CURRENT_QUESTIONNAIRE_ADMIN', response.data)
    }, fail, data)
  },
  fetchCurrentQuestions ({ state, commit }, { data, fail }) {

  },
  fetchCurrentAppraisee ({ state, commit }, { data, fail }) {

  },
  fetchCurrentAppraiser ({ state, commit }, { data, fail }) {

  }
}

export const getters = {
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
