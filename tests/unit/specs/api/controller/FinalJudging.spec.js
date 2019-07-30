import api from '@/api/controller/final-judging'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Quiz Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getJudgingList', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getJudgingList(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getJudgingDetail', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getJudgingDetail(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('getComparison', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const data = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getComparison(callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('postFinalScore', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.postFinalScore(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('createJudging', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.createJudging(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateJudgingDetail', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.updateJudgingDetail(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteJudging', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const data = {}
    const payload = {}
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.deleteJudging(callback, data, payload, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })
})
