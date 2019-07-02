import chatroomApi from '@/api/controller/chatrooms'

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

const isChatroomEqual = function (chatroom1, chatroom2) {
  return chatroom1.id === chatroom2.id &&
    ((!chatroom1.lastMessage && !chatroom2.lastMessage) ||
    (chatroom1.lastMessage && chatroom2.lastMessage &&
    chatroom1.lastMessage.seen === chatroom2.lastMessage.seen &&
    chatroom1.lastMessage.message === chatroom2.lastMessage.message))
}

export const actions = {
  fetchChatrooms ({ state, commit }, { data, fail, cb }) {
    chatroomApi.getChatrooms(response => {
      let i = 0
      let shouldChange = false
      for (const chatroom of response.data) {
        if (state.chatrooms[i] && !isChatroomEqual(chatroom, state.chatrooms[i])) {
          shouldChange = true
        }
        i += 1
      }
      if (shouldChange) {
        commit('RESET_CHATROOMS')
        cb()
      }
    }, fail, data)
  },
  fetchMessages ({ state, commit }, { data, fail, cb }) {
    chatroomApi.getMessages(response => {
      let additionalMessages = []
      for (const message of response.data) {
        if (state.messages[state.messages.length - 1] && message.id === state.messages[state.messages.length - 1].id) {
          break
        }
        additionalMessages.push(message)
      }
      if (additionalMessages.length > 0) {
        commit('PUSH_MESSAGES', additionalMessages.reverse())
        cb()
      }
    }, fail, data)
  },
  fetchChatroomWithKeyword ({ commit }, { data, fail }) {
    chatroomApi.getChatrooms(response => {
      commit('RESET_CHATROOMS')
      commit('PUSH_CHATROOMS', response.data)
    }, fail, data)
  },
  updateSeenStatus ({ state, commit }, chatroomId) {
    for (let chatroom of state.chatrooms) {
      if (chatroomId === chatroom.id && chatroom.lastMessage) {
        chatroom.lastMessage.seen = true
      }
    }
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
