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
      },
      accessList: {}
    }
    const actions = {
      deleteQuestionById: jest.fn(),
      fetchQuestionDetail: jest.fn(),
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

  test('initPage', () => {
    initComponent()
    wrapper.vm.fetchQuestionDetail = jest.fn()
    wrapper.vm.initPage()
    expect(wrapper.vm.fetchQuestionDetail).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionDetail', () => {
    initComponent()
    wrapper.vm.successFetchingQuestionDetail()
    expect(wrapper.vm.questionDetail).toEqual({
      "id": "QST0001",
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
          "correct": true,
          "id": "OPT0003",
          "label": "Answer Example 1-3"
        },
        {
          "id": "OPT0004",
          "label": "Answer Example 1-4"
        }
      ],
      "text": "Question Example 1"
    })
    expect(wrapper.vm.selectedAnswer).toEqual(2)
  })

  test('failFetchingQuestionDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchingQuestionDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('header text for option A', () => {
    initComponent()
    expect(wrapper.vm.header(0)).toEqual('Option A')
  })

  test('header text for option B', () => {
    initComponent()
    expect(wrapper.vm.header(1)).toEqual('Option B')
  })

  test('header text for option C', () => {
    initComponent()
    expect(wrapper.vm.header(2)).toEqual('Option C')
  })

  test('header text for option D', () => {
    initComponent()
    expect(wrapper.vm.header(3)).toEqual('Option D')
  })

  test('redirectToEditPage', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.params.bankId = 'BNK001'
    wrapper.vm.$route.params.questionId = 'QTN001'
    wrapper.vm.redirectToEditPage()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editQuestion',
      params: {
        bankId: 'BNK001',
        questionId: 'QTN001'
      }
    })
  })

  test('deleteQuestion', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteQuestionById')
    wrapper.vm.deleteQuestion()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingQuestion', () => {
    initComponent()
    wrapper.vm.$route.params.bankId = 'BNK001'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successDeletingQuestion()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBankDetail',
      params: {
        bankId: 'BNK001'
      }
    })
  })

  test('failedDeletingQuestion', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedDeletingQuestion()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })
})
