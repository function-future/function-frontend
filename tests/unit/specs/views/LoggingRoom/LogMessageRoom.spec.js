import LogMessageRoom from '@/views/LoggingRoom/LogMessageRoom'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import loggingRoomApi from '@/api/controller/logging-room'
import Vuex from 'vuex'
import moment from 'moment'
import VueRouter from 'vue-router'


jest.mock('@/api/controller/logging-room')

describe('LogMessageRoom', () => {
  let wrapper
  let store
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore () {
    const state = {
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const getters = {
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      state,
      getters
    })

    return {
      store,
      state,
      getters
    }
  }

  function initWrapper (store, options) {
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    const router = new VueRouter([])
    return shallowMount(LogMessageRoom, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseButton',
        'InfiniteLoading',
        'BaseInput',
        'font-awesome-icon'
      ],
      propsData: {
        title: 'title'
      },
      mocks: {
        $toasted
      }
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = initWrapper(store.store)
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('infiniteHandler case 1', () => {
    loggingRoomApi.getLogMessages = success => {
      success({
        data: []
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initComponent()
    wrapper.vm.page = 1
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 2', () => {
    loggingRoomApi.getLogMessages = success => {
      success({
        data: []
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initComponent()
    wrapper.vm.page = 2
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 3', () => {
    loggingRoomApi.getLogMessages = success => {
      success({
        data: [{}, {}, {}]
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initComponent()
    wrapper.vm.page = 1
    wrapper.vm.topics = [{}, {}, {}]
    wrapper.vm.infiniteHandler($state)
    expect($state.loaded).toHaveBeenCalled()
  })

  test('errorCallBack', () => {
    initComponent()
    global.console.log = jest.fn()
    wrapper.vm.errorCallBack('err')
    expect(console.log).toHaveBeenCalledWith('err')
  })

  test('submitMessage', () => {
    loggingRoomApi.createLogMessage = success => {
      success({
        data: []
      })
    }
    initComponent()
    wrapper.vm.$refs.infiniteLoading = {
      stateChanger: {
        reset: jest.fn()
      }
    }
    wrapper.vm.messageText = 'something'
    wrapper.vm.submitMessage()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
    expect(wrapper.vm.$refs.infiniteLoading.stateChanger.reset).toHaveBeenCalled()
    expect(wrapper.vm.messageText).toEqual('')
    expect(wrapper.vm.page).toEqual(1)
    expect(wrapper.vm.logMessages.length).toEqual(0)
  })


  test('computeLogMessageDate', () => {
    const messages = [
      {
        createdAt: Date.now() - 86400000
      },
      {
        createdAt: Date.now() - 86400000
      },
      {
        createdAt: Date.now()
      }
    ]
    const spy = jest.spyOn(LogMessageRoom.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.computedLogMessagesDate(messages)

    expect(spy).toBeCalledTimes(4)
    expect(result[0].isNewDate).toBe(true)
    expect(result[1].isNewDate).toBe(false)
    expect(result[2].isNewDate).toBe(true)
  })

  test('toDateList', () => {
    const time = Date.now()
    initComponent()
    expect(wrapper.vm.toDateList(time)).toEqual([moment(time).year(), moment(time).month(), moment(time).date()])
  })

  test('printDateSeparator today', () => {
    const message = {
      createdAt: Date.now()
    }
    const spy = jest.spyOn(LogMessageRoom.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual('Today')
  })

  test('printDateSeparator yesterday', () => {
    const message = {
      createdAt: Date.now() - 86400000
    }
    const spy = jest.spyOn(LogMessageRoom.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual('Yesterday')
  })

  test('printDateSeparator < yesterday', () => {
    const message = {
      createdAt: (Date.now() - 2 * 86400000)
    }
    const spy = jest.spyOn(LogMessageRoom.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.printDateSeparator(message)
    console.log(moment(message.createdAt).format('DD MMM YY'))
    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual(moment(message.createdAt).format('DD MMM YY'))
  })

  test('submitMessageButton case 1', () => {
    const spy = jest.spyOn(LogMessageRoom.methods, 'submitMessage')
    const event = {
      keyCode: 12
    }

    initComponent()
    wrapper.vm.submitMessageButton(event)
    expect(spy).not.toHaveBeenCalled()
  })

  test('submitMessageButton case 2', () => {
    const spy = jest.spyOn(LogMessageRoom.methods, 'submitMessage')
    const event = {
      keyCode: 13
    }

    initComponent()
    wrapper.vm.submitMessageButton(event)
    expect(spy).not.toHaveBeenCalled()
  })

  test('submitMessageButton case 3', () => {
    const spy = jest.spyOn(LogMessageRoom.methods, 'submitMessage')
    const event = {
      keyCode: 12
    }

    initComponent()
    wrapper.vm.messageText = 'something'
    wrapper.vm.submitMessageButton(event)
    expect(spy).not.toHaveBeenCalled()
  })

  test('submitMessageButton case 4', () => {
    loggingRoomApi.createLogMessage = success => {
      success({
        data: []
      })
    }
    const spy = jest.spyOn(LogMessageRoom.methods, 'submitMessage')
    initComponent()
    wrapper.vm.messageText = 'something'
    wrapper.vm.$refs.infiniteLoading = {
      stateChanger: {
        reset: jest.fn()
      }
    }
    wrapper.vm.submitMessageButton({
      keyCode: 13
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
    expect(wrapper.vm.$refs.infiniteLoading.stateChanger.reset).toHaveBeenCalled()
    expect(wrapper.vm.messageText).toEqual('')
    expect(wrapper.vm.page).toEqual(1)
    expect(wrapper.vm.logMessages.length).toEqual(0)
  })
})
