import api from '@/api/controller/users'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Users Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getUserList', async (done) => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getUserList(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
    done()
  })

  test('getUserListWithRoleAndName', async (done) => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    api.getUserListWithRoleAndName(callback, errorHandler)
    const errorHandler = jest.fn()
    expect(spy).toBeCalledTimes(1)
    done()
  })

  test('getUserDetail', async (done) => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getUserDetail(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
    done()
  })

  test('createUser', (done) => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createUser(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
    done()
  })

  test('updateUser', (done) => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateUser(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
    done()
  })

  test('deleteUser', (done) => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteUser(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
    done()
  })
})
