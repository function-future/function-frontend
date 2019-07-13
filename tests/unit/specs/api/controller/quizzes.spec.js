import api from '@/api/controller/quizzes'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Quiz Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getQuizList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getQuizList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuizById', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getQuizById(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createQuiz', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createQuiz(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateQuiz', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateQuiz(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteQuiz', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteQuiz(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('copyQuiz', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.copyQuiz(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
