import batchApi from '@/api/controller/batches'

export const state = {
  batchList: []
}

export const mutations = {
  SET_BATCHES (state, payload) {
    state.batchList = [...payload]
  }
}

export const actions = {
  fetchBatches ({ commit }, { callback, fail }) {
    batchApi.getBatchList(({ data: response }) => {
      commit('SET_BATCHES', response)
      callback()
    }, fail)
  }
}

export const getters = {
  batchList (state) {
    return state.batchList
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
