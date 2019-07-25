import questionnaireResultsApi from '@/api/controller/questionnaire-results'

export const state = {
  listAppraiseeResults: [],
  currentAppraiseeResult: null,
  currentAppraiseeResultQuetionnaires: [],
  currentResultQuestionnaireDetail: {},
  currentResultQuestionResponsesList: [],
  currentResultQuestionDetail: {},
  currentResultsQuestionDetailResponsesList: []
}

export const mutations = {
  RESET_LIST_APPRAISEE_RESULTS (state) {
    state.listAppraiseeResults = []
  },
  PUSH_LIST_APPRAISEE_RESULTS (state, payload) {
    state.listAppraiseeResults.push(...payload)
  },
  RESET_CURRENT_APPRAISEE_RESULTS (state) {
    state.currentAppraiseeResult = {}
  },
  ASSIGN_CURRENT_APPRAISEE_RESULTS (state, payload) {
    state.currentAppraiseeResult = payload
  },
  RESET_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES (state) {
    state.currentAppraiseeResultQuetionnaires = []
  },
  PUSH_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES (state, payload) {
    state.currentAppraiseeResultQuetionnaires.push(...payload)
  },
  RESET_CURRENT_QUESTIONNAIRE_DETAIL (state) {
    state.currentResultQuestionnaireDetail = {}
  },
  ASSIGN_CURRENT_QUESTIONNAIRE_DETAIL (state, payload) {
    state.currentResultQuestionnaireDetail = payload
  },
  RESET_CURRENT_QUESTION_RESPONSES_LIST (state) {
    state.currentResultQuestionResponsesList = []
  },
  PUSH_CURRENT_QUESTION_RESPONSES_LIST (state, payload) {
    state.currentResultQuestionResponsesList.push(...payload)
  },
  RESET_CURRENT_QUESTION_DETAIL (state) {
    state.currentResultQuestionDetail = {}
  },
  ASSIGN_CURRENT_QUESTION_DETAIL (state, payload) {
    state.currentResultQuestionDetail = payload
  },
  RESET_CURRENT_QUESTION_DETAIL_RESPONSES_LIST (state) {
    state.currentResultsQuestionDetailResponsesList = []
  },
  PUSH_CURRENT_QUESTION_DETAIL_RESPONSES_LIST (state, payload) {
    state.currentResultsQuestionDetailResponsesList.push(...payload)
  }
}

export const actions = {
  fetchAppraiseeResults ({ state, commit }, { data, fail }) {
    questionnaireResultsApi.getUserSummary(response => {
      commit('RESET_LIST_APPRAISEE_RESULTS')
      commit('PUSH_LIST_APPRAISEE_RESULTS', response.data)
    }, fail, data)
  },
  fetchCurrentAppraiseeResults ( { state, commit }, { data, fail }) {
    questionnaireResultsApi.getUserSummaryById(response => {
      commit('RESET_CURRENT_APPRAISEE_RESULTS')
      commit('ASSIGN_CURRENT_APPRAISEE_RESULTS', response.data)
    }, fail, data)
  },
  fetchCurrentAppraiseeResultsQuestionnaires ( { state, commit }, { data, fail }) {
    questionnaireResultsApi.getQuestionnaireSimpleSummary(response => {
      commit('RESET_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES')
      commit('PUSH_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES', response.data)
    }, fail, data)
  },
  fetchCurrentQuestionnaireDetail ({ state, commit }, { data, fail }) {
    questionnaireResultsApi.getQuestionnaireSummaryDetail(response => {
      commit('RESET_CURRENT_QUESTIONNAIRE_DETAIL')
      commit('ASSIGN_CURRENT_QUESTIONNAIRE_DETAIL', response.data)
    }, fail, data)
  },
  fetchCurrentQuestionResponses ({ state, commit }, { data, fail }) {
    questionnaireResultsApi.getQuestionSummaryResponse(response => {
      commit('RESET_CURRENT_QUESTION_RESPONSES_LIST')
      commit('PUSH_CURRENT_QUESTION_RESPONSES_LIST', response.data)
    }, fail, data)
  },
  fetchCurrentResultQuestionDetail ({ state, commit }, { data, fail }) {
    questionnaireResultsApi.getQuestionQuestionnaireSummaryResponse(response => {
      commit('RESET_CURRENT_QUESTION_DETAIL')
      commit('ASSIGN_CURRENT_QUESTION_DETAIL', response.data)
    }, fail, data)
  },
  fetchCurrentResultsQuestionDetailResponsesList ({ state, commit }, { data, fail, cb }) {
    questionnaireResultsApi.getQuestionnaireAnswerDetailResponse(response => {
      commit('RESET_CURRENT_QUESTION_DETAIL_RESPONSES_LIST')
      commit('PUSH_CURRENT_QUESTION_DETAIL_RESPONSES_LIST', response.data)
      console.log('masuk sini')
      cb && cb(response)
    }, fail, data)
  }
}

export const getters = {
  listAppraiseeResults (state) {
    return state.listAppraiseeResults
  },
  currentAppraiseeResult (state) {
    return state.currentAppraiseeResult
  },
  currentAppraiseeResultQuetionnaires (state) {
    return state.currentAppraiseeResultQuetionnaires
  },
  currentResultQuestionnaireDetail (state) {
    return state.currentResultQuestionnaireDetail
  },
  currentResultQuestionResponsesList (state) {
    return state.currentResultQuestionResponsesList
  },
  currentResultQuestionDetail (state) {
    return state.currentResultQuestionDetail
  },
  currentResultsQuestionDetailResponsesList (state) {
    return state.currentResultsQuestionDetailResponsesList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
