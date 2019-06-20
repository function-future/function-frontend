import assignmentRoomApi from '@/api/controller/assignment-rooms'

export const state = {
  roomList: [],
  room: {}
}

export const mutations = {
  GET_ROOM_LIST (state, payload) {
    state.roomList = payload
  },
  SET_ROOM (state, payload) {
    state.room = payload
  }
}

export const actions = {
  fetchRoomList ({ commit }, { data, fail }) {
    assignmentRoomApi.getAssignmentRooms(({data: response}) => {
      commit('GET_ROOM_LIST', response)
    }, data, fail)
  },
  fetchRoomDetail ({ commit }, { data, callback, fail }) {
    assignmentRoomApi.getAssignmentRoomById(({data: response}) => {
      commit('SET_ROOM', response)
      callback && callback()
    }, data, fail)
  }
}


export const getters = {
  roomList (state) {
    return state.roomList
  },
  room (state) {
    return state.room
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
