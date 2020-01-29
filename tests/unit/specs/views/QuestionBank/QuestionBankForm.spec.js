import QuestionBankForm from '@/views/QuestionBank/QuestionBankForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

describe('QuestionBankForm', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue() {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(VeeValidate)
    return lv
  }

  function initStore() {
    const state = {
      questionBank: {},
      accessList: {}
    }
    const actions = {
      fetchQuestionBankDetail: jest.fn(),
      createQuestionBank: jest.fn(),
      updateQuestionBank: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      questionBank: state => state.questionBank,
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      state,
      actions,
      getters,
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
    return shallowMount(QuestionBankForm, {
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

  test('initPage on new questionBank', () => {
    initComponent()
    wrapper.vm.editMode = false
    const spy = jest.spyOn(wrapper.vm, 'getBankDetail')
    wrapper.vm.initPage()
    expect(spy).not.toHaveBeenCalled()
  })

  test('initPage on edit questionBank', () => {
    initComponent()
    wrapper.vm.editMode = true
    const spy = jest.spyOn(wrapper.vm, 'getBankDetail')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getBankDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuestionBankDetail')
    wrapper.vm.getBankDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionBankDetail', () => {
    initComponent()
    const response = {
      id: 'BNK001',
      label: 'Lorem',
      description: 'asd'
    }
    wrapper.vm.successFetchingQuestionBankDetail(response)
    expect(wrapper.vm.questionBankDetail).toEqual(response)
  })

  test('failedFetchingQuestionBankDetail', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedFetchingQuestionBankDetail()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('validateBeforeSubmit is resolved', (done) => {
    initComponent()
    const callback = jest.fn()
    wrapper.vm.$validator.validateAll = jest.fn().mockResolvedValue(true)
    wrapper.vm.validateBeforeSubmit(callback)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$validator.validateAll).toHaveBeenCalledTimes(1)
      done()
    })
  })

  test('validateBeforeSubmit is rejected', () => {
    initComponent()
    const callback = jest.fn()
    wrapper.vm.validateBeforeSubmit(() => {})
    expect(callback).toHaveBeenCalledTimes(0)
  })

  test('submitQuestionBank', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.submitQuestionBank()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess editMode false', () => {
    initComponent()
    wrapper.vm.editMode = false
    const spy = jest.spyOn(wrapper.vm, 'createBank')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess editMode true', () => {
    initComponent()
    wrapper.vm.editMode = true
    wrapper.vm.updateJudgingDetail = jest.fn()
    const spy = jest.spyOn(wrapper.vm, 'updateBank')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('createBank', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'createQuestionBank')
    wrapper.vm.createBank()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCreatingQuestionBank', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successCreatingQuestionBank()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'scoringAdmin'
    })
  })

  test('failedCreatingQuestionBank', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedCreatingQuestionBank()
    expect(wrapper.vm.isSubmitting).toEqual(false)
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('updateBank', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'updateQuestionBank')
    wrapper.vm.updateBank()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUpdatingQuestionBank', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$route.params.id = 'BNK001'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successUpdatingQuestionBank()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBankDetail',
      params: {
        bankId: 'BNK001'
      }
    })
  })

  test('failedUpdatingQuestionBank', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedUpdatingQuestionBank()
    expect(wrapper.vm.isSubmitting).toEqual(false)
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('cancel', () => {
    initComponent()
    wrapper.vm.$router.go = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1)
  })
})
