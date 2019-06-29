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
    console.log('STATE CHATROOM')
    console.log(state.chatrooms)
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
      let i = 0
      let shouldChange = false
      console.log('RESPONSE DATA CHATROOM')
      console.log(response)
      for (const chatroom of response.data) {
        if (state.chatrooms[i] && chatroom.id !== state.chatrooms[i].id) {
          shouldChange = true
        }
      }
      if (shouldChange) {
        commit('RESET_CHATROOMS')
        commit('UNSHIFT_CHATROOMS', response.data)
        cb()
      }
    }, fail, data)
  },
  fetchMessages ({ state, commit }, { data, fail }) {
    chatroomApi.getMessages(response => {
      console.log(response)
      console.log(state.messages[state.messages.length - 1])
      let additionalMessages = []
      for (const message of response.data) {
        if (!state.messages[state.messages.length - 1] || message.id === state.messages[state.messages.length - 1].id) {
          break
        }
        additionalMessages.push(message)
      }
      console.log('ADDITIONAL POLL')
      console.log(additionalMessages)
      commit('PUSH_MESSAGES', additionalMessages.reverse())
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
