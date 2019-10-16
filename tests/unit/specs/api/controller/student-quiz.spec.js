import api from '@/api/controller/student-quiz'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('QuestionBanks Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getQuizzes', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getQuizzes(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuizDetail', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getQuizDetail(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestions', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getQuestions(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('postQuizAnswer', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.postQuizAnswer(callback, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
