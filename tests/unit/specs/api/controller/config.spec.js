import api from '@/api/controller/config'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('config Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getMenuList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getMenuList(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getAccessList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getAccessList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
