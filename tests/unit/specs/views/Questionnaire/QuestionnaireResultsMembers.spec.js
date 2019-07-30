import QuestionnaireResultsMembers from '@/views/Questionnaire/QuestionnaireResultsMembers'
import questionnaireResultsApi from '@/api/controller/questionnaire-results'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/api/controller/questionnaire-results')

describe('QuestionnaireResultsMembers', () => {
  let wrapper

  function initWrapper () {
    const $route = {
      params: {}
    }
    const $router = {}
    wrapper = shallowMount(QuestionnaireResultsMembers, {
      stubs: [
        'SearchBar',
        'QuestionnaireParticipantCard',
        'InfiniteLoading'
      ],
      mocks: {
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

  test('goToMemberDetail', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToMemberDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })

  test('infiniteHandler case 1', () => {
    questionnaireResultsApi.getUserSummary = success => {
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
    questionnaireResultsApi.getUserSummary = success => {
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
    wrapper.vm.errorHandler('err')
    expect(console.log).toHaveBeenCalledWith('err')
  })
})
