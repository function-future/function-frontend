import store from '@/store/modules/my-questionnaire'
import myQuestionnaireApi from '@/api/controller/my-questionnaire'
import questionnaireApi from '@/api/controller/questionnaire'

jest.mock('@/api/controller/questionnaire')
jest.mock('@/api/controller/my-questionnaire')

describe('mutations', () => {
  let state

  beforeEach(() => {
    state = {
      myQuestionnaires: [],
      myListAppraisees: [],
      currentQuestionsQuestionnaire: []
    }
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('RESET_MY_QUESTIONNAIRES', () => {
    store.mutations.RESET_MY_QUESTIONNAIRES(state)
    expect(state.myQuestionnaires).toEqual([])
  })

  test('PUSH_MY_QUESTIONNAIRE', () => {
    store.mutations.PUSH_MY_QUESTIONNAIRE(state, ['test'])
    expect(state.myQuestionnaires).toEqual(['test'])
  })

  test('RESET_MY_LIST_APPRAISEES', () => {
    store.mutations.RESET_MY_LIST_APPRAISEES(state)
    expect(state.myListAppraisees).toEqual([])
  })

  test('PUSH_MY_LIST_APPRAISEES', () => {
    store.mutations.PUSH_MY_LIST_APPRAISEES(state, ['test'])
    expect(state.myListAppraisees).toEqual(['test'])
  })

  test('RESET_CURRENT_QUESTIONNAIRE', () => {
    store.mutations.RESET_CURRENT_QUESTIONNAIRE(state)
    expect(state.currentQuestionnaire).toEqual({})
  })

  test('ASSIGN_CURRENT_QUESTIONNAIRE', () => {
    store.mutations.ASSIGN_CURRENT_QUESTIONNAIRE(state, 'test')
    expect(state.currentQuestionnaire).toEqual('test')
  })

  test('RESET_CURRENT_QUESTIONNAIRE_DATA', () => {
    store.mutations.RESET_CURRENT_QUESTIONNAIRE_DATA(state)
    expect(state.currentQuestionnaireData).toEqual({})
  })

  test('ASSIGN_CURRENT_QUESTIONNAIRE_DATA', () => {
    store.mutations.ASSIGN_CURRENT_QUESTIONNAIRE_DATA(state, 'test')
    expect(state.currentQuestionnaireData).toEqual('test')
  })

  test('RESET_CURRENT_APPRAISEE_TO_SCORE', () => {
    store.mutations.RESET_CURRENT_APPRAISEE_TO_SCORE(state)
    expect(state.currentAppraiseeToScore).toEqual({})
  })

  test('ASSIGN_CURRENT_APPRAISEE_TO_SCORE', () => {
    store.mutations.ASSIGN_CURRENT_APPRAISEE_TO_SCORE(state, 'test')
    expect(state.currentAppraiseeToScore).toEqual('test')
  })

  test('RESET_QUESTIONS_QUESTIONNAIRE', () => {
    store.mutations.RESET_QUESTIONS_QUESTIONNAIRE(state)
    expect(state.currentQuestionsQuestionnaire).toEqual([])
  })

  test('PUSH_QUESTIONS_QUESTIONNAIRE', () => {
    store.mutations.PUSH_QUESTIONS_QUESTIONNAIRE(state, ['test'])
    expect(state.currentQuestionsQuestionnaire).toEqual(['test'])
  })
})

describe('actions', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('fetchMyQuestionnaires', () => {
    const response = {}
    myQuestionnaireApi.getMyQuestionnaires = success => {
      success(response)
    }
    const commit = jest.fn()
    const state = {}
    const data = {}
    const fail = jest.fn()
    store.actions.fetchMyQuestionnaires({ state, commit }, { data, fail })
    expect(commit).toHaveBeenCalledWith('RESET_MY_QUESTIONNAIRES')
    expect(commit).toHaveBeenCalledWith('PUSH_MY_QUESTIONNAIRE', response.data)
  })

  test('fetchMyListApprisees', () => {
    const response = {}
    myQuestionnaireApi.getListAppraisees = success => {
      success(response)
    }
    const commit = jest.fn()
    const state = {}
    const data = {}
    const fail = jest.fn()
    store.actions.fetchMyListApprisees({ state, commit }, { data, fail })
    expect(commit).toHaveBeenCalledWith('RESET_MY_LIST_APPRAISEES')
    expect(commit).toHaveBeenCalledWith('PUSH_MY_LIST_APPRAISEES', response.data)
  })

  test('fetchCurrentQuestionnaire', () => {
    const response = {}
    questionnaireApi.getQuestionnaire = success => {
      success(response)
    }
    const commit = jest.fn()
    const state = {}
    const data = {}
    const fail = jest.fn()
    store.actions.fetchCurrentQuestionnaire({ state, commit }, { data, fail })
    expect(commit).toHaveBeenCalledWith('RESET_CURRENT_QUESTIONNAIRE')
    expect(commit).toHaveBeenCalledWith('ASSIGN_CURRENT_QUESTIONNAIRE', response.data)
  })

  test('saveAppraisee', () => {
    const commit = jest.fn()
    const data = {}
    store.actions.saveAppraisee({ commit }, data)
    expect(commit).toHaveBeenCalledWith('ASSIGN_CURRENT_APPRAISEE_TO_SCORE', data.name)
  })

  test('fetchCurrentQuestionsQuestionnaire', () => {
    const response = {}
    myQuestionnaireApi.getQuestion = success => {
      success(response)
    }
    const commit = jest.fn()
    const state = {}
    const data = {}
    const fail = jest.fn()
    const cb = jest.fn()
    store.actions.fetchCurrentQuestionsQuestionnaire({ state, commit }, { data, fail, cb })
    expect(commit).toHaveBeenCalledWith('RESET_QUESTIONS_QUESTIONNAIRE')
    expect(commit).toHaveBeenCalledWith('PUSH_QUESTIONS_QUESTIONNAIRE', response.data)
    expect(cb).toHaveBeenCalledWith(response)
  })

  test('fetchCurrentQuestionnaireData', () => {
    const response = {}
    myQuestionnaireApi.getQuestionnaireData = success => {
      success(response)
    }
    const commit = jest.fn()
    const state = {}
    const data = {}
    const fail = jest.fn()
    const cb = jest.fn()
    store.actions.fetchCurrentQuestionnaireData({ state, commit }, { data, fail, cb })
    expect(commit).toHaveBeenCalledWith('RESET_CURRENT_QUESTIONNAIRE_DATA')
    expect(commit).toHaveBeenCalledWith('ASSIGN_CURRENT_QUESTIONNAIRE_DATA', response.data)
    expect(cb).toHaveBeenCalledWith(response)
  })

  test('resetQuestionnaireList', () => {
    const commit = jest.fn()
    const state = {}
    store.actions.resetQuestionnaireList({ state, commit })
    expect(commit).toHaveBeenCalledWith('RESET_MY_LIST_APPRAISEES')
  })
})

describe('getters', () => {
  let state

  beforeEach(() => {
    state = {
      myQuestionnaires: 'myQuestionnaires',
      myListAppraisees: 'myListAppraisees',
      currentQuestionnaire: 'currentQuestionnaire',
      currentQuestionnaireData: 'currentQuestionnaireData',
      currentAppraiseeToScore: 'currentAppraiseeToScore',
      currentQuestionsQuestionnaire: 'currentQuestionsQuestionnaire'
    }
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('myQuestionnaires', () => {
    expect(store.getters.myQuestionnaires(state)).toEqual(state.myQuestionnaires)
  })

  test('myListAppraisees', () => {
    expect(store.getters.myListAppraisees(state)).toEqual(state.myListAppraisees)
  })

  test('currentQuestionnaire', () => {
    expect(store.getters.currentQuestionnaire(state)).toEqual(state.currentQuestionnaire)
  })

  test('currentQuestionnaireData', () => {
    expect(store.getters.currentQuestionnaireData(state)).toEqual(state.currentQuestionnaireData)
  })

  test('currentAppraiseeToScore', () => {
    expect(store.getters.currentAppraiseeToScore(state)).toEqual(state.currentAppraiseeToScore)
  })

  test('currentQuestionsQuestionnaire', () => {
    expect(store.getters.currentQuestionsQuestionnaire(state)).toEqual(state.currentQuestionsQuestionnaire)
  })
})
