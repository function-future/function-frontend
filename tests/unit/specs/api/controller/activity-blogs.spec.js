import api from '@/api/controller/activity-blogs'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Activity Blogs Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getActivityBlogList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getActivityBlogList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getUserActivityBlogList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getUserActivityBlogList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getActivityBlogDetail', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getActivityBlogDetail(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createActivityBlog', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createActivityBlog(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateActivityBlog', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateActivityBlog(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteActivityBlog', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteActivityBlog(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('uploadResource', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.uploadResource(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
