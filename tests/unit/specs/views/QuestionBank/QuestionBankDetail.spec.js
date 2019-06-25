import QuestionBankDetail from '@/views/QuestionBank/QuestionBankDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuestionBankDetail', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue() {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore() {
    const state = {
      questionBank: {}
    }
    const actions = {
      updateQuestionBank: jest.fn(),
      fetchQuestionBankDetail: jest.fn()
    }
    const getters = {
      questionBank: state => state.questionBank
    }
    const store = new Vuex.Store({
      modules: {
        questionBanks: {
          state,
          actions,
          getters,
          namespaced: true
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

  function createWrapper(store, options) {
    const router = new VueRouter([])
    return shallowMount(QuestionBankDetail, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'font-awesome-icon'
      ],
      mocks: {
        $toasted: {
          error: jest.fn(),
          success: jest.fn()
        },
        $router: {
          push: jest.fn()
        }
      },
      attachToDocument: true,
      sync: false
    })
  }

  function initComponent() {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('cancelButtonText true', () => {
    initComponent()
    wrapper.vm.editMode = true
    expect(wrapper.vm.cancelButtonText).toEqual('Cancel')
  })

  test('cancelButtonText false', () => {
    initComponent()
    wrapper.vm.editMode = false
    expect(wrapper.vm.cancelButtonText).toEqual('Return')
  })

  test('actionButtonText true', () => {
    initComponent()
    wrapper.vm.editMode = true
    expect(wrapper.vm.actionButtonText).toEqual('Save')
  })

  test('actionButtonText false', () => {
    initComponent()
    wrapper.vm.editMode = false
    expect(wrapper.vm.actionButtonText).toEqual('Edit')
  })

  test('initPage', () => {
    initComponent()
    wrapper.vm.fetchQuestionBankDetail = jest.fn()
    wrapper.vm.initPage()
    expect(wrapper.vm.fetchQuestionBankDetail).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionBankDetail', () => {
    initComponent()
    wrapper.vm.successFetchingQuestionBankDetail()
    expect(wrapper.vm.questionBankDetail).toEqual({})
  })

  test('failFetchingQuestionBankDetail', () => {
    initComponent()
    wrapper.vm.failFetchingQuestionBankDetail()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('actionButtonClicked editMode is true', () => {
    initComponent()
    wrapper.vm.editMode = true
    wrapper.vm.updateQuestionBank = jest.fn()
    wrapper.vm.actionButtonClicked()
    expect(wrapper.vm.updateQuestionBank).toHaveBeenCalledTimes(1)
  })

  test('actionButtonClicked editMode is false', () => {
    initComponent()
    wrapper.vm.editMode = false
    wrapper.vm.updateQuestionBank = jest.fn()
    wrapper.vm.actionButtonClicked()
    expect(wrapper.vm.updateQuestionBank).not.toHaveBeenCalled()
  })

  test('cancelButtonClicked editMode is true', () => {
    initComponent()
    wrapper.vm.editMode = true
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.cancelButtonClicked()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('cancelButtonClicked editMode is false', () => {
    initComponent()
    wrapper.vm.editMode = false
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.cancelButtonClicked()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBanks'
    })
  })

  test('successUpdatingQuestionBank', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successUpdatingQuestionBank()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBanks'
    })
  })

  test('failUpdatingQuestionBank', () => {
    initComponent()
    wrapper.vm.failUpdatingQuestionBank()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
