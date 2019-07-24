import QuestionnaireResultsMemberDetail from '@/views/Questionnaire/QuestionnaireResultsMemberDetail'
import Vuex from 'vuex'
import { createLocalVue, shallowMount } from '@vue/test-utils'

describe('QuestionnaireResultsMemberDetail', () => {
  let wrapper
  let store

  function initStore (initState) {
    const state = {
      currentAppraiseeResult: {},
      currentAppraiseeResultQuetionnaires: []
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
        'QuestionnaireCard'
      ],
      mocks: {
        $router,
        $route
      }
    })
  }

  test('')
})
