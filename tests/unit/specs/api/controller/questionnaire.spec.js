import questionnaireApi from '@/api/controller/questionnaire'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Questionnaire Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getQuestionnaires', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = {}
    const errorHandler = jest.fn()
    questionnaireApi.getQuestionnaires(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionnaire', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.getQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('createQuestionnaire', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = {}
    const errorHandler = jest.fn()
    questionnaireApi.createQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateQuestionnaire', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.updateQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteQuestionnaire', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.deleteQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('addQuestionQuestionnaire', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.addQuestionQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionsQuestionnaire', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.getQuestionsQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateQuestionQuestionnaire', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.updateQuestionQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteQuestionQuestionnaire', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.deleteQuestionQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getAppraiseeQuestionnaire', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.getAppraiseeQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('addAppraiseeQuestionnaire', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.addAppraiseeQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteAppraiseeQuestionnaire', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.deleteAppraiseeQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getAppraiserQuestionnaire', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.getAppraiserQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('addAppraiserQuestionnaire', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.addAppraiserQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteAppraiserQuestionnaire', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    questionnaireApi.deleteAppraiserQuestionnaire(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })
})
