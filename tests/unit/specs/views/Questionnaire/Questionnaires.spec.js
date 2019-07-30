import Questionnaires from '@/views/Questionnaire/Questionnaires'
import { shallowMount } from '@vue/test-utils'
import questionnaireApi from '@/api/controller/questionnaire'

jest.mock('@/api/controller/questionnaire')

describe('QuestionnaireResults', () => {
  let wrapper

  function initWrapper () {
    const $router = {}

    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    wrapper = shallowMount(Questionnaires, {
      stubs: [
        'SearchBar',
        'BaseButton',
        'QuestionnaireCard',
        'InfiniteLoading',
        'ModalDeleteConfirmation',
        'font-awesome-icon'
      ],
      mocks: {
        $router,
        $toasted
      }
    })
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('goCreate', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionnairesCreate'
    })
  })

  test('openDeleteModal', () => {
    const value = {
      id: 'id',
      title: 'title'
    }
    initWrapper()
    wrapper.vm.openDeleteModal(value)
    expect(wrapper.vm.deleteConfirmationModal.show).toBe(true)
    expect(wrapper.vm.deleteConfirmationModal.id).toEqual(value.id)
    expect(wrapper.vm.deleteConfirmationModal.title).toEqual(value.title)
  })

  test('closeDeleteModal', () => {
    initWrapper()
    wrapper.vm.closeDeleteModal()
    expect(wrapper.vm.deleteConfirmationModal.show).toBe(false)
    expect(wrapper.vm.deleteConfirmationModal.id).toEqual('')
    expect(wrapper.vm.deleteConfirmationModal.title).toEqual('')
  })

  test('deleteQuestionnaireWithId', () => {
    questionnaireApi.deleteQuestionnaire = success => {
      success()
    }
    const spyResetState = jest.spyOn(Questionnaires.methods, 'resetState')
    const spyCloseDeleteModal = jest.spyOn(Questionnaires.methods, 'closeDeleteModal')

    initWrapper()
    wrapper.vm.$refs.infiniteLoading = {
      stateChanger: {
        reset: jest.fn()
      }
    }
    wrapper.vm.deleteQuestionnaireWithId()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
    expect(spyResetState).toHaveBeenCalled()
    expect(spyCloseDeleteModal).toHaveBeenCalled()
    expect(wrapper.vm.$refs.infiniteLoading.stateChanger.reset).toHaveBeenCalled()
  })

  test('submitMessageErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    wrapper.vm.submitMessageErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('searchHandler', () => {
    questionnaireApi.getQuestionnaires = success => {
      success({
        data: {}
      })
    }
    initWrapper()
    wrapper.vm.searchHandler('test')
    expect(wrapper.vm.questionnaires).toEqual({})
    expect(wrapper.vm.keyword).toEqual('test')
  })

  test('infiniteHandler case 1', () => {
    questionnaireApi.getQuestionnaires = success => {
      success({
        data: []
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initWrapper()
    wrapper.vm.keyword = ''
    wrapper.vm.page = 1
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 2', () => {
    questionnaireApi.getQuestionnaires = success => {
      success({
        data: [1, 2, 3]
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initWrapper()
    wrapper.vm.keyword = ''
    wrapper.vm.page = 2
    wrapper.vm.infiniteHandler($state)
    expect($state.loaded).toHaveBeenCalled()
  })

  test('infiniteHandler case 3', () => {
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initWrapper()
    wrapper.vm.keyword = 'keyword'
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('resetState', () => {
    initWrapper()
    wrapper.vm.resetState()
    expect(wrapper.vm.questionnaires).toEqual([])
    expect(wrapper.vm.keyword).toEqual('')
    expect(wrapper.vm.page).toEqual(1)
    expect(wrapper.vm.size).toEqual(10)
  })
})
