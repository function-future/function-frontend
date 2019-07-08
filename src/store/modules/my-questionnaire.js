import myQuestionnaireApi from '@/api/controller/my-questionnaire'

export const state = {
  myQuestionnaires: []
}

export const mutations = {
  RESET_MY_QUESTIONNAIRES (state) {
    state.myQuestionnaires = []
  },
  PUSH_MY_QUESTIONNAIRE (state, payload) {
    state.myQuestionnaires.push(...payload);
  }
}

export const actions = {
  fetchMyQuestionnaires ({state, commit}, {data, fail}) {
    myQuestionnaireApi.getMyQuestionnaires(response => {
      commit('RESET_MY_QUESTIONNAIRES')
      commit('PUSH_MY_QUESTIONNAIRE', response.data)
    }, fail, data)
  }
}

export const getters = {
  myQuestionnaires (state) {
    return state.myQuestionnaires
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
