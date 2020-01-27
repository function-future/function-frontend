import ChatroomList from '@/views/Chatrooms/ChatroomList'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('ChatroomList', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  function generateLocalVue () {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    return localVue
  }

  function initComponent (chatrooms, currentUser, isWithChatroom) {
    const localVue = generateLocalVue()
    const store = new Vuex.Store({
      modules: {
        chatrooms: {
          actions: {
            fetchChatrooms: jest.fn(),
            resetChatrooms: jest.fn(),
            pushChatrooms: jest.fn(),
            setChatroomsLimit: jest.fn(),
            unsetChatroomsLimit: jest.fn(),
            toast: jest.fn()
          },
          getters: {
            chatrooms: () => chatrooms || [],
            currentUser: () => currentUser || {}
          }
        }
      }
    })

    return shallowMount(ChatroomList, {
      localVue,
      stubs: ['ChatroomCard', 'InfiniteLoading', 'b-input', 'b-button', 'b-icon'],
      store,
      propsData: isWithChatroom ? {
        chatroomId: 'chatroomId'
      } : {},
      methods: {
        initWebsocketConnection: jest.fn(),
        subscribe: jest.fn()
      }
    })
  }

  test('created', () => {
    let spy = jest.spyOn(ChatroomList.methods, 'setChatroomsLimit')
    initComponent()
    expect(spy).toBeCalledTimes(1)
  })

  test('destroyed 1', () => {
    let spy1 = jest.spyOn(ChatroomList.methods, 'unsetChatroomsLimit')
    let wrapper = initComponent()
    wrapper.vm.chatroomSubscription = {
      unsubscribe: jest.fn()
    }
    let spy2 = jest.spyOn(wrapper.vm.chatroomSubscription, 'unsubscribe')
    wrapper.vm.$destroy()
    expect(spy1).toHaveBeenCalled()
    expect(spy2).toHaveBeenCalled()
  })

  test('destroyed 2', () => {
    let spy = jest.spyOn(ChatroomList.methods, 'unsetChatroomsLimit')
    let wrapper = initComponent()
    wrapper.vm.chatroomSubscription = null
    wrapper.vm.$destroy()
    expect(spy).toHaveBeenCalled()
  })

  test('watch search 1', done => {
    const wrapper = initComponent()
    wrapper.vm.chatroomSubscription = {
      unsubscribe: jest.fn()
    }
    let spy1 = jest.spyOn(wrapper.vm, 'fetchChatrooms')
    let spy2 = jest.spyOn(wrapper.vm.chatroomSubscription, 'unsubscribe')
    wrapper.vm.search = 'keyword'
    wrapper.vm.$nextTick(() => {
      expect(spy1).toBeCalledTimes(1)
      expect(spy2).toBeCalledTimes(1)
      done()
    })
  })

  test('watch search 2', done => {
    const wrapper = initComponent()
    wrapper.vm.chatroomSubscription = null
    let spy1 = jest.spyOn(wrapper.vm, 'fetchChatrooms')
    wrapper.vm.search = 'keyword'
    wrapper.vm.$nextTick(() => {
      expect(spy1).toBeCalledTimes(1)
      done()
    })
  })

  test('watch search 3', done => {
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'subscribe')
    wrapper.vm.search = null
    wrapper.vm.$nextTick(() => {
      expect(spy).toBeCalledTimes(1)
      done()
    })
  })

  test('watch search 4', done => {
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'subscribe')
    wrapper.vm.search = 'asdasd'
    wrapper.vm.$nextTick(() => {
      expect(spy).not.toHaveBeenCalled()
      done()
    })
  })

  test('watch isSocketConnected 1', done => {
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'subscribe')
    wrapper.vm.isSocketConnected = true
    wrapper.vm.$nextTick(() => {
      expect(spy).toBeCalledTimes(1)
      done()
    })
  })

  test('watch isSocketConnected 2', done => {
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'subscribe')
    wrapper.vm.isSocketConnected = false
    wrapper.vm.$nextTick(() => {
      expect(spy).not.toHaveBeenCalled()
      done()
    })
  })

  test('infiniteChatroomHandler 1', () => {
    let $state = {
      complete: jest.fn(),
      loaded: jest.fn()
    }
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'fetchChatrooms')
    wrapper.vm.totalSize = null
    wrapper.vm.infiniteChatroomHandler($state)
    expect(spy).toBeCalledTimes(1)
  })

  test('infiniteChatroomHandler 2', () => {
    let $state = {
      complete: jest.fn(),
      loaded: jest.fn()
    }
    const wrapper = initComponent()
    let spy = jest.spyOn($state, 'complete')
    wrapper.vm.totalSize = 10
    wrapper.vm.page = 2
    wrapper.vm.size = 10
    wrapper.vm.infiniteChatroomHandler($state)
    expect(spy).toBeCalledTimes(1)
  })

  test('infiniteChatroomHandler 3', () => {
    let $state = {
      complete: jest.fn(),
      loaded: jest.fn()
    }
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'setChatroomsLimit')
    wrapper.vm.totalSize = 10
    wrapper.vm.page = 2
    wrapper.vm.size = 3
    wrapper.vm.infiniteChatroomHandler($state)
    expect(spy).toBeCalledTimes(1)
  })

  test('onSetChatroomLimitSuccess', () => {
    let $state = {
      complete: jest.fn(),
      loaded: jest.fn()
    }
    const wrapper = initComponent()
    let spy = jest.spyOn($state, 'loaded')
    wrapper.vm.onSetChatroomLimitSuccess($state)()
    expect(spy).toBeCalledTimes(1)
  })

  test('onClickAdd', () => {
    const wrapper = initComponent()
    wrapper.vm.onClickAdd()
    expect(wrapper.emitted('clickAdd')).toBeTruthy()
  })

  test('onFetchChatroomsFail', () => {
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.onFetchChatroomsFail()
    expect(spy).toBeCalledWith({
      data: {
        message: 'Fail to fetch chatrooms',
        type: 'is-danger'
      }
    })
  })

  test('onError', () => {
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.onError()
    expect(spy).toBeCalledWith({
      data: {
        message: 'Fail to connect to server',
        type: 'is-danger'
      }
    })
  })

  test('onFetchInitialChatroomsSuccess', () => {
    let $state = {
      complete: jest.fn(),
      loaded: jest.fn()
    }
    const wrapper = initComponent()
    let spy1 = jest.spyOn($state, 'loaded')
    let spy2 = jest.spyOn(wrapper.vm, 'onFetchChatroomsSuccess').mockImplementation(() => Promise.resolve())
    wrapper.vm.onFetchInitialChatroomsSuccess($state)({
      paging: {
        totalRecords: 10
      }
    })
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).toBeCalledTimes(1)
  })

  test('onFetchChatroomsSuccess', () => {
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'updateChatrooms')
    wrapper.vm.onFetchChatroomsSuccess({})
    expect(spy).toBeCalledTimes(1)
  })

  test('getChatroomName 1', () => {
    const wrapper = initComponent()
    let chatroom = {
      type: 'GROUP',
      name: 'name'
    }
    expect(wrapper.vm.getChatroomName(chatroom)).toEqual(chatroom.name)
  })

  test('getChatroomName 2', () => {
    const wrapper = initComponent(null, {
      id: '1'
    })
    let chatroom = {
      type: 'PRIVATE',
      participants: [
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
    expect(wrapper.vm.getChatroomName(chatroom)).toEqual('bambang')
  })

  test('updateChatrooms', () => {
    const wrapper = initComponent()
    let spy1 = jest.spyOn(wrapper.vm, 'updateChatrooms')
    let spy2 = jest.spyOn(wrapper.vm, 'pushChatrooms')
    wrapper.vm.updateChatrooms({})
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).toBeCalledTimes(1)
  })

  test('chatroomSubscriptionCallback', () => {
    const wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'updateChatrooms')
    wrapper.vm.onFetchChatroomsSuccess({
      body: JSON.stringify({
        paging: {
          totalRecords: 10
        },
        data: []
      })
    })
    expect(spy).toBeCalledTimes(1)
  })

  test('onChatroomCardClicked', () => {
    const wrapper = initComponent()
    const chatroomId = 'chatroomId'
    wrapper.vm.onChatroomCardClicked(chatroomId)
    let emitted = wrapper.emitted('onClickChatroom')
    expect(emitted).toBeTruthy()
    expect(emitted[0]).toEqual([chatroomId])
  })
})
