import Websocket from '@/mixins/Websocket'
import { shallowMount } from '@vue/test-utils'
import Stomp from 'stompjs'

jest.mock('sockjs-client')
jest.mock('stompjs')

describe('Websocket', () => {
  function initComponent (opt) {
    return shallowMount(Websocket, opt)
  }

  let mockStompClient = {
    connect: jest.fn(),
    disconnect: jest.fn(),
    subscribe: jest.fn((topic, cb) => { cb() }),
    debug: null,
    connected: true
  }

  beforeEach(() => {
    Stomp.over.mockImplementation(() => {
      return mockStompClient
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('created', () => {
    let spy = jest.spyOn(Websocket.methods, 'initWebsocketConnection').mockImplementation(() => Promise.resolve())
    initComponent()
    expect(spy).toBeCalledTimes(1)
  })

  test('destroyed 1', () => {
    let spy = jest.spyOn(mockStompClient, 'disconnect')
    let wrapper = initComponent()
    wrapper.vm.$destroy()
    expect(spy).toBeCalledTimes(1)
  })

  test('destroyed 2', () => {
    let stompClient = {
      disconnect: jest.fn()
    }
    let spy = jest.spyOn(stompClient, 'disconnect')
    let wrapper = initComponent()
    wrapper.setData({ stompClient: null })
    wrapper.vm.$destroy()
    expect(spy).not.toHaveBeenCalled()
  })

  test('initWebsocketConnection', () => {
    let spy = jest.spyOn(mockStompClient, 'connect')
    initComponent()
    expect(spy).toHaveBeenCalled()
  })

  test('connectSuccessCallback 1', () => {
    let wrapper = initComponent()
    wrapper.vm.isSocketConnected = false
    wrapper.vm.connectSuccessCallback()
    expect(wrapper.vm.isSocketConnected).toBe(true)
  })

  test('connectSuccessCallback 2', () => {
    let spy = jest.spyOn(mockStompClient, 'disconnect')
    let wrapper = initComponent()
    wrapper.vm.isSocketConnected = false
    wrapper.vm.isDestroyed = true
    wrapper.vm.connectSuccessCallback()
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.isSocketConnected).toBe(false)
  })

  test('connectErrorCallback', () => {
    let wrapper = initComponent()
    wrapper.vm.isSocketConnected = true
    wrapper.vm.connectErrorCallback()
    expect(wrapper.vm.isSocketConnected).toBe(false)
  })

  test('subscribe', () => {
    let wrapper = initComponent()
    let cb = jest.fn()
    let spy = jest.spyOn(mockStompClient, 'subscribe')
    wrapper.vm.subscribe('topic', cb)
    expect(spy).toBeCalledTimes(1)
    expect(cb).toBeCalledTimes(1)
  })
})
