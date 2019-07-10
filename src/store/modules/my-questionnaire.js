import myQuestionnaireApi from '@/api/controller/my-questionnaire'
import questionnaireApi from '@/api/controller/questionnaire'

export const state = {
  myQuestionnaires: [],
  myListAppraisees: [],
  currentQuestionnaire: {}
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
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
