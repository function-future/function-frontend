import chatroomApi from '@/api/controller/chatrooms'
import resourceApi from '@/api/controller/resources'

export const state = {
  chatrooms: [],
  messages: []
}

export const mutations = {
  PUSH_CHATROOMS (state, payload) {
    state.chatrooms.push(...payload)
  },
  UNSHIFT_CHATROOMS (state, payload) {
    state.chatrooms.unshift(...payload)
  },
  UNSHIFT_MESSAGES (state, payload) {
    state.messages.unshift(...payload)
  },
  PUSH_MESSAGES (state, payload) {
    state.messages.push(...payload)
  },
  RESET_MESSAGES (state) {
    state.messages = []
  },
  RESET_CHATROOMS (state) {
    state.chatrooms = []
  }
}

export const actions = {
  fetchChatrooms ({ state, commit }, { data, fail, cb }) {
    chatroomApi.getChatrooms(response => {
      cb(response)
    }, fail, data)
  },
  fetchMessages ({ commit }, { data, fail, cb }) {
    chatroomApi.getMessages(response => {
      cb && cb(response)
    }, fail, data)
  },
  createMessage ({ commit }, { data, fail, cb }) {
    chatroomApi.createMessage(response => {
      cb && cb(response)
    }, fail, data)
  },
  fetchChatroomWithKeyword ({ commit }, { data, fail }) {
    chatroomApi.getChatrooms(response => {
      commit('RESET_CHATROOMS')
      commit('PUSH_CHATROOMS', response.data)
    }, fail, data)
  },
  fetchMessagesAfterPivot ({ commit, state }, { data, fail, cb1, cb2 }) {
    chatroomApi.getMessagesAfterPivot(
      response => {
        if (response.data[0] && response.data[0].id === state.messages[state.messages.length - 1].id) {
          return
        }
        commit('PUSH_MESSAGES', response.data.reverse())
        if (response.data.length) {
          cb1(response.data[0].id)
        }
        cb2()
      },
      fail,
      data
    )
  },
  fetchMessagesBeforePivot ({ commit, state }, { data, fail, cb }) {
    chatroomApi.getMessagesBeforePivot(response => {
      cb && cb(response)
    }, fail, data)
  },
  updateSeenStatus ({ state, commit }, chatroomId) {
    for (let chatroom of state.chatrooms) {
      if (chatroomId === chatroom.id && chatroom.lastMessage) {
        chatroom.lastMessage.seen = true
      }
    }
  },
  uploadGroupImage ({ commit }, { data, configuration, callback, fail }) {
    resourceApi.uploadResource(({ data: response }) => {
      callback(response)
    }, data, fail, configuration)
  },
  setChatroomsLimit ({ commit }, { data, fail, cb }) {
    chatroomApi.setLimit(response => {
      cb && cb(response)
    }, fail, data)
  },
  unsetChatroomsLimit ({ commit }, { fail, cb }) {
    chatroomApi.unsetLimit(response => {
      cb && cb(response)
    }, fail)
  },
  enterChatroom ({ commit }, { data, fail, cb }) {
    chatroomApi.enterChatroom(response => {
      cb && cb(response)
    }, fail, data)
  },
  leaveChatroom ({ commit }, { data, fail, cb }) {
    chatroomApi.leaveChatroom(response => {
      cb && cb(response)
    }, fail, data)
  },
  createChatroom ({ commit }, { data, fail, cb }) {
    chatroomApi.createChatroom(response => {
      cb && cb(response)
    }, fail, data)
  },
  updateChatroom ({ commit }, { data, fail, cb }) {
    chatroomApi.updateChatroom(response => {
      cb && cb(response)
    }, fail, data)
  },
  fetchDetailChatroom ({ commit }, { data, fail, cb }) {
    chatroomApi.getChatroomDetails(response => {
      cb && cb(response)
    }, fail, data)
  },
  pushMessages ({ commit }, messages) {
    commit('PUSH_MESSAGES', messages)
  },
  unshiftMessages ({ commit }, messages) {
    commit('UNSHIFT_MESSAGES', messages)
  },
  pushChatrooms ({ commit }, chatrooms) {
    commit('PUSH_CHATROOMS', chatrooms)
  },
  unshiftChatrooms ({ commit }, chatrooms) {
    commit('UNSHIFT_CHATROOMS', chatrooms)
  },
  resetChatrooms ({ commit }) {
    commit('RESET_CHATROOMS')
  },
  resetMessages ({ commit }) {
    commit('RESET_MESSAGES')
  }
}

export const getters = {
  chatrooms (state) {
    return state.chatrooms
  },
  messages (state) {
    return state.messages
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
