import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import chatroomApi from '@/api/controller/chatrooms'
import moment from 'moment'
import Chatrooms from '@/views/Chatrooms/Chatrooms'

jest.mock('@/api/controller/chatrooms')

describe('Chatrooms', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    return localVue
  }

  function initStore (customState) {
    let state = {
      messages: [],
      chatrooms: []
    }
    if (customState) {
      state = customState
    }
    const actions = {
      fetchChatrooms: jest.fn(),
      fetchMessages: jest.fn(),
      updateSeenStatus: jest.fn(),
      fetchChatroomWithKeyword: jest.fn(),
      fetchMessagesAfterPivot: jest.fn(),
      unshiftChatrooms: jest.fn(),
      pushChatrooms: jest.fn(),
      unshiftMessages: jest.fn(),
      pushMessages: jest.fn(),
      resetMessages: jest.fn(),
      resetChatrooms: jest.fn()
    }
    const getters = {
      messages: () => state.messages,
      chatrooms: () => state.chatrooms
    }
    const store = new Vuex.Store({
      modules: {
        chatrooms: {
          state,
          actions,
          getters
        }
      }
    })

    return {
      store,
      state,
      actions,
      getters
    }
  }

  function createWrapper (store, options) {
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }

    return shallowMount(Chatrooms, {
      ...options,
      store,
      localVue,
      stubs: [
        'MessageBubbleSent',
        'MessageBubbleReceived',
        'BaseInput',
        'BaseCard',
        'SearchBar',
        'ChatroomCard',
        'InfiniteLoading',
        'font-awesome-icon',
        'ModalChatroom'
      ],
      mocks: {
        $toasted
      }
    })
  }

  function initComponent (state) {
    localVue = generateLocalVue()
    store = initStore(state)
    wrapper = createWrapper(store.store)
    wrapper.vm.$refs.chatroomInfiniteLoading = {
      stateChanger: {
        reset: jest.fn()
      }
    }
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('privateChatrooms computed', () => {
    initComponent({
      chatrooms: [{ type: 'PRIVATE' }, { type: 'GROUP' }],
      messages: []
    })
    expect(wrapper.vm.privateChatrooms.length).toEqual(1)
  })

  test('groupChatrooms computed', () => {
    initComponent({
      chatrooms: [{ type: 'PRIVATE' }, { type: 'GROUP' }],
      messages: []
    })
    expect(wrapper.vm.groupChatrooms.length).toEqual(1)
  })

  test('submitNewChatroom private', () => {
    chatroomApi.createChatroom = (success) => {
      success({
        data: {
          id: 'chatroomId',
          type: 'PRIVATE',
          members: [
            { id: 'userId1', avatar: 'avatar1', name: 'User1' },
            { id: 'userId2', avatar: 'avatar2', name: 'User2' }
          ]
        }
      })
    }
    const spyChangeTypeChoosen = jest.spyOn(Chatrooms.methods, 'changeTypeChoosen')
    const spyGetAvatarAndName = jest.spyOn(Chatrooms.methods, 'getAvatarAndName')
    const data = {}

    initComponent()
    wrapper.vm.submitNewChatroom(data)

    expect(wrapper.vm.activeChatroomId).toEqual('chatroomId')
    expect(wrapper.vm.activeChatroomType).toEqual('PRIVATE')
    expect(spyChangeTypeChoosen).toBeCalledTimes(1)
    expect(spyGetAvatarAndName).toBeCalledTimes(1)
  })

  test('submitNewChatroom group', () => {
    chatroomApi.createChatroom = (success) => {
      success({
        data: {
          id: 'chatroomId',
          type: 'GROUP',
          members: [
            { id: 'userId1', avatar: 'avatar1', name: 'User1' },
            { id: 'userId2', avatar: 'avatar2', name: 'User2' }
          ]
        }
      })
    }
    const spyChangeTypeChoosen = jest.spyOn(Chatrooms.methods, 'changeTypeChoosen')
    const data = {}

    initComponent()
    wrapper.vm.submitNewChatroom(data)

    expect(wrapper.vm.activeChatroomId).toEqual('chatroomId')
    expect(wrapper.vm.activeChatroomType).toEqual('GROUP')
    expect(spyChangeTypeChoosen).toBeCalledTimes(1)
  })

  test('updateChatroom', () => {
    chatroomApi.updateChatroom = (success) => {
      success({
        data: {
          id: 'chatroomId',
          type: 'PRIVATE',
          participants: [],
          name: 'Grup'
        }
      })
    }
    const spyResetChatroom = jest.spyOn(Chatrooms.methods, 'resetChatrooms').mockImplementation(() => Promise.resolve())
    const spySelectChatroom = jest.spyOn(Chatrooms.methods, 'selectChatroom').mockImplementation(() => Promise.resolve())
    const data = {}

    initComponent()
    wrapper.vm.updateChatroom(data)

    expect(wrapper.vm.chatroomPage).toEqual(1)
    expect(wrapper.vm.activeChatroomId).toEqual('chatroomId')
    expect(wrapper.vm.activeChatroomType).toEqual('PRIVATE')
    expect(spyResetChatroom).toBeCalledTimes(1)
    expect(spySelectChatroom).toBeCalledTimes(1)
  })

  test('openCreateChatroomModal', () => {
    initComponent()
    wrapper.vm.openCreateChatroomModal()
    expect(wrapper.vm.creatingChatroom).toBe(true)
  })

  test('toDateList', () => {
    const time = Date.now()
    initComponent()
    expect(wrapper.vm.toDateList(time)).toEqual([moment(time).year(), moment(time).month(), moment(time).date()])
  })

  test('computeMessageDate', () => {
    const messages = [
      {
        time: Date.now() - 86400000
      },
      {
        time: Date.now() - 86400000
      },
      {
        time: Date.now()
      }
    ]
    const spy = jest.spyOn(Chatrooms.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.computeMessagesDate(messages)

    expect(spy).toBeCalledTimes(4)
    expect(result[0].isNewDate).toBe(true)
    expect(result[1].isNewDate).toBe(false)
    expect(result[2].isNewDate).toBe(true)
  })

  test('printDateSeparator today', () => {
    const message = {
      time: Date.now()
    }
    const spy = jest.spyOn(Chatrooms.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual('Today')
  })

  test('printDateSeparator yesterday', () => {
    const message = {
      time: Date.now() - 86400000
    }
    const spy = jest.spyOn(Chatrooms.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual('Yesterday')
  })

  test('printDateSeparator < yesterday', () => {
    const message = {
      time: Date.now() - 2 * 86400000
    }
    const spy = jest.spyOn(Chatrooms.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual(moment(message.time).format('DD MMM YY'))
  })

  test('select public chatroom', () => {
    const chatroom = {
      id: 'chatroomId',
      type: 'PUBLIC',
      participants: []
    }

    initComponent()
    wrapper.vm.selectChatroom(chatroom)

    expect(wrapper.vm.activeChatroomId).toEqual(chatroom.id)
    expect(wrapper.vm.activeChatroomType).toEqual('PUBLIC')
    expect(wrapper.vm.chatroomTitle).toEqual('Public')
  })

  test('select group chatroom', () => {
    const chatroom = {
      id: 'chatroomId',
      type: 'GROUP',
      participants: [],
      name: 'Group'
    }

    initComponent()
    wrapper.vm.selectChatroom(chatroom)

    expect(wrapper.vm.activeChatroomId).toEqual(chatroom.id)
    expect(wrapper.vm.activeChatroomType).toEqual('GROUP')
    expect(wrapper.vm.chatroomTitle).toEqual(chatroom.name)
  })

  test('select private chatroom', () => {
    const chatroom = {
      id: 'chatroomId',
      type: 'PRIVATE',
      participants: [{
        id: 'idUser',
        name: 'Priagung',
        avatar: 'Avatar'
      }]
    }
    const spy = jest.spyOn(Chatrooms.methods, 'getAvatarAndName')

    initComponent()
    wrapper.vm.selectChatroom(chatroom)

    expect(wrapper.vm.activeChatroomId).toEqual(chatroom.id)
    expect(wrapper.vm.activeChatroomType).toEqual('PRIVATE')
    expect(wrapper.vm.chatroomTitle).toEqual('Priagung')
    expect(spy).toBeCalledTimes(1)
  })

  test('infiniteChatroomHandler there is some additional chatrooms', () => {
    chatroomApi.getChatrooms = (success) => {
      success({
        data: [
          { id: '1' },
          { id: '2' },
          { id: '3' }
        ]
      })
    }
    const chatrooms = [{ id: '1' }]
    const spyResetChatroomPoll = jest.spyOn(Chatrooms.methods, 'resetChatroomPoll')
      .mockImplementation(() => Promise.resolve())
    const spyPushChatrooms = jest.spyOn(Chatrooms.methods, 'pushChatrooms')

    initComponent({
      messages: [],
      chatrooms
    })
    wrapper.vm.infiniteChatroomHandler({
      loaded: jest.fn(),
      complete: jest.fn()
    })

    expect(spyResetChatroomPoll).toBeCalledTimes(1)
    expect(spyPushChatrooms).toBeCalledTimes(1)
    expect(wrapper.vm.chatroomPage).toEqual(2)
  })

  test('infiniteChatroomHandler when there is no additional chatrooms', () => {
    chatroomApi.getChatrooms = (success) => {
      success({
        data: [
          { id: '1' },
          { id: '2' },
          { id: '3' }
        ]
      })
    }
    const chatrooms = [
      { id: '1' },
      { id: '2' },
      { id: '3' }
    ]
    const spyResetChatroomPoll = jest.spyOn(Chatrooms.methods, 'resetChatroomPoll')
      .mockImplementation(() => Promise.resolve())

    initComponent({
      messages: [],
      chatrooms
    })
    wrapper.vm.infiniteChatroomHandler({
      loaded: jest.fn(),
      complete: jest.fn()
    })

    expect(spyResetChatroomPoll).toBeCalledTimes(1)
    expect(wrapper.vm.chatroomPage).toEqual(1)
  })

  test('infiniteMessageHandler when chatroom is changing and response length > 0', () => {
    chatroomApi.getMessages = (success) => {
      success({
        data: [
          { id: '1', sender: { id: 'senderId' } }
        ]
      })
    }
    const state = {
      chatrooms: [],
      messages: [{ id: '1', sender: { id: 'senderId' } }]
    }
    const spyUnshiftMessages = jest.spyOn(Chatrooms.methods, 'unshiftMessages')
    const spyResetMessageButtomPoll = jest.spyOn(Chatrooms.methods, 'resetMessageBottomPoll')
      .mockImplementation(() => Promise.resolve())

    initComponent(state)
    wrapper.vm.infiniteMessageHandler({
      loaded: jest.fn(),
      complete: jest.fn()
    })

    expect(wrapper.vm.changingChatroom).toBe(false)
    expect(wrapper.vm.topPivotMessageId).toBe('1')
    expect(wrapper.vm.bottomPivotMessageId).toBe('1')
    expect(spyUnshiftMessages).toBeCalledTimes(1)
    expect(spyResetMessageButtomPoll).toBeCalledTimes(1)
  })

  test('infiniteMessageHandler when chatroom is changing and response length == 0', () => {
    chatroomApi.getMessages = (success) => {
      success({
        data: []
      })
    }
    const state = {
      chatrooms: [],
      messages: [{ id: '1', sender: { id: 'senderId' } }]
    }
    const spyResetMessagePoll = jest.spyOn(Chatrooms.methods, 'resetMessagePoll')
      .mockImplementation(() => Promise.resolve())

    initComponent(state)
    wrapper.vm.infiniteMessageHandler({
      loaded: jest.fn(),
      complete: jest.fn()
    })

    expect(wrapper.vm.changingChatroom).toBe(false)
    expect(spyResetMessagePoll).toBeCalledTimes(1)
  })

  test('infiniteMessageHandler when chatroom is not changing and response length == 0', () => {
    chatroomApi.getMessagesBeforePivot = (success) => {
      success({
        data: []
      })
    }
    const spyUnshiftMessages = jest.spyOn(Chatrooms.methods, 'unshiftMessages')

    initComponent()
    wrapper.vm.changingChatroom = false
    wrapper.vm.infiniteMessageHandler({
      loaded: jest.fn(),
      complete: jest.fn()
    })

    expect(spyUnshiftMessages).toBeCalledTimes(1)
  })

  test('infiniteMessageHandler when chatroom is not changing and response length > 0', () => {
    chatroomApi.getMessagesBeforePivot = (success) => {
      success({
        data: [
          { id: '1', sender: { id: 'senderId' } }
        ]
      })
    }
    const state = {
      chatrooms: [],
      messages: [{ id: '1', sender: { id: 'senderId' } }]
    }
    const spyUnshiftMessages = jest.spyOn(Chatrooms.methods, 'unshiftMessages')

    initComponent(state)
    wrapper.vm.changingChatroom = false
    wrapper.vm.infiniteMessageHandler({
      loaded: jest.fn(),
      complete: jest.fn()
    })

    expect(spyUnshiftMessages).toBeCalledTimes(1)
    expect(wrapper.vm.topPivotMessageId).toEqual('1')
  })

  test('submit message success', () => {
    chatroomApi.createMessage = (success) => {
      success()
    }

    initComponent()
    wrapper.vm.messageText = 'message'
    wrapper.vm.submitMessage({ keyCode: 13 })

    expect(wrapper.vm.messageText).toEqual('')
    expect(wrapper.vm.sendingNewMessage).toBe(true)
  })

  test('submit message error', () => {
    chatroomApi.createMessage = (success, error) => {
      error()
    }

    initComponent()
    wrapper.vm.messageText = 'message'
    wrapper.vm.submitMessage({ keyCode: 13 })

    expect(wrapper.vm.messageText).toEqual('')
    expect(wrapper.vm.sendingNewMessage).toBe(false)
  })

  test('scrollMessageToBottom', done => {
    initComponent()
    wrapper.vm.sendingNewMessage = true
    wrapper.vm.scrollMessageToBottom()
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.sendingNewMessage).toBe(false)
      done()
    })
  })

  test('getAvatarAndName', () => {
    initComponent()
    const participants = [
      { id: 'id1', name: 'Priagung', avatar: 'Avatar' },
      { id: 'id2', name: 'Ricky', avatar: 'Avatar2' }
    ]

    wrapper.vm.userId = 'id1'
    const result = wrapper.vm.getAvatarAndName(participants)
    expect(result).toEqual({ name: 'Ricky', avatar: 'Avatar2' })
  })

  test('changeSearchText with text', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'fetchChatroomWithKeyword')

    initComponent()
    wrapper.vm.changeSearchText('text')

    expect(spy).toBeCalledTimes(1)
    expect(wrapper.vm.isSearching).toBe(true)
    expect(wrapper.vm.searchText).toEqual('text')
  })

  test('changeSearchText without text', () => {
    initComponent()
    wrapper.vm.changeSearchText('')

    expect(wrapper.vm.isSearching).toBe(false)
  })

  test('changeTypeChoosen to public', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'resetChatrooms')

    initComponent()
    wrapper.vm.typeChoosen = 'PRIVATE'
    wrapper.vm.activeChatroomId = 'chatroomId'
    wrapper.vm.changeTypeChoosen('PUBLIC')

    expect(spy).toBeCalledTimes(1)
    expect(wrapper.vm.typeChoosen).toEqual('PUBLIC')
    expect(wrapper.vm.activeChatroomId).toEqual('PUBLIC')
    expect(wrapper.vm.activeChatroomType).toEqual('PUBLIC')
  })

  test('changeTypeChoosen to private', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'resetChatrooms')

    initComponent()
    wrapper.vm.typeChoosen = 'PUBLIC'
    wrapper.vm.changeTypeChoosen('PRIVATE')

    expect(spy).toBeCalledTimes(1)
    expect(wrapper.vm.typeChoosen).toEqual('PRIVATE')
  })

  test('stopPolling', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'stopPolling')

    initComponent()
    wrapper.vm.stopPolling()

    expect(spy).toBeCalledTimes(1)
  })

  test('resetChatroomPoll', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'initChatroomPoll')
      .mockImplementation(() => Promise.resolve())

    initComponent()
    wrapper.vm.resetChatroomPoll()

    expect(spy).toBeCalledTimes(1)
  })

  test('resetMessagePoll', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'initMessagesPoll')
      .mockImplementation(() => Promise.resolve())

    initComponent()
    wrapper.vm.resetMessagePoll()

    expect(spy).toBeCalledTimes(1)
  })

  test('resetMessageBottomPoll', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'initMessageBottomPoll')
      .mockImplementation(() => Promise.resolve())

    initComponent()
    wrapper.vm.resetMessageBottomPoll()

    expect(spy).toBeCalledTimes(1)
  })

  test('initChatroomPoll', () => {
    jest.useFakeTimers()
    jest.spyOn(Chatrooms.methods, 'initReadMessagesPoll').mockImplementation(() => Promise.resolve())
    initComponent()
    wrapper.vm.initChatroomPoll()
    expect(setInterval).toHaveBeenCalledTimes(1)
  })

  test('chatroomPollTimerCallback', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'fetchChatrooms')
    initComponent()
    wrapper.vm.chatroomPollTimerCallback()
    expect(spy).toBeCalledTimes(1)
  })

  test('chatroomPollCallback', () => {
    initComponent()
    wrapper.vm.chatroomPollCallback()
    expect(wrapper.vm.chatroomPage).toEqual(1)
  })

  test('initMessagesPoll', () => {
    jest.useFakeTimers()
    jest.spyOn(Chatrooms.methods, 'initReadMessagesPoll').mockImplementation(() => Promise.resolve())
    initComponent()
    wrapper.vm.initMessagesPoll()
    expect(setInterval).toHaveBeenCalledTimes(1)
  })

  test('messagesPollTimerCallback', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'fetchMessages')
    initComponent()
    wrapper.vm.messagesPollTimerCallback()
    expect(spy).toBeCalledTimes(1)
  })

  test('messagesPollCallback', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'initMessageBottomPoll').mockImplementation(() => Promise.resolve())
    initComponent({
      messages: [{ id: 'messageId', sender: { id: 'senderId' } }],
      chatrooms: [{ id: 'chatroomId' }]
    })
    wrapper.vm.messagesPollCallback()
    expect(spy).toBeCalledTimes(1)
  })

  test('initMessageBottomPoll', () => {
    jest.useFakeTimers()
    jest.spyOn(Chatrooms.methods, 'initReadMessagesPoll').mockImplementation(() => Promise.resolve())
    initComponent()
    wrapper.vm.initMessageBottomPoll()
    expect(setInterval).toHaveBeenCalledTimes(1)
  })

  test('messagesBottomPollTimerCallback', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'fetchMessagesAfterPivot')
    initComponent()
    wrapper.vm.messagesBottomPollTimerCallback()
    expect(spy).toBeCalledTimes(1)
  })

  test('messagesBottomPollCallback1', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'scrollMessageToBottom').mockImplementation(() => Promise.resolve())
    initComponent({
      messages: [{ id: 'messageId', sender: { id: 'senderId' } }],
      chatrooms: [{ id: 'chatroomId' }]
    })
    wrapper.vm.messagesBottomPollCallback1()
    expect(spy).toBeCalledTimes(1)
  })

  test('messagesBottomPollCallback2', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'resetMessages')
    initComponent()
    wrapper.vm.changingChatroom = true
    wrapper.vm.messagesBottomPollCallback2()
    expect(spy).toBeCalledTimes(1)
  })

  test('initReadMessagesPoll', () => {
    jest.useFakeTimers()
    initComponent()
    wrapper.vm.initMessageBottomPoll()
    expect(setInterval).toHaveBeenCalledTimes(2)
  })

  test('readMessagesPollTimerCallback', () => {
    chatroomApi.updateSeenStatus = jest.fn()
    initComponent({
      messages: [{ id: 'messageId', sender: { id: 'senderId' } }],
      chatrooms: [{ id: 'chatroomId' }]
    })
    wrapper.vm.readMessagesPollTimerCallback()
    expect(chatroomApi.updateSeenStatus).toBeCalledTimes(1)
  })

  test('activeChatroomId watch', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'resetMessages')
    initComponent()
    wrapper.vm.activeChatroomId = 'newChatroomId'
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.vm.changingChatroom).toBe(true)
  })

  test('isSearching watch', () => {
    const spy = jest.spyOn(Chatrooms.methods, 'resetMessages')
    initComponent()
    wrapper.vm.isSearching = true
    expect(spy).toBeCalledTimes(1)
  })
})
