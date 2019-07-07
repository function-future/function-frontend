import pointsApi from '@/api/controller/points'

export const state = {
  points: {}
}

export const mutations = {
  GET_POINTS (state, payload) {
    state.points = payload
  }
}

export const actions = {
  fetchPointList ({ commit }, { data, fail }) {
    pointsApi.getPoints(({ data: response }) => {
      commit('GET_POINTS', response)
    }, data, fail)
  }
}


export const getters = {
  points (state) {
    return state.points
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
