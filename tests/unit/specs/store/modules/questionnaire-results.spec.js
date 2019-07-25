import store from '@/store/modules/questionnaire-results'
import questionnaireResultsApi from '@/api/controller/questionnaire-results'

jest.mock('@/api/controller/questionnaire-results')

describe('mutations', () => {
  let state

  beforeEach(() => {
    state = {
      listAppraiseeResults: [],
      currentAppraiseeResult: null,
      currentAppraiseeResultQuetionnaires: [],
      currentResultQuestionnaireDetail: {},
      currentResultQuestionResponsesList: [],
      currentResultQuestionDetail: {},
      currentResultsQuestionDetailResponsesList: []
    }
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('RESET_LIST_APPRAISEE_RESULTS', () => {
    store.mutations.RESET_LIST_APPRAISEE_RESULTS(state)
    expect(state.listAppraiseeResults).toEqual([])
  })

  test('PUSH_LIST_APPRAISEE_RESULTS', () => {
    store.mutations.PUSH_LIST_APPRAISEE_RESULTS(state, ['test'])
    expect(state.listAppraiseeResults).toEqual(['test'])
  })

  test('RESET_CURRENT_APPRAISEE_RESULTS', () => {
    store.mutations.RESET_CURRENT_APPRAISEE_RESULTS(state)
    expect(state.currentAppraiseeResult).toEqual({})
  })

  test('ASSIGN_CURRENT_APPRAISEE_RESULTS', () => {
    store.mutations.ASSIGN_CURRENT_APPRAISEE_RESULTS(state, ['test'])
    expect(state.currentAppraiseeResult).toEqual(['test'])
  })

  test('RESET_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES', () => {
    store.mutations.RESET_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES(state)
    expect(state.currentAppraiseeResultQuetionnaires).toEqual([])
  })

  test('PUSH_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES', () => {
    store.mutations.PUSH_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES(state, ['test'])
    expect(state.currentAppraiseeResultQuetionnaires).toEqual(['test'])
  })

  test('RESET_CURRENT_QUESTIONNAIRE_DETAIL', () => {
    store.mutations.RESET_CURRENT_QUESTIONNAIRE_DETAIL(state)
    expect(state.currentResultQuestionnaireDetail).toEqual({})
  })

  test('ASSIGN_CURRENT_QUESTIONNAIRE_DETAIL', () => {
    store.mutations.ASSIGN_CURRENT_QUESTIONNAIRE_DETAIL(state, ['test'])
    expect(state.currentResultQuestionnaireDetail).toEqual(['test'])
  })

  test('RESET_CURRENT_QUESTION_RESPONSES_LIST', () => {
    store.mutations.RESET_CURRENT_QUESTION_RESPONSES_LIST(state)
    expect(state.currentResultQuestionResponsesList).toEqual([])
  })

  test('PUSH_CURRENT_QUESTION_RESPONSES_LIST', () => {
    store.mutations.PUSH_CURRENT_QUESTION_RESPONSES_LIST(state, ['test'])
    expect(state.currentResultQuestionResponsesList).toEqual(['test'])
  })

  test('RESET_CURRENT_QUESTION_DETAIL', () => {
    store.mutations.RESET_CURRENT_QUESTION_DETAIL(state)
    expect(state.currentResultQuestionDetail).toEqual({})
  })

  test('ASSIGN_CURRENT_QUESTION_DETAIL', () => {
    store.mutations.ASSIGN_CURRENT_QUESTION_DETAIL(state, ['test'])
    expect(state.currentResultQuestionDetail).toEqual(['test'])
  })

  test('RESET_CURRENT_QUESTION_DETAIL_RESPONSES_LIST', () => {
    store.mutations.RESET_CURRENT_QUESTION_DETAIL_RESPONSES_LIST(state)
    expect(state.currentResultsQuestionDetailResponsesList).toEqual([])
  })

  test('PUSH_CURRENT_QUESTION_DETAIL_RESPONSES_LIST', () => {
    store.mutations.PUSH_CURRENT_QUESTION_DETAIL_RESPONSES_LIST(state, ['test'])
    expect(state.currentResultsQuestionDetailResponsesList).toEqual(['test'])
  })

  describe('actions', () => {
    afterEach(() => {
      jest.restoreAllMocks()
    })

    test('sanity test', () => {
      expect(true).toBe(true)
    })

    test('fetchAppraiseeResults', () => {
      const response = {}
      questionnaireResultsApi.getUserSummary = success => {
        success(response)
      }
      const state = {}
      const commit = jest.fn()
      const data = {}
      const fail = jest.fn()
      store.actions.fetchAppraiseeResults({ state, commit }, { data, fail })
      expect(commit).toHaveBeenCalledWith('RESET_LIST_APPRAISEE_RESULTS')
      expect(commit).toHaveBeenCalledWith('PUSH_LIST_APPRAISEE_RESULTS', response.data)
    })

    test('fetchCurrentAppraiseeResults', () => {
      const response = {}
      questionnaireResultsApi.getUserSummaryById = success => {
        success(response)
      }
      const state = {}
      const commit = jest.fn()
      const data = {}
      const fail = jest.fn()
      store.actions.fetchCurrentAppraiseeResults({ state, commit }, { data, fail })
      expect(commit).toHaveBeenCalledWith('RESET_CURRENT_APPRAISEE_RESULTS')
      expect(commit).toHaveBeenCalledWith('ASSIGN_CURRENT_APPRAISEE_RESULTS', response.data)
    })

    test('fetchCurrentAppraiseeResultsQuestionnaires', () => {
      const response = {}
      questionnaireResultsApi.getQuestionnaireSimpleSummary = success => {
        success(response)
      }
      const state = {}
      const commit = jest.fn()
      const data = {
        params: {}
      }
      const fail = jest.fn()
      store.actions.fetchCurrentAppraiseeResultsQuestionnaires({ state, commit }, { data, fail })
      expect(commit).toHaveBeenCalledWith('RESET_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES')
      expect(commit).toHaveBeenCalledWith('PUSH_CURRENT_APPRAISEE_RESULTS_QUESTIONNAIRES', response.data)
    })

    test('fetchCurrentQuestionnaireDetail', () => {
      const response = {}
      questionnaireResultsApi.getQuestionnaireSummaryDetail = success => {
        success(response)
      }
      const state = {}
      const commit = jest.fn()
      const data = {}
      const fail = jest.fn()
      store.actions.fetchCurrentQuestionnaireDetail({ state, commit }, { data, fail })
      expect(commit).toHaveBeenCalledWith('RESET_CURRENT_QUESTIONNAIRE_DETAIL')
      expect(commit).toHaveBeenCalledWith('ASSIGN_CURRENT_QUESTIONNAIRE_DETAIL', response.data)
    })

    test('fetchCurrentQuestionResponses', () => {
      const response = {}
      questionnaireResultsApi.getQuestionSummaryResponse = success => {
        success(response)
      }
      const state = {}
      const commit = jest.fn()
      const data = {}
      const fail = jest.fn()
      store.actions.fetchCurrentQuestionResponses({ state, commit }, { data, fail })
      expect(commit).toHaveBeenCalledWith('RESET_CURRENT_QUESTION_RESPONSES_LIST')
      expect(commit).toHaveBeenCalledWith('PUSH_CURRENT_QUESTION_RESPONSES_LIST', response.data)
    })

    test('fetchCurrentResultQuestionDetail', () => {
      const response = {}
      questionnaireResultsApi.getQuestionQuestionnaireSummaryResponse = success => {
        success(response)
      }
      const state = {}
      const commit = jest.fn()
      const data = {}
      const fail = jest.fn()
      store.actions.fetchCurrentResultQuestionDetail({ state, commit }, { data, fail })
      expect(commit).toHaveBeenCalledWith('RESET_CURRENT_QUESTION_DETAIL')
      expect(commit).toHaveBeenCalledWith('ASSIGN_CURRENT_QUESTION_DETAIL', response.data)
    })

    test('fetchCurrentResultsQuestionDetailResponsesList', () => {
      const response = {}
      questionnaireResultsApi.getQuestionnaireAnswerDetailResponse = success => {
        success(response)
      }
      const state = {}
      const commit = jest.fn()
      const data = {}
      const fail = jest.fn()
      const cb = jest.fn()
      store.actions.fetchCurrentResultsQuestionDetailResponsesList({ state, commit }, { data, fail, cb })
      expect(commit).toHaveBeenCalledWith('RESET_CURRENT_QUESTION_DETAIL_RESPONSES_LIST')
      expect(commit).toHaveBeenCalledWith('PUSH_CURRENT_QUESTION_DETAIL_RESPONSES_LIST', response.data)
      expect(cb).toHaveBeenCalledWith(response)
    })
  })
})

describe('getters', () => {
  let state

  beforeEach(() => {
    state = {
      listAppraiseeResults: 'listAppraiseeResults',
      currentAppraiseeResult: 'currentAppraiseeResult',
      currentAppraiseeResultQuetionnaires: 'currentAppraiseeResultQuetionnaires',
      currentResultQuestionnaireDetail: 'currentResultQuestionnaireDetail',
      currentResultQuestionResponsesList: 'currentResultQuestionResponsesList',
      currentResultQuestionDetail: 'currentResultQuestionDetail',
      currentResultsQuestionDetailResponsesList: 'currentResultsQuestionDetailResponsesList'
    }
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('listAppraiseeResults', () => {
    expect(store.getters.listAppraiseeResults(state)).toEqual(state.listAppraiseeResults)
  })

  test('currentAppraiseeResult', () => {
    expect(store.getters.currentAppraiseeResult(state)).toEqual(state.currentAppraiseeResult)
  })

  test('currentAppraiseeResultQuetionnaires', () => {
    expect(store.getters.currentAppraiseeResultQuetionnaires(state)).toEqual(state.currentAppraiseeResultQuetionnaires)
  })

  test('currentResultQuestionnaireDetail', () => {
    expect(store.getters.currentResultQuestionnaireDetail(state)).toEqual(state.currentResultQuestionnaireDetail)
  })

  test('currentResultQuestionResponsesList', () => {
    expect(store.getters.currentResultQuestionResponsesList(state)).toEqual(state.currentResultQuestionResponsesList)
  })

  test('currentResultQuestionDetail', () => {
    expect(store.getters.currentResultQuestionDetail(state)).toEqual(state.currentResultQuestionDetail)
  })

  test('currentResultsQuestionDetailResponsesList', () => {
    expect(store.getters.currentResultsQuestionDetailResponsesList(state)).toEqual(state.currentResultsQuestionDetailResponsesList)
  })
})
