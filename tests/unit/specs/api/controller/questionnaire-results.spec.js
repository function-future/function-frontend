import questionnaireResultsApi from '@/api/controller/questionnaire-results'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Questionnaire Results Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getQuestionnaires', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = {
      params: {}
    }
    const errorHandler = jest.fn()
    questionnaireResultsApi.getUserSummary(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getUserSummaryById', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = {
      params: {}
    }
    const errorHandler = jest.fn()
    questionnaireResultsApi.getUserSummaryById(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionnaireSimpleSummary', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = {
      params: {}
    }
    const errorHandler = jest.fn()
    questionnaireResultsApi.getQuestionnaireSimpleSummary(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionnaireSummaryDetail', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = {
      params: {}
    }
    const errorHandler = jest.fn()
    questionnaireResultsApi.getQuestionnaireSummaryDetail(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionSummaryResponse', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = {
      params: {}
    }
    const errorHandler = jest.fn()
    questionnaireResultsApi.getQuestionSummaryResponse(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionQuestionnaireSummaryResponse', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = {
      params: {}
    }
    const errorHandler = jest.fn()
    questionnaireResultsApi.getQuestionQuestionnaireSummaryResponse(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getQuestionnaireAnswerDetailResponse', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = {
      params: {}
    }
    const errorHandler = jest.fn()
    questionnaireResultsApi.getQuestionnaireAnswerDetailResponse(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })
})
