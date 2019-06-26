import chatroomApi from '@/api/controller/chatrooms'

export const state = {
  chatrooms: [],
  messages: []
}

export const mutations = {
  UPDATE_CHATROOMS (state, payload) {
    state.chatrooms = payload
  },
  UPDATE_MESSAGES (state, payload) {
    state.messages = payload
  },
  PUSH_CHATROOMS (state, payload) {
    state.chatrooms.push(...payload)
  },
  PUSH_MESSAGES (state, payload) {
    state.messages.push(...payload)
  },
  resetMessages (state) {
    state.messages = []
  },
  resetChatrooms (state) {
    state.chatrooms = []
  }
}

export const actions = {
  fetchChatrooms (state, { data, fail }) {
    chatroomApi.getChatrooms(response => {
      console.log('chatrooms ' + response)
      if (data.params.page === 1) {
        let additionalChatrooms = []
        let chatrooms = state.chatrooms
        if (state.chatrooms && state.chatrooms.length > response.data.length) {
          for (const chatroom of response.data) {
            if (chatroom.id === state.chatrooms[0].id) {
              break
            }
            additionalChatrooms.push(chatroom)
          }
          chatrooms.unshift(...additionalChatrooms)
        } else {
          chatrooms = response.data
        }
        state.commit('UPDATE_CHATROOMS', chatrooms)
      } else {
        state.commit('PUSH_CHATROOMS', response.data)
      }
    }, fail, data)
  },
  fetchMessages (state, { data, fail }) {
    chatroomApi.getMessages(response => {
      console.log(response)
      if (data.params.page === 1) {
        let additionalMessages = []
        let messages = state.messages
        if (state.messages && state.messages.length > response.data.length) {
          for (const message of response.data) {
            if (message.id === state.messages[0].id) {
              break
            }
            additionalMessages.push(message)
          }
          messages.unshift(additionalMessages)
        } else {
          messages = response.data
        }
        state.commit('UPDATE_MESSAGES', messages)
      } else {
        state.commit('PUSH_MESSAGES', response.data)
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
