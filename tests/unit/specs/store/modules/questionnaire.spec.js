import store from '@/store/modules/questionnaire'
import questionnaireApi from '@/api/controller/questionnaire'

jest.mock('@/api/controller/questionnaire')

describe('mutations', () => {
  let state

  beforeEach(() => {
    state = {
      listQuestionnaires: [],
      currentQuestions: [],
      currentAppraisee: [],
      currentAppraiser: []
    }
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('RESET_LIST_QUESTIONNAIRES', () => {
    store.mutations.RESET_LIST_QUESTIONNAIRES(state)
    expect(state.listQuestionnaires).toEqual([])
  })

  test('PUSH_LIST_QUESTIONNAIRES', () => {
    store.mutations.PUSH_LIST_QUESTIONNAIRES(state, ['test'])
    expect(state.listQuestionnaires).toEqual(['test'])
  })

  test('RESET_CURRENT_QUESTIONNAIRE_ADMIN', () => {
    store.mutations.RESET_CURRENT_QUESTIONNAIRE_ADMIN(state)
    expect(state.currentQuestionnaireAdmin).toEqual({})
  })

  test('ASSIGN_CURRENT_QUESTIONNAIRE_ADMIN', () => {
    store.mutations.ASSIGN_CURRENT_QUESTIONNAIRE_ADMIN(state, 'test')
    expect(state.currentQuestionnaireAdmin).toEqual('test')
  })

  test('RESET_CURRENT_QUESTIONS', () => {
    store.mutations.RESET_CURRENT_QUESTIONS(state)
    expect(state.currentQuestions).toEqual([])
  })

  test('PUSH_CURRENT_QUESTIONS', () => {
    store.mutations.PUSH_CURRENT_QUESTIONS(state, ['test'])
    expect(state.currentQuestions).toEqual(['test'])
  })

  test('RESET_CURRENT_APPRAISEE', () => {
    store.mutations.RESET_CURRENT_APPRAISEE(state)
    expect(state.currentAppraisee).toEqual([])
  })

  test('PUSH_CURRENT_APPRAISEE', () => {
    store.mutations.PUSH_CURRENT_APPRAISEE(state, ['test'])
    expect(state.currentAppraisee).toEqual(['test'])
  })

  test('RESET_CURRENT_APPRAISER', () => {
    store.mutations.RESET_CURRENT_APPRAISER(state)
    expect(state.currentAppraiser).toEqual([])
  })

  test('PUSH_CURRENT_APPRAISER', () => {
    store.mutations.PUSH_CURRENT_APPRAISER(state, ['test'])
    expect(state.currentAppraiser).toEqual(['test'])
  })
})

describe('actions', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('fetchListQuestionnaires', () => {
    const response = {}
    questionnaireApi.getQuestionnaires = success => {
      success(response)
    }
    const state = {}
    const commit = jest.fn()
    const data = {}
    const fail = jest.fn()
    store.actions.fetchListQuestionnaires({ state, commit }, { data, fail })
    expect(commit).toHaveBeenCalledWith('RESET_LIST_QUESTIONNAIRES')
    expect(commit).toHaveBeenCalledWith('PUSH_LIST_QUESTIONNAIRES', response.data)
  })

  test('fetchCurrentQuestionnaireAdmin', () => {
    const response = {}
    questionnaireApi.getQuestionnaire = success => {
      success(response)
    }
    const state = {}
    const commit = jest.fn()
    const data = {}
    const fail = jest.fn()
    store.actions.fetchCurrentQuestionnaireAdmin({ state, commit }, { data, fail })
    expect(commit).toHaveBeenCalledWith('RESET_CURRENT_QUESTIONNAIRE_ADMIN')
    expect(commit).toHaveBeenCalledWith('ASSIGN_CURRENT_QUESTIONNAIRE_ADMIN', response.data)
  })

  test('setCurrentQuestionnaireAdmin', () => {
    const commit = jest.fn()
    const data = {}
    store.actions.setCurrentQuestionnaireAdmin({ commit }, { data })
    expect(commit).toHaveBeenCalledWith('ASSIGN_CURRENT_QUESTIONNAIRE_ADMIN', data)
  })

  test('fetchCurrentQuestions', () => {
    const response = {}
    questionnaireApi.getQuestionsQuestionnaire = success => {
      success(response)
    }
    const state = {}
    const commit = jest.fn()
    const data = {}
    const fail = jest.fn()
    store.actions.fetchCurrentQuestions({ state, commit }, { data, fail })
    expect(commit).toHaveBeenCalledWith('RESET_CURRENT_QUESTIONS')
    expect(commit).toHaveBeenCalledWith('PUSH_CURRENT_QUESTIONS', response.data)
  })

  test('fetchCurrentAppraisee', () => {
    const response = {}
    questionnaireApi.getAppraiseeQuestionnaire = success => {
      success(response)
    }
    const state = {}
    const commit = jest.fn()
    const data = {}
    const fail = jest.fn()
    const cb = jest.fn()
    store.actions.fetchCurrentAppraisee({ state, commit }, { data, fail, cb })
    expect(commit).toHaveBeenCalledWith('RESET_CURRENT_APPRAISEE')
    expect(commit).toHaveBeenCalledWith('PUSH_CURRENT_APPRAISEE', response.data)
    expect(cb).toHaveBeenCalledWith(response)
  })

  test('fetchCurrentAppraiser', () => {
    const response = {}
    questionnaireApi.getAppraiserQuestionnaire = success => {
      success(response)
    }
    const state = {}
    const commit = jest.fn()
    const data = {}
    const fail = jest.fn()
    const cb = jest.fn()
    store.actions.fetchCurrentAppraiser({ state, commit }, { data, fail, cb })
    expect(commit).toHaveBeenCalledWith('RESET_CURRENT_APPRAISER')
    expect(commit).toHaveBeenCalledWith('PUSH_CURRENT_APPRAISER', response.data)
    expect(cb).toHaveBeenCalledWith(response)
  })
})

describe('getters', () => {
  let state

  beforeEach(() => {
    state = {
      listQuestionnaires: 'listQuestionnaires',
      currentQuestionnaireAdmin: 'currentQuestionnaireAdmin',
      currentQuestions: 'currentQuestions',
      currentAppraisee: 'currentAppraisee',
      currentAppraiser: 'currentAppraiser'
    }
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('listQuestionnaires', () => {
    expect(store.getters.listQuestionnaires(state)).toEqual(state.listQuestionnaires)
  })

  test('currentQuestionnaireAdmin', () => {
    expect(store.getters.currentQuestionnaireAdmin(state)).toEqual(state.currentQuestionnaireAdmin)
  })

  test('currentQuestions', () => {
    expect(store.getters.currentQuestions(state)).toEqual(state.currentQuestions)
  })

  test('currentAppraisee', () => {
    expect(store.getters.currentAppraisee(state)).toEqual(state.currentAppraisee)
  })

  test('currentAppraiser', () => {
    expect(store.getters.currentAppraiser(state)).toEqual(state.currentAppraiser)
  })
})
