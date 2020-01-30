import Questionnaires from '@/views/Questionnaire/Questionnaires'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import questionnaireApi from '@/api/controller/questionnaire'

jest.mock('@/api/controller/questionnaire')

describe('Questionnaires', () => {
  let wrapper
  let store
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore () {
    const actions = {
      toast: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        QuestionnaireResults: {
          actions
        }
      }
    })
    return {
      store,
      actions
    }
  }

  function initWrapper (store, propsData, options) {
    const router = new VueRouter([])
    wrapper = shallowMount(Questionnaires, {
      ...options,
      store,
      localVue,
      router,
      propsData: {
        ...propsData
      },
      stubs: [
        'QuestionnaireCard',
        'InfiniteLoading',
        'ModalDeleteConfirmation',
        'font-awesome-icon',
        'b-loading',
        'b-field',
        'b-input',
        'b-select',
        'b-button'
      ],
      sync: false
    })
    return wrapper
  }

  function initComponent (propsData) {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = initWrapper(store.store, propsData)
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('goCreate', () => {
    initComponent()
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
    initComponent()
    questionnaireApi.deleteQuestionnaire = success => {
      success({
        code: 200,
        status: 'OK',
        data: {}
      })
    }
    const spyResetState = jest.spyOn(wrapper.vm, 'resetState')
    const spyCloseDeleteModal = jest.spyOn(wrapper.vm, 'closeDeleteModal')

    wrapper.vm.$refs.infiniteLoading = {
      stateChanger: {
        reset: jest.fn()
      }
    }
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.deleteQuestionnaireWithId()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Delete Questionnaire success',
        type: 'is-success'
      }
    })
    expect(wrapper.vm.$refs.infiniteLoading.stateChanger.reset).toHaveBeenCalled()
    expect(spyCloseDeleteModal).toHaveBeenCalled()
    expect(spyResetState).toHaveBeenCalled()
  })

  test('submitMessageErrorCallback', () => {
    initComponent()
    global.console.log = jest.fn()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.submitMessageErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'fail to delete questionnaire',
        type: 'is-danger'
      }
    })
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
