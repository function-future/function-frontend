import api from '@/api/controller/chatrooms'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Chatroom Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getChatrooms', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.getChatrooms(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getMessagesBeforePivot', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.getMessagesBeforePivot(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getMessagesAfterPivot', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.getMessagesAfterPivot(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getPublicMessages', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.getPublicMessages(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getChatroomDetails', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.getChatroomDetails(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getMessages', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.getMessages(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('createChatroom', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.createChatroom(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('createMessage', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.createMessage(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateChatroom', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.updateChatroom(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateSeenStatus', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.updateSeenStatus(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('enterChatroom', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.enterChatroom(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('leaveChatroom', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.leaveChatroom(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('setLimit', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.setLimit(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('unsetLimit', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.unsetLimit(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })
})
