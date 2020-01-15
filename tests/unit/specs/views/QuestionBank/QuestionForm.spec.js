import QuestionForm from '@/views/QuestionBank/QuestionForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

describe('QuestionForm', () => {
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
      question: {},
      accessList: {}
    }
    const actions = {
      fetchQuestionDetail: jest.fn(),
      createQuestion: jest.fn(),
      updateQuestion: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      question: state => state.question,
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
    return shallowMount(QuestionForm, {
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

  test('initPage on new question', () => {
    initComponent()
    wrapper.vm.editMode = false
    const spy = jest.spyOn(wrapper.vm, 'getQuestionDetail')
    wrapper.vm.initPage()
    expect(spy).not.toHaveBeenCalled()
  })

  test('initPage on edit question', () => {
    initComponent()
    wrapper.vm.editMode = true
    const spy = jest.spyOn(wrapper.vm, 'getQuestionDetail')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getQuestionDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuestionDetail')
    wrapper.vm.getQuestionDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionDetail', () => {
    initComponent()
    const response = {
      id: 'QTN001',
      label: 'Lorem',
      options: [
        {
          id: 'OPT001',
          label: 'Lorem'
        },
        {
          id: 'OPT002',
          label: 'Ipsum'
        },
        {
          id: 'OPT003',
          label: 'Dolor'
        },
        {
          id: 'OPT004',
          label: 'Sit',
          correct: true
        }
      ]
    }
    wrapper.vm.successFetchingQuestionDetail(response)
    expect(wrapper.vm.questionDetail).toEqual(response)
    expect(wrapper.vm.correctAnswer = 2)
  })

  test('failFetchingQuestionDetail', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchingQuestionDetail()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('optionLabel for OptionA', () => {
    initComponent()
    expect(wrapper.vm.optionLabel(1)).toEqual('Option A')
  })

  test('optionLabel for OptionB', () => {
    initComponent()
    expect(wrapper.vm.optionLabel(2)).toEqual('Option B')
  })

  test('optionLabel for OptionC', () => {
    initComponent()
    expect(wrapper.vm.optionLabel(3)).toEqual('Option C')
  })

  test('optionLabel for OptionD', () => {
    initComponent()
    expect(wrapper.vm.optionLabel(4)).toEqual('Option D')
  })

  test('cancel', () => {
    initComponent()
    wrapper.vm.$router.go = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1)
  })

  test('saveQuestion on edit', () => {
    initComponent()
    wrapper.vm.editQuestion = jest.fn()
    wrapper.vm.editMode = true
    wrapper.vm.saveQuestion()
    expect(wrapper.vm.editQuestion).toHaveBeenCalledTimes(1)
  })

  test('saveQuestion on create', () => {
    initComponent()
    wrapper.vm.newQuestion = jest.fn()
    wrapper.vm.editMode = false
    wrapper.vm.saveQuestion()
    expect(wrapper.vm.newQuestion).toHaveBeenCalledTimes(1)
  })

  test('newQuestion', () => {
    initComponent()
    wrapper.vm.questionDetail = {
      id: 'QTN001',
      label: 'Lorem',
      options: [
        {
          id: 'OPT001',
          label: 'Lorem'
        },
        {
          id: 'OPT002',
          label: 'Ipsum'
        },
        {
          id: 'OPT003',
          label: 'Dolor'
        },
        {
          id: 'OPT004',
          label: 'Sit'
        }
      ]
    }
    wrapper.vm.correctAnswer = 4
    const spy = jest.spyOn(wrapper.vm, 'createQuestion')
    wrapper.vm.newQuestion()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCreatingQuestion', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.params.bankId = 'BNK001'
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successCreatingQuestion()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBankDetail',
      params: {
        bankId: 'BNK001'
      }
    })
  })

  test('failedCreatingQuestion', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedCreatingQuestion()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('editQuestion', () => {
    initComponent()
    wrapper.vm.questionDetail = {
      id: 'QTN001',
      label: 'Lorem',
      options: [
        {
          id: 'OPT001',
          label: 'Lorem',
          correct: true
        },
        {
          id: 'OPT002',
          label: 'Ipsum'
        },
        {
          id: 'OPT003',
          label: 'Dolor'
        },
        {
          id: 'OPT004',
          label: 'Sit'
        }
      ]
    }
    wrapper.vm.correctAnswer = 4
    const spy = jest.spyOn(wrapper.vm, 'updateQuestion')
    wrapper.vm.editQuestion()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUpdatingQuestion', () => {
    initComponent()
    wrapper.vm.$route.params.bankId = 'BNK001'
    wrapper.vm.$route.params.questionId = 'QTN001'
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successUpdatingQuestion()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBankQuestionDetail',
      params: {
        bankId: 'BNK001',
        questionId: 'QTN001'
      }
    })
  })

  test('failedUpdatingQuestion', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedUpdatingQuestion()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })
})
