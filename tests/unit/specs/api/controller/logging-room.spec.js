import loggingRoomApi from '@/api/controller/logging-room'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Logging Room Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getLoggingRoomsByMember', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.getLoggingRoomsByMember(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('createLoggingRoom', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.createLoggingRoom(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getLoggingRoom', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.getLoggingRoom(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateLoggingRoom', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.updateLoggingRoom(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteLoggingRoom', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.deleteLoggingRoom(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getLoggingRoomTopic', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.getLoggingRoomTopic(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('createTopic', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.createTopic(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getTopic', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.getTopic(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateTopic', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.updateTopic(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteTopic', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.deleteTopic(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getLogMessages', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.getLogMessages(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('createLogMessage', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    loggingRoomApi.createLogMessage(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })
})
