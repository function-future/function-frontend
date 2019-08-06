import myQuestionnaireApi from '@/api/controller/my-questionnaire'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Questionnaire Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getMyQuestionnaires', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    myQuestionnaireApi.getMyQuestionnaires(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getListAppraisees', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    myQuestionnaireApi.getListAppraisees(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionnaireData', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    myQuestionnaireApi.getQuestionnaireData(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestion', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    myQuestionnaireApi.getQuestion(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('addQuestionnaireResponse', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    myQuestionnaireApi.addQuestionnaireResponse(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })
})
