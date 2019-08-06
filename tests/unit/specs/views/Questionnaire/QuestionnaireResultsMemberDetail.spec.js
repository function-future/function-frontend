import QuestionnaireResultsMemberDetail from '@/views/Questionnaire/QuestionnaireResultsMemberDetail'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import questionnaireResultsApi from '@/api/controller/questionnaire-results'

jest.mock('@/api/controller/questionnaire-results')

describe('QuestionnaireResultsMemberDetail', () => {
  let wrapper
  let store

  function initStore (initState) {
    const state = {
      currentAppraiseeResult: null,
      currentAppraiseeResultQuetionnaires: [],
      ...initState
    }
    const getters = {
      currentAppraiseeResult: () => state.currentAppraiseeResult,
      currentAppraiseeResultQuetionnaires: () => state.currentAppraiseeResultQuetionnaires
    }
    const actions = {
      fetchCurrentAppraiseeResults: jest.fn(),
      fetchCurrentAppraiseeResultsQuestionnaires: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        questionnaires: {
          state,
          actions,
          getters
        }
      }
    })
    return {
      store, actions, getters, state
    }
  }

  function initWrapper (initState) {
    const $router = {}
    const $route = {
      params: {}
    }
    const localVue = createLocalVue()
    localVue.use(Vuex)

    store = initStore(initState)
    wrapper = shallowMount(QuestionnaireResultsMemberDetail, {
      localVue,
      store: store.store,
      stubs: [
        'QuestionnaireParticipantDetailCard',
        'QuestionnaireCard',
        'InfiniteLoading'
      ],
      mocks: {
        $router,
        $route
      }
    })
  }

  test('created', () => {
    initWrapper()
    expect(store.actions.fetchCurrentAppraiseeResults).toHaveBeenCalled()
  })

  test('goToQuestionnaireResult', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToQuestionnaireResult()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })

  test('infiniteHandler case 1', () => {
    questionnaireResultsApi.getQuestionnaireSimpleSummary = success => {
      success({
        data: []
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initWrapper()
    wrapper.vm.page = 1
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 2', () => {
    questionnaireResultsApi.getQuestionnaireSimpleSummary = success => {
      success({
        data: [1, 2, 3]
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initWrapper()
    wrapper.vm.page = 2
    wrapper.vm.infiniteHandler($state)
    expect($state.loaded).toHaveBeenCalled()
  })

  test('errorHandler', () => {
    global.console.log = jest.fn()
    initWrapper()
    wrapper.vm.errorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
  })
})
