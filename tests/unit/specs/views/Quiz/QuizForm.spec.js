import QuizForm from '@/views/Quiz/QuizForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

describe('QuizForm', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(VeeValidate)
    return lv
  }

  function initStore () {
    const state = {
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      },
      questionBanks: []
    }
    const actions = {
      fetchQuizById: jest.fn(),
      updateQuizDetail: jest.fn(),
      createQuiz: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      accessList: state => state.accessList,
      questionBanks: state => state.questionBanks
    }
    const store = new Vuex.Store({
      state,
      actions,
      getters
    })

    return {
      store,
      state,
      actions,
      getters
    }
  }

  function createWrapper (store, options) {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(QuizForm, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'b-button',
        'b-field',
        'b-input',
        'b-icon'
      ],
      mocks: {
        $toasted
      },
      propsData: {
        editMode: true
      },
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  beforeEach(() => {
    initComponent()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage editMode', () => {
    wrapper.setProps({ editMode: true })
    const spy = jest.spyOn(wrapper.vm, 'getQuizDetail')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initPage add new', () => {
    wrapper.setProps({ editMode: false })
    wrapper.vm.initPage()
  })

  test('getQuizDetail', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchQuizById')
    wrapper.vm.getQuizDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuizDetail', () => {
    const response = {
      id: 'QZ001',
      startDate: 1000,
      endDate: 1010
    }
    wrapper.vm.successFetchingQuizDetail(response)
    expect(wrapper.vm.quizDetail).toEqual(response)
    expect(wrapper.vm.calendarDetails.dates).toEqual([new Date(1000), new Date(1010)])
  })

  test('failedFetchingQuizDetail', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedFetchingQuizDetail()
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


  test('updateQuiz', () => {
    wrapper.setProps({ editMode: true })
    wrapper.vm.calendarDetails.dates = [new Date(1000), new Date(1010)]
    wrapper.quizDetail = {
      questionBanks: [
        {
          id: 'BNK001'
        }
      ]
    }
    const spy = jest.spyOn(wrapper.vm, 'updateQuizDetail')
    wrapper.vm.updateQuiz()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUpdatingQuizDetail', () => {
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successUpdatingQuizDetail()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'scoringAdmin'
    })
  })

  test('failedUpdatingQuizDetail', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedUpdatingQuizDetail()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('newQuiz', () => {
    wrapper.setProps({ editMode: false })
    wrapper.vm.calendarDetails.dates = [new Date(1000), new Date(1010)]
    wrapper.quizDetail = {
      questionBanks: [
        {
          id: 'BNK001'
        }
      ]
    }
    const spy = jest.spyOn(wrapper.vm, 'createQuiz')
    wrapper.vm.newQuiz()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCreatingQuiz', () => {
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successCreatingQuiz()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'scoringAdmin'
    })
  })

  test('failedCreatingQuiz', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedCreatingQuiz()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('removeQuestionBank', () => {
    wrapper.vm.quizDetail = {
      questionBanks: [
        {
          id: 'BNK001'
        },
        {
          id: 'BNK001'
        }
      ]
    }
    wrapper.vm.removeQuestionBank('BNK001')
    expect(wrapper.vm.quizDetail.questionBanks).toEqual([
      {
        id: 'BNK001'
      }
    ])
  })

  test('toggleQuestionBankSelectModal', () => {
    wrapper.vm.toggleQuestionBankSelectModal()
    expect(wrapper.vm.showSelectQuestionBankModal).toEqual(true)
  })

  test('closeQuestionBankModal', () => {
    wrapper.vm.closeQuestionBankModal()
    expect(wrapper.vm.showSelectQuestionBankModal).toEqual(false)
  })

  test('setSelectedBanks', () => {
    const bank = [{
      id: 'BNK001'
    }]
    wrapper.vm.setSelectedBanks(bank)
    expect(wrapper.vm.showSelectQuestionBankModal).toEqual(false)
    expect(wrapper.vm.quizDetail.questionBanks).toEqual([
      {
        id: 'BNK001'
      }
    ])
  })

  test('cancel', () => {
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'go')
    wrapper.vm.cancel()
    expect(routerSpy).toHaveBeenCalledTimes(1)
  })
})
