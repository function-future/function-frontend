import api from '@/api/controller/auth'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Assignment Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getLoginStatus', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getLoginStatus(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('attemptLogin', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.attemptLogin(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('attemptLogout', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.attemptLogout(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
