import QuestionnaireResultsQuestionnaireDetail from '@/views/Questionnaire/QuestionnaireResultsQuestionnaireDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('QuestionnaireResultsQuestionDetail', () => {
  let wrapper
  let store

  function initStore (initState) {
    let state = {
      currentResultQuestionnaireDetail: {},
      currentResultQuestionResponsesList: {},
      ...initState
    }
    let getters = {
      currentResultQuestionnaireDetail: () => state.currentResultQuestionnaireDetail,
      currentResultQuestionResponsesList: () => state.currentResultQuestionResponsesList
    }
    let actions = {
      fetchCurrentQuestionnaireDetail: jest.fn(),
      fetchCurrentQuestionResponses: jest.fn()
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

    wrapper = shallowMount(QuestionnaireResultsQuestionnaireDetail, {
      store: store.store,
      localVue,
      propsData,
      stubs: [
        'QuestionnaireCard',
        'QuestionCard',
        'font-awesome-icon'
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

  test('goToQUestionnaireResult', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToQuestionnaireResult()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })

  test('goToQuestionDetail', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToQuestionDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
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
    expect(store.actions.fetchCurrentQuestionResponses).toHaveBeenCalled()
  })

})
