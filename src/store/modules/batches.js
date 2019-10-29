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
      callback(response)
    }, fail)
  },
  fetchBatchById ({ commit }, { data, callback, fail }) {
    batchApi.getBatchDetail(({ data: response }) => {
      callback(response)
    }, data, fail)
  },
  createBatch ({ commit }, { data, callback, fail }) {
    batchApi.createBatch(({ data: response }) => {
      callback(response)
    }, data, fail)
  },
  updateBatch ({ commit }, { data, callback, fail }) {
    batchApi.updateBatch(({ data: response }) => {
      callback(response)
    }, data, fail)
  },
  deleteBatch ({ commit }, { data, callback, fail }) {
    batchApi.deleteBatch(({ data: response }) => {
      callback()
    },data, fail)
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
