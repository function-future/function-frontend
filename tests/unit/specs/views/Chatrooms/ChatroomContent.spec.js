import ChatroomContent from '@/views/Chatrooms/ChatroomContent'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import moment from 'moment'

describe('ChatroomContent', () => {
  function generateLocalVue () {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    return localVue
  }

  function initComponent (chatroomId, messages, currentUser) {
    const localVue = generateLocalVue()
    const store = new Vuex.Store({
      modules: {
        chatrooms: {
          actions: {
            fetchDetailChatroom: jest.fn(),
            leaveChatroom: jest.fn(),
            enterChatroom: jest.fn(),
            resetMessages: jest.fn(),
            pushMessages: jest.fn(),
            unshiftMessages: jest.fn(),
            fetchMessages: jest.fn(),
            fetchMessagesBeforePivot: jest.fn(),
            createMessage: jest.fn(),
            updateChatroom: jest.fn(),
            toast: jest.fn()
          },
          getters: {
            messages: () => messages || [],
            currentUser: () => currentUser || {}
          }
        }
      }
    })

    return shallowMount(ChatroomContent, {
      localVue,
      stubs: [
        'CustomMobileNavBar',
        'InfiniteLoading',
        'MessageBubbleReceived',
        'MessageBubbleSent',
        'ModalChatroom',
        'b-input',
        'b-field',
        'b-icon'
      ],
      store,
      propsData: {
        chatroomId
      },
      methods: {
        initWebsocketConnection: jest.fn(),
        subscribe: jest.fn()
      },
      data: () => ({
        chatroom: {
          type: 'PRIVATE',
          name: null,
          members: [
            {
              id: '1',
              name: 'agung'
            },
            {
              id: '2',
              name: 'bambang'
            }
          ]
        }
      })
    })
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    let wrapper = initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('created 1', () => {
    let spy1 = jest.spyOn(ChatroomContent.methods, 'fetchDetailChatroom')
    let spy2 = jest.spyOn(ChatroomContent.methods, 'enterChatroom').mockImplementation(() => Promise.resolve())
    let spy3 = jest.spyOn(ChatroomContent.methods, 'refreshMessages').mockImplementation(() => Promise.resolve())
    initComponent('nonpublic')
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).toBeCalledTimes(1)
    expect(spy3).toBeCalledTimes(1)
  })

  test('created 2', () => {
    let spy1 = jest.spyOn(ChatroomContent.methods, 'fetchDetailChatroom')
    let spy2 = jest.spyOn(ChatroomContent.methods, 'enterChatroom').mockImplementation(() => Promise.resolve())
    let spy3 = jest.spyOn(ChatroomContent.methods, 'refreshMessages').mockImplementation(() => Promise.resolve())
    initComponent('public')
    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).toBeCalledTimes(1)
    expect(spy3).toBeCalledTimes(1)
  })

  test('destroyed', () => {
    let spy = jest.spyOn(ChatroomContent.methods, 'leaveChatroom')
    let wrapper = initComponent('public')
    wrapper.vm.$destroy()
    expect(spy).toBeCalledTimes(1)
  })

  test('watch chatroomId 1', done => {
    let wrapper = initComponent('public')
    let spy1 = jest.spyOn(wrapper.vm, 'fetchDetailChatroom')
    let spy2 = jest.spyOn(wrapper.vm, 'enterChatroom').mockImplementation(() => Promise.resolve())
    let spy3 = jest.spyOn(wrapper.vm, 'refreshMessages').mockImplementation(() => Promise.resolve())
    let spy4 = jest.spyOn(wrapper.vm, 'leaveChatroom').mockImplementation(() => Promise.resolve())
    wrapper.setProps({
      chatroomId: 'nonpublic'
    })
    wrapper.vm.$nextTick(() => {
      expect(spy1).toBeCalledTimes(1)
      expect(spy2).toBeCalledTimes(1)
      expect(spy3).toBeCalledTimes(1)
      expect(spy4).toBeCalledTimes(1)
      done()
    })
  })

  test('watch chatroomId 2', done => {
    let wrapper = initComponent('nonpublic')
    let spy1 = jest.spyOn(wrapper.vm, 'fetchDetailChatroom')
    let spy2 = jest.spyOn(wrapper.vm, 'enterChatroom').mockImplementation(() => Promise.resolve())
    let spy3 = jest.spyOn(wrapper.vm, 'refreshMessages').mockImplementation(() => Promise.resolve())
    let spy4 = jest.spyOn(wrapper.vm, 'leaveChatroom').mockImplementation(() => Promise.resolve())
    wrapper.setProps({
      chatroomId: 'public'
    })
    wrapper.vm.$nextTick(() => {
      expect(spy1).not.toHaveBeenCalled()
      expect(spy2).toBeCalledTimes(1)
      expect(spy3).toBeCalledTimes(1)
      expect(spy4).toBeCalledTimes(1)
      done()
    })
  })

  test('watch isSocketConnected', done => {
    let wrapper = initComponent('public')
    let spy = jest.spyOn(wrapper.vm, 'subscribeMessages').mockImplementation(() => Promise.resolve())
    wrapper.vm.isSocketConnected = true
    wrapper.vm.$nextTick(() => {
      expect(spy).toBeCalledTimes(1)
      done()
    })
  })

  test('computed chatroomName 1', () => {
    let wrapper = initComponent('public')
    expect(wrapper.vm.chatroomName).toEqual('Public')
  })

  test('computed chatroomName 2', () => {
    let wrapper = initComponent('public')
    let data = {
      chatroom: {
        type: 'GROUP',
        name: 'Group name'
      }
    }
    wrapper.setData(data)
    wrapper.setProps({
      chatroomId: 'nonpublic'
    })
    expect(wrapper.vm.chatroomName).toEqual(data.chatroom.name)
  })

  test('computed chatroomName 3', () => {
    let wrapper = initComponent('public')
    let data = {
      chatroom: {
        type: 'GROUP',
        name: null
      }
    }
    wrapper.setData(data)
    wrapper.setProps({
      chatroomId: 'nonpublic'
    })
    expect(wrapper.vm.chatroomName).toEqual('')
  })

  test('computed chatroomName 4', () => {
    let user = {
      id: '1'
    }
    let wrapper = initComponent('public', [], user)
    let data = {
      chatroom: {
        type: 'PRIVATE',
        name: null,
        members: [
          {
            id: '1',
            name: 'agung'
          },
          {
            id: '2',
            name: 'bambang'
          }
        ]
      }
    }
    wrapper.setData(data)
    wrapper.setProps({
      chatroomId: 'nonpublic'
    })
    expect(wrapper.vm.chatroomName).toEqual('bambang')
  })

  test('computed messageDate', () => {
    let messages = [
      {
        sender: {},
        time: Date.now() - 86400000
      },
      {
        sender: {},
        time: Date.now() - 86400000
      },
      {
        sender: {},
        time: Date.now()
      }
    ]
    let spy = jest.spyOn(ChatroomContent.methods, 'toDateList')
    let wrapper = initComponent('public', messages)

    let result = wrapper.vm.computedMessagesDate

    expect(spy).toBeCalledTimes(8)
    expect(result[0].isNewDate).toBe(true)
    expect(result[1].isNewDate).toBe(false)
    expect(result[2].isNewDate).toBe(true)
  })

  test('infiniteMessageHandler 1', () => {
    let $state = {
      loaded: jest.fn(),
      completed: jest.fn()
    }
    let wrapper = initComponent('public')
    wrapper.setData({
      lastMessageId: null
    })
    let spy = jest.spyOn(wrapper.vm, 'fetchMessages')
    wrapper.vm.infiniteMessageHandler($state)
    expect(spy).toBeCalledTimes(1)
  })

  test('infiniteMessageHandler 2', () => {
    let $state = {
      loaded: jest.fn(),
      completed: jest.fn()
    }
    let wrapper = initComponent('public')
    wrapper.setData({
      lastMessageId: 'id'
    })
    let spy = jest.spyOn(wrapper.vm, 'fetchMessagesBeforePivot')
    wrapper.vm.infiniteMessageHandler($state)
    expect(spy).toBeCalledTimes(1)
  })

  test('onFetchDetailError', () => {
    let wrapper = initComponent('public')
    let spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.onFetchDetailError()
    expect(spy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to fetch chatroom detail',
        type: 'is-danger'
      }
    })
  })

  test('onFetchDetailSuccess', () => {
    let wrapper = initComponent('public')
    let data = { data: {} }
    wrapper.vm.onFetchDetailSuccess(data)
    expect(wrapper.vm.chatroom).toEqual(data.data)
  })

  test('onFetchMessagesSuccess 1', () => {
    let $state = {
      loaded: jest.fn(),
      completed: jest.fn()
    }
    let response = {
      data: [
        {
          id: 'id'
        }
      ]
    }

    let wrapper = initComponent('public')
    let spy1 = jest.spyOn($state, 'loaded')
    let spy2 = jest.spyOn(wrapper.vm, 'unshiftMessages')
    wrapper.vm.onFetchMessagesSuccess($state)(response)
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).toBeCalledTimes(1)
  })

  test('onFetchMessagesSuccess 2', () => {
    let $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    let response = {
      data: []
    }

    let wrapper = initComponent('public')
    let spy1 = jest.spyOn($state, 'complete')
    let spy2 = jest.spyOn(wrapper.vm, 'unshiftMessages')
    wrapper.vm.onFetchMessagesSuccess($state)(response)
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).not.toHaveBeenCalled()
  })

  test('onError', () => {
    let wrapper = initComponent('public')
    let spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.onError()
    expect(spy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to connect to server',
        type: 'is-danger'
      }
    })
  })

  test('onSendMessageError', () => {
    let wrapper = initComponent('public')
    let spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.onSendMessageError()
    expect(spy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to send message',
        type: 'is-danger'
      }
    })
  })

  test('onKeyUp 1', () => {
    let wrapper = initComponent('public')
    let spy = jest.spyOn(wrapper.vm, 'sendMessage').mockImplementation(() => Promise.resolve())
    wrapper.vm.onKeyup({
      keyCode: 13
    })
    expect(spy).toBeCalledTimes(1)
  })

  test('onKeyUp 2', () => {
    let wrapper = initComponent('public')
    let spy = jest.spyOn(wrapper.vm, 'sendMessage').mockImplementation(() => Promise.resolve())
    wrapper.vm.onKeyup({
      keyCode: 133
    })
    expect(spy).not.toHaveBeenCalled()
  })

  test('onSubmitUpdateChatroom', () => {
    let wrapper = initComponent('public')
    let spy = jest.spyOn(wrapper.vm, 'updateChatroom')
    wrapper.vm.onSubmitUpdateChatroom()
    expect(spy).toBeCalledTimes(1)
  })

  test('onSuccessUpdateChatroom', () => {
    let wrapper = initComponent('public')
    let spy1 = jest.spyOn(wrapper.vm, 'fetchDetailChatroom')
    let spy2 = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.onSuccessUpdateChatroom()
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).toHaveBeenCalledWith({
      data: {
        message: 'Update chatroom success',
        type: 'is-success'
      }
    })
  })

  test('sendMessage 1', () => {
    let wrapper = initComponent('public')
    let spy = jest.spyOn(wrapper.vm, 'createMessage')
    wrapper.setData({ inputMessage: '' })
    wrapper.vm.sendMessage()
    expect(spy).not.toHaveBeenCalled()
  })

  test('sendMessage 2', () => {
    let wrapper = initComponent('public')
    let spy = jest.spyOn(wrapper.vm, 'createMessage')
    wrapper.setData({ inputMessage: 'asdf' })
    wrapper.vm.sendMessage()
    expect(spy).toBeCalledTimes(1)
  })

  test('toDateList', () => {
    const time = Date.now()
    const wrapper = initComponent('public')
    let date = wrapper.vm.toDateList(time)
    expect(date).toEqual([moment(time).year(), moment(time).month(), moment(time).date()])
  })

  test('printDateSeparator today', () => {
    const message = {
      time: Date.now()
    }
    const spy = jest.spyOn(ChatroomContent.methods, 'toDateList')

    const wrapper = initComponent('public')
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual('Today')
  })

  test('printDateSeparator yesterday', () => {
    const message = {
      time: Date.now() - 86400000
    }
    const spy = jest.spyOn(ChatroomContent.methods, 'toDateList')

    const wrapper = initComponent('public')
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual('Yesterday')
  })

  test('printDateSeparator < yesterday', () => {
    const message = {
      time: Date.now() - 2 * 86400000
    }
    const spy = jest.spyOn(ChatroomContent.methods, 'toDateList')

    const wrapper = initComponent('public')
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual(moment(message.time).format('DD MMM YY'))
  })

  test('refreshMessages 1', () => {
    let messagesSubscription = {
      unsubscribe: jest.fn()
    }
    let wrapper = initComponent('public')
    wrapper.vm.messagesSubscription = messagesSubscription
    let spy1 = jest.spyOn(messagesSubscription, 'unsubscribe')
    let spy2 = jest.spyOn(wrapper.vm, 'resetMessages')
    let spy3 = jest.spyOn(wrapper.vm, 'subscribeMessages').mockImplementation(() => Promise.resolve())
    wrapper.vm.refreshMessages()
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).toBeCalledTimes(1)
    expect(spy3).toBeCalledTimes(1)
  })

  test('refreshMessages 2', () => {
    let messagesSubscription = {
      unsubscribe: jest.fn()
    }
    let wrapper = initComponent('public')
    wrapper.vm.messagesSubscription = null
    let spy1 = jest.spyOn(messagesSubscription, 'unsubscribe')
    let spy2 = jest.spyOn(wrapper.vm, 'resetMessages')
    let spy3 = jest.spyOn(wrapper.vm, 'subscribeMessages').mockImplementation(() => Promise.resolve())
    wrapper.vm.refreshMessages()
    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).toBeCalledTimes(1)
    expect(spy3).toBeCalledTimes(1)
  })

  test('subscribeMessages 1', () => {
    let wrapper = initComponent('public')
    wrapper.vm.isSocketConnected = false
    let spy = jest.spyOn(wrapper.vm, 'subscribe').mockImplementation(() => Promise.resolve())
    wrapper.vm.subscribeMessages()
    expect(spy).not.toHaveBeenCalled()
  })

  test('subscribeMessages 2', () => {
    let wrapper = initComponent('public')
    wrapper.vm.isSocketConnected = true
    let spy = jest.spyOn(wrapper.vm, 'subscribe').mockImplementation(() => Promise.resolve())
    wrapper.vm.subscribeMessages()
    expect(spy).toBeCalledTimes(1)
  })

  test('messagesSubscriptionCallback', () => {
    let wrapper = initComponent('public')
    let spy1 = jest.spyOn(wrapper.vm, 'scrollMessageToBottom').mockImplementation(() => Promise.resolve())
    let spy2 = jest.spyOn(wrapper.vm, 'pushMessages')
    wrapper.vm.messagesSubscriptionCallback({ body: JSON.stringify({}) })
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).toBeCalledTimes(1)
  })

  test('scrollMessageToBottom', done => {
    let wrapper = initComponent('public')
    wrapper.vm.scrollMessageToBottom()
    wrapper.vm.$nextTick(() => {
      let container = wrapper.vm.$el.querySelector('#messages-container')
      expect(container.scrollTop).toBe(container.scrollHeight)
      done()
    })
  })

  test('showModal', () => {
    let wrapper = initComponent('public')
    wrapper.vm.showModal()
    expect(wrapper.vm.showUpdateModal).toBe(true)
  })
})
