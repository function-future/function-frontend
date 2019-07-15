import api from '@/api/controller/discussions'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Discussions Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getCourseDiscussions', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getCourseDiscussions(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('postCourseDiscussion', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.postCourseDiscussion(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
