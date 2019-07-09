import store from '@/store/modules/chatrooms'
import api from '@/api/controller/chatrooms'

jest.mock('@/api/controller/chatrooms')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Fetch CHatrooms', () => {
    api.getChatrooms = (success) => {
      success({
        code: 200,
        status: 'OK',
        data: [
          {
            id: 'id1',
            lastMessage: {
              seen: false,
              message: 'last message'
            }
          }
        ]
      })
    }
    const state = {
      chatrooms: [
        {
          id: 'id2',
          lastMessage: {
            seen: false,
            message: 'last message'
          }
        }
      ]
    }
    const data = {}
    const commit = jest.fn()
    const cb = jest.fn()
    const fail = jest.fn()
    store.actions.fetchChatrooms({ state, commit }, { data, fail, cb })
    expect(commit).toBeCalledTimes(1)
    expect(cb).toBeCalledTimes(1)
    expect(fail).not.toBeCalled()
  })

  test('Fetch messages', () => {
    api.getMessages = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': [1, 2, 3, 4]
      })
    }
    const data = {}
    const commit = jest.fn()
    const fail = jest.fn()
    const cb = jest.fn()
    store.actions.fetchMessages({ commit }, { data, fail, cb })
    expect(fail).not.toBeCalled()
    expect(cb).toBeCalledTimes(1)
  })

  test('Fetch Chatroom with Keyword', () => {
    api.getChatrooms = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': [1, 2, 3, 4]
      })
    }
    const data = {}
    const commit = jest.fn()
    const fail = jest.fn()
    store.actions.fetchChatroomWithKeyword({ commit }, { data, fail })
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(2)
  })

  test('Fetch Messages after pivot', () => {
    api.getMessagesAfterPivot = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': [
          {
            'id': 'id-1'
          }
        ]
      })
    }
    const data = {}
    const commit = jest.fn()
    const state = {
      messages: [
        {
          'id': 'id-2'
        }
      ]
    }
    const fail = jest.fn()
    const cb1 = jest.fn()
    const cb2 = jest.fn()
    store.actions.fetchMessagesAfterPivot({ commit, state }, { data, fail, cb1, cb2 })
    expect(fail).not.toBeCalled()
    expect(commit).toBeCalledTimes(1)
    expect(cb1).toBeCalledTimes(1)
    expect(cb2).toBeCalledTimes(1)
  })

  test('Update seen status', () => {
    const state = {
      chatrooms: [
        { id: 'id1', lastMessage: { text: 'last message', seen: false } },
        { id: 'id2', lastMessage: { text: 'last message', seen: false } }
      ]
    }

    const commit = jest.fn()
    const chatroomId = 'id1'
    store.actions.updateSeenStatus({ state, commit }, chatroomId)
    expect(state.chatrooms[0].lastMessage.seen).toBe(true)
    expect(state.chatrooms[1].lastMessage.seen).toBe(false)
  })

  test('Push messages', () => {
    const commit = jest.fn()
    store.actions.pushMessages({ commit }, [])
    expect(commit).toBeCalledTimes(1)
  })

  test('Unshift messages', () => {
    const commit = jest.fn()
    store.actions.unshiftMessages({ commit }, [])
    expect(commit).toBeCalledTimes(1)
  })

  test('Push chatrooms', () => {
    const commit = jest.fn()
    store.actions.pushChatrooms({ commit }, [])
    expect(commit).toBeCalledTimes(1)
  })

  test('Unshift chatrooms', () => {
    const commit = jest.fn()
    store.actions.unshiftChatrooms({ commit }, [])
    expect(commit).toBeCalledTimes(1)
  })

  test('Reset chatrooms', () => {
    const commit = jest.fn()
    store.actions.resetChatrooms({ commit })
    expect(commit).toBeCalledTimes(1)
  })

  test('Reset messages', () => {
    const commit = jest.fn()
    store.actions.resetMessages({ commit })
    expect(commit).toBeCalledTimes(1)
  })
})

describe('getters', () => {
  const state = {
    chatrooms: [],
    messages: []
  }

  test('chatrooms', () => {
    expect(store.getters.chatrooms(state)).toEqual(state.chatrooms)
  })

  test('messages', () => {
    expect(store.getters.messages(state)).toEqual(state.messages)
  })
})

describe('mutations', () => {
  let state = {
    chatrooms: [],
    messages: []
  }
  beforeEach(() => {
    state.chatrooms = []
    state.messages = []
  })

  test('PUSH_CHATROOMS', () => {
    const payload = [1, 2, 3]
    store.mutations.PUSH_CHATROOMS(state, payload)
    expect(state.chatrooms).toEqual(payload)
  })

  test('UNSHIFT_CHATROOMS', () => {
    const payload = [1, 2, 3]
    store.mutations.UNSHIFT_CHATROOMS(state, payload)
    expect(state.chatrooms).toEqual(payload)
  })

  test('PUSH_MESSAGES', () => {
    const payload = [1, 2, 3]
    store.mutations.PUSH_MESSAGES(state, payload)
    expect(state.messages).toEqual(payload)
  })

  test('UNSHIFT_MESSAGES', () => {
    const payload = [1, 2, 3]
    store.mutations.UNSHIFT_MESSAGES(state, payload)
    expect(state.messages).toEqual(payload)
  })

  test('RESET_CHATROOMS', () => {
    store.mutations.RESET_CHATROOMS(state)
    expect(state.chatrooms.length).toEqual(0)
  })

  test('RESET_MESSAGES', () => {
    store.mutations.RESET_MESSAGES(state)
    expect(state.messages.length).toEqual(0)
  })
})
