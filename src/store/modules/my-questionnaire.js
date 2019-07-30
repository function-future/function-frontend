import myQuestionnaireApi from '@/api/controller/my-questionnaire'
import questionnaireApi from '@/api/controller/questionnaire'

export const state = {
  myQuestionnaires: [],
  myListAppraisees: [],
  currentQuestionnaire: {},
  currentQuestionnaireData: {},
  currentAppraiseeToScore: {},
  currentQuestionsQuestionnaire: []
}

export const mutations = {
  RESET_MY_QUESTIONNAIRES (state) {
    state.myQuestionnaires = []
  },
  PUSH_MY_QUESTIONNAIRE (state, payload) {
    state.myQuestionnaires.push(...payload)
  },
  RESET_MY_LIST_APPRAISEES (state) {
    state.myListAppraisees = []
  },
  PUSH_MY_LIST_APPRAISEES (state, payload) {
    state.myListAppraisees.push(...payload)
  },
  RESET_CURRENT_QUESTIONNAIRE (state) {
    state.currentQuestionnaire = {}
  },
  ASSIGN_CURRENT_QUESTIONNAIRE (state, payload) {
    state.currentQuestionnaire = payload
  },
  RESET_CURRENT_QUESTIONNAIRE_DATA (state) {
    state.currentQuestionnaireData = {}
  },
  ASSIGN_CURRENT_QUESTIONNAIRE_DATA (state, payload) {
    state.currentQuestionnaireData = payload
  },
  RESET_CURRENT_APPRAISEE_TO_SCORE (state) {
    state.currentAppraiseeToScore = {}
  },
  ASSIGN_CURRENT_APPRAISEE_TO_SCORE (state, payload) {
    state.currentAppraiseeToScore = payload
  },
  RESET_QUESTIONS_QUESTIONNAIRE (state) {
    state.currentQuestionsQuestionnaire = []
  },
  PUSH_QUESTIONS_QUESTIONNAIRE (state, payload) {
    state.currentQuestionsQuestionnaire.push(...payload)
  }

}

export const actions = {
  fetchMyQuestionnaires ({ state, commit }, { data, fail }) {
    myQuestionnaireApi.getMyQuestionnaires(response => {
      commit('RESET_MY_QUESTIONNAIRES')
      commit('PUSH_MY_QUESTIONNAIRE', response.data)
    }, fail, data)
  },
  fetchMyListApprisees ({ state, commit }, { data, fail }) {
    myQuestionnaireApi.getListAppraisees(response => {
      commit('RESET_MY_LIST_APPRAISEES')
      commit('PUSH_MY_LIST_APPRAISEES', response.data)
    }, fail, data)
  },
  fetchCurrentQuestionnaire ({ state, commit }, { data, fail }) {
    questionnaireApi.getQuestionnaire(response => {
      commit('RESET_CURRENT_QUESTIONNAIRE')
      commit('ASSIGN_CURRENT_QUESTIONNAIRE', response.data)
    }, fail, data)
  },
  saveAppraisee ({ commit }, data) {
    commit('ASSIGN_CURRENT_APPRAISEE_TO_SCORE', data.name)
  },
  fetchCurrentQuestionsQuestionnaire ({ state, commit }, { data, fail, cb }) {
    myQuestionnaireApi.getQuestion(response => {
      commit('RESET_QUESTIONS_QUESTIONNAIRE')
      commit('PUSH_QUESTIONS_QUESTIONNAIRE', response.data)
      cb(response)
    }, fail, data)
  },
  fetchCurrentQuestionnaireData ({ state, commit }, { data, fail, cb }) {
    myQuestionnaireApi.getQuestionnaireData(response => {
      commit('RESET_CURRENT_QUESTIONNAIRE_DATA')
      commit('ASSIGN_CURRENT_QUESTIONNAIRE_DATA', response.data)
      cb(response)
    }, fail, data)
  },
  resetQuestionnaireList ({ state, commit }) {
    commit('RESET_MY_LIST_APPRAISEES')
  }
}

export const getters = {
  myQuestionnaires (state) {
    return state.myQuestionnaires
  },
  myListAppraisees (state) {
    return state.myListAppraisees
  },
  currentQuestionnaire (state) {
    return state.currentQuestionnaire
  },
  currentQuestionnaireData (state) {
    return state.currentQuestionnaireData
  },
  currentAppraiseeToScore (state) {
    return state.currentAppraiseeToScore
  },
  currentQuestionsQuestionnaire (state) {
    return state.currentQuestionsQuestionnaire
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
