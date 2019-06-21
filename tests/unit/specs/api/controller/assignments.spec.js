import api from '@/api/controller/assignments'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Assignment Controller', () => {
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
    api.getAssignmentsList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createAssignment', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createAssignment(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
