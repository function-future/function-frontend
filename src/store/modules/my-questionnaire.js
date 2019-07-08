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
  fetchMyQuestioonaires ({state, commit}, {data, fail}) {
    myQuestionnaireApi.getMyQuestionnaires(response => {
      commit('RESET_MY_QUESTIONNAIRE')
      commit('PUSH_MY_QUEESTIONNAIRE', response.data)
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
