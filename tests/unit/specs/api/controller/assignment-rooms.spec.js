import api from '@/api/controller/assignment-rooms'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Assignment Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getAssignmentRooms', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getAssignmentRooms(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getAssignmentRoomById', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getAssignmentRoomById(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateAssignmentRoomScore', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateAssignmentRoomScore(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getAssignmentRoomComments', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getAssignmentRoomComments(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createAssignmentRoomComment', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createAssignmentRoomComment(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateAssignmentScore', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateAssignmentScore(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
