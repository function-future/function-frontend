import api from '@/api/controller/question-banks'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('QuestionBanks Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getQuestionBankList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getQuestionBankList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionBankById', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getQuestionBankById(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getQuestionList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionById', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getQuestionById(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createQuestionBank', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createQuestionBank(callback, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createQuestion', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createQuestion(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateQuestionBank', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateQuestionBank(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateQuestion', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateQuestion(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteQuestionBank', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteQuestionBank(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteQuestion', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteQuestion(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
