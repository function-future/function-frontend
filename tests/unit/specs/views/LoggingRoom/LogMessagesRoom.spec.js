import LogMessagesRoom from '@/views/LoggingRoom/LogMessageRoom'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import loggingRoomApi from '@/api/controller/logging-room'
import Vuex from 'vuex'
import moment from 'moment'

jest.mock('@/api/controller/logging-room')

describe('LogMessageRoom', () => {
  let wrapper
  let store
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
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
    const $route = {
      params: {}
    }

    return shallowMount(LogMessagesRoom, {
      ...options,
      store,
      localVue,
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
        $toasted,
        $route
      }
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = initWrapper(store.store)
  }

  afterEach(() => {
    jest.resetAllMocks()
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

  test('errorCallBack', () => {
    initComponent()
    global.console.log = jest.fn()
    wrapper.vm.errorCallBack('err')
    expect(console.log).toHaveBeenCalledWith('err')
  })

  test('submitMessage', () => {
    loggingRoomApi.createLogMessages = success => {
      success({
        data: []
      })
    }
    initComponent()
    const spy = jest.spyOn(loggingRoomApi, 'createLogMessage')
    wrapper.vm.submitMessage()
    expect(spy).toHaveBeenCalledTimes(1)
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
    const spy = jest.spyOn(LogMessagesRoom.methods, 'toDateList')

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
    const spy = jest.spyOn(LogMessagesRoom.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual('Today')
  })

  test('printDateSeparator yesterday', () => {
    const message = {
      createdAt: Date.now() - 86400000
    }
    const spy = jest.spyOn(LogMessagesRoom.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.printDateSeparator(message)

    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual('Yesterday')
  })

  test('printDateSeparator < yesterday', () => {
    const message = {
      createdAt: (Date.now() - 2 * 86400000)
    }
    const spy = jest.spyOn(LogMessagesRoom.methods, 'toDateList')

    initComponent()
    const result = wrapper.vm.printDateSeparator(message)
    console.log(moment(message.createdAt).format('DD MMM YY'))
    expect(spy).toBeCalledTimes(2)
    expect(result).toEqual(moment(message.createdAt).format('DD MMM YY'))
  })
})
