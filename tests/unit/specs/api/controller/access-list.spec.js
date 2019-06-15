import api from '@/api/controller/access-list'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('AccessList Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getAssignmentList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getAccessList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
