import api from '@/api/controller/notifications'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Notification Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('getNotifications', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const error = jest.fn()
    api.getNotifications(callback, error, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('createNotification', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const error = jest.fn()
    const data = {}
    api.createNotification(callback, error, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getTotalUnseen', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const error = jest.fn()
    api.getTotalUnseen(callback, error)
    expect(spy).toBeCalledTimes(1)
  })

  test('readNotification', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const callback = jest.fn()
    const error = jest.fn()
    const data = { params: {} }
    api.readNotification(callback, error, data)
    expect(spy).toBeCalledTimes(1)
  })
})
