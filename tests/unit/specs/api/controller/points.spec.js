import api from '@/api/controller/points'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Points Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getPoints', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getPoints(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
