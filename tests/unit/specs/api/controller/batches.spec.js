import api from '@/api/controller/batches'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Batches Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getBatchList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getBatchList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getBatchDetail', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getBatchDetail(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createBatch', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createBatch(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateBatch', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateBatch(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteBatch', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteBatch(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
