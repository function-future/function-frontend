import judgingApi from '@/api/controller/final-judging'

export const state = {
  judgingList: [],
  judging: {},
  comparison: [],
  score: []
}

export const mutations = {
  GET_JUDGING_LIST (state, payload) {
    state.judgingList = payload
  },
  GET_JUDGING (state, payload) {
    state.judging = payload
  },
  GET_COMPARISON (state, payload) {
    state.comparison = payload
  }
}

export const actions = {
  fetchJudgingList ({ commit }, { data, callback, fail }) {
    judgingApi.getJudgingList(({ data: response, paging }) => {
      commit('GET_JUDGING_LIST', response)
      callback && callback(paging)
    }, data, fail)
  },
  fetchJudgingDetail({ commit }, { data, callback, fail }) {
    judgingApi.getJudgingDetail(({ data: response}) => {
      commit('GET_JUDGING', response)
      callback && callback()
    }, data, fail)
  },
  fetchComparison({ commit }, { data, callback, fail }) {
    judgingApi.getComparison(({data: response}) => {
      commit('GET_COMPARISON', response)
      callback && callback()
    }, data, fail)
  },
  createJudging({ commit }, { payload, data, callback, fail }) {
    judgingApi.createJudging(() => {
      callback && callback()
    }, data, payload, fail)
  },
  submitScore({ commit }, { payload, data, callback, fail }) {
    judgingApi.postFinalScore(() => {
      callback && callback()
    }, data, payload, fail)
  },
  updateJudging({ commit }, { payload, data, callback, fail }) {
    judgingApi.updateJudgingDetail(() => {
      callback && callback()
    }, data, payload, fail)
  },
  deleteJudging({ commit }, { data, callback, fail }) {
    judgingApi.deleteJudging(() => {
      callback && callback()
    }, data, fail)
  }
}


export const getters = {
  judgingList (state) {
    return state.judgingList
  },
  judging (state) {
    return state.judging
  },
  comparison (state) {
    return state.comparison
  },
  score (state) {
    return state.score
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
