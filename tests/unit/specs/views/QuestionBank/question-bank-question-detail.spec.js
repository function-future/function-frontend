import QuestionBankQuestionDetail from '@/views/QuestionBank/QuestionBankQuestionDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuestionBankQuestionDetail', () => {
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
      question: {
        "id": "QST0001",
        "text": "Question Example 1",
        "options": [
          {
            "id": "OPT0001",
            "label": "Answer Example 1-1"
          },
          {
            "id": "OPT0002",
            "label": "Answer Example 1-2"
          },
          {
            "id": "OPT0003",
            "label": "Answer Example 1-3",
            "correct": true
          },
          {
            "id": "OPT0004",
            "label": "Answer Example 1-4"
          }
        ]
      }
    }
    const actions = {
      updateQuestion: jest.fn(),
      fetchQuestionDetail: jest.fn()
    }
    const getters = {
      question: state => state.question
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
    return shallowMount(QuestionBankQuestionDetail, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseTextArea',
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
      sync: false,
      attachToDocument: true
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
    wrapper.vm.fetchQuestionDetail = jest.fn()
    wrapper.vm.initPage()
    expect(wrapper.vm.fetchQuestionDetail).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionDetail', () => {
    initComponent()
    wrapper.vm.successFetchingQuestionDetail()
    expect(wrapper.vm.questionDetail).toEqual({})
  })

  test('failFetchingQuestionDetail', () => {
    initComponent()
    wrapper.vm.failFetchingQuestionDetail()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  // test('actionButtonClicked editMode is true', () => {
  //   initComponent()
  //   wrapper.vm.editMode = true
  //   wrapper.vm.updateQuestion = jest.fn()
  //   wrapper.vm.actionButtonClicked()
  //   expect(wrapper.vm.updateQuestion).toHaveBeenCalledTimes(1)
  // })
  // TODO: Unit test this

  test('actionButtonClicked editMode is false', () => {
    initComponent()
    wrapper.vm.editMode = false
    wrapper.vm.updateQuestion = jest.fn()
    wrapper.vm.actionButtonClicked()
    expect(wrapper.vm.updateQuestion).not.toHaveBeenCalled()
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
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('successUpdatingQuestionBank', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successUpdatingQuestion()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('failUpdatingQuestionBank', () => {
    initComponent()
    wrapper.vm.failUpdatingQuestion()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
