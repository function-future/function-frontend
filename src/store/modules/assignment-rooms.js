import assignmentRoomApi from '@/api/controller/assignment-rooms'

export const state = {
  roomList: [],
  room: {},
  comments: []
}

export const mutations = {
  GET_ROOM_LIST (state, payload) {
    state.roomList = payload
  },
  SET_ROOM (state, payload) {
    state.room = payload
  },
  GET_COMMENTS (state, payload) {
    state.comments = payload
  }
}

export const actions = {
  fetchRoomList ({ commit }, { data, callback, fail }) {
    console.log(data)
    assignmentRoomApi.getAssignmentRooms(({data: response, paging}) => {
      commit('GET_ROOM_LIST', response)
      callback && callback(paging)
    }, data, fail)
  },
  fetchRoomDetail ({ commit }, { data, callback, fail }) {
    assignmentRoomApi.getAssignmentRoomById(({data: response}) => {
      commit('SET_ROOM', response)
      callback && callback()
    }, data, fail)
  },
  fetchComments ({ commit }, { data, callback, fail }) {
    assignmentRoomApi.getAssignmentRoomComments(({ data: response, paging }) => {
      commit('GET_COMMENTS', response)
      callback && callback(response, paging)
    }, data, fail)
  },
  postComment ({ commit }, { data, payload, callback, fail }) {
    assignmentRoomApi.createAssignmentRoomComment(() => {
      callback && callback()
    }, data, payload, fail)
  }
}


export const getters = {
  roomList (state) {
    return state.roomList
  },
  room (state) {
    return state.room
  },
  comments (state) {
    return state.comments
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
