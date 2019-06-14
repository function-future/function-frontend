import api from '@/api/controller/menu-list'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('MenuList Controller', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getAssignmentList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getMenuList(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
