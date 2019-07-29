import QuestionnaireResultsQuestionDetail from '@/views/Questionnaire/QuestionnaireResultsQuestionDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('QuestionnaireResultsQuestionDetail', () => {
  let wrapper
  let store

  function initStore (initState) {
    let state = {
      currentResultQuestionnaireDetail: {},
      currentResultQuestionDetail: {},
      currentResultsQuestionDetailResponsesList: [],
      ...initState
    }
    let getters = {
      currentResultQuestionnaireDetail: () => state.currentResultQuestionnaireDetail,
      currentResultQuestionDetail: () => state.currentResultQuestionDetail,
      currentResultsQuestionDetailResponsesList: () => state.currentResultsQuestionDetailResponsesList
    }
    let actions = {
      fetchCurrentQuestionnaireDetail: jest.fn(),
      fetchCurrentResultQuestionDetail: jest.fn(),
      fetchCurrentResultsQuestionDetailResponsesList: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        myQuestionnaire: {
          state,
          actions,
          getters
        }
      }
    })
    return {
      store,
      state,
      actions,
      getters
    }
  }

  function initWrapper (propsData, route, initState) {
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }

    const $route = {
      params: {}
    }
    const $router = {}

    const localVue = createLocalVue()
    localVue.use(Vuex)

    store = initStore(initState)

    wrapper = shallowMount(QuestionnaireResultsQuestionDetail, {
      store: store.store,
      localVue,
      propsData,
      stubs: [
        'QuestionnaireCard',
        'QuestionCard',
        'font-awesome-icon',
        'QuestionnaireParticipantSimpleCard'
      ],
      mocks: {
        $toasted,
        $route,
        $router
      }
    })
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('errorHandler', () => {
    global.console.log = jest.fn()
    initWrapper()
    wrapper.vm.errorHandler('err')
    expect(console.log).toHaveBeenCalledWith('err')
  })

  test('created', () => {
    initWrapper()
    expect(store.actions.fetchCurrentQuestionnaireDetail).toHaveBeenCalled()
    expect(store.actions.fetchCurrentResultQuestionDetail).toHaveBeenCalled()
    expect(store.actions.fetchCurrentResultsQuestionDetailResponsesList).toHaveBeenCalled()
  })
})
