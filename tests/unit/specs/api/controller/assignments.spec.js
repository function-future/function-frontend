import api from '@/api/controller/assignments'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Assignment Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
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

  test('getAssignmentById', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getAssignmentById(callback, data, errorHandler)
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

  test('updateAssignment', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateAssignment(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('copyAssignment', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.copyAssignment(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteAssignment', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteAssignment(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
