import api from '@/api/controller/user'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('User Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getAssignmentList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getProfileData(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('changePassword', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.changePassword(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateProfilePicture ', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateProfilePicture(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
