import api from '@/api/controller/courses'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Courses Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getCourseList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getCourseList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getMasterCourseList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getMasterCourseList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createCourse', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createCourse(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createMasterCourse', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createMasterCourse(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getCourseDetail', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getCourseDetail(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getMasterCourseDetail', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getMasterCourseDetail(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateCourse', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateCourse(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateMasterCourse', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateMasterCourse(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteCourse', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteCourse(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteMasterCourse', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteMasterCourse(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('copyCourse', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.copyCourse(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('downloadFileFromUrl', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const configuration = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.downloadFileFromUrl(data, callback, errorHandler, configuration)
    expect(spy).toBeCalledTimes(1)
  })
})
