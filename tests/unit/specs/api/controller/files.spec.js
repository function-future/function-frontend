import api from '@/api/controller/files'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Files Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getFileList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getFileList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createFolder', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    const configuration = { headers: { 'Content-Type': 'multipart/form-data' } }
    api.createFolder(callback, data, errorHandler, configuration)
    expect(spy).toBeCalledTimes(1)
  })

  test('uploadFile', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    const configuration = { headers: { 'Content-Type': 'multipart/form-data' } }
    api.uploadFile(callback, data, errorHandler, configuration)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteFile', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteFile(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('downloadFile', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    const configuration = {}
    api.downloadFile(callback, data, errorHandler, configuration)
    expect(spy).toBeCalledTimes(1)
  })
})
