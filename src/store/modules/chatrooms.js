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

export const actions = {
  fetchChatrooms ({ state, commit }, { data, fail }) {
    chatroomApi.getChatrooms(response => {
      console.log('chatrooms ' + response)
      let additionalChatrooms = []
      let chatrooms = state.chatrooms
      for (const chatroom of response.data) {
        if (state.chatrooms && chatroom.id === state.chatrooms[0].id) {
          break
        }
        additionalChatrooms.push(chatroom)
      }
      state.commit('PUSH_CHATROOMS', chatrooms)
    }, fail, data)
  },
  fetchMessages ({ state, commit }, { data, fail, cb }) {
    chatroomApi.getMessages(response => {
      console.log(response)
      console.log(state.messages[state.messages.length - 1])
      let additionalMessages = []
      for (const message of response.data) {
        if (state.messages && message.id === state.messages[state.messages.length - 1].id) {
          break
        }
        additionalMessages.push(message)
      }
      console.log(additionalMessages)
      commit('PUSH_MESSAGES', additionalMessages)
      if (additionalMessages.length > 0) {
        cb()
      }
    }, fail, data)
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
