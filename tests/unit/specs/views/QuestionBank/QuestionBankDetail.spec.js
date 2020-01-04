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
      questionBank: {},
      questionList: [],
      accessList: {}
    }
    const actions = {
      fetchQuestionBankDetail: jest.fn(),
      fetchQuestionBankQuestionList: jest.fn(),
      deleteQuestionBankById: jest.fn(),
      deleteQuestionById: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      questionBank: state => state.questionBank,
      questionList: state => state.questionList,
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

  test('deleteModalMessage for questionBank', ()  => {
    initComponent()
    wrapper.vm.selectedId = ''
    expect(wrapper.vm.deleteModalMessage).toEqual('Are you sure you want to delete this question bank?')
  })

  test('deleteModalMessage for question', ()  => {
    initComponent()
    wrapper.vm.selectedId = 'QTN001'
    expect(wrapper.vm.deleteModalMessage).toEqual('Are you sure you want to delete this question?')
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
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchingQuestionBankDetail()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('getQuestionList', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuestionBankQuestionList')
    wrapper.vm.getQuestionList()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionBankQuestionList response is not yet empty', () => {
    initComponent()
    wrapper.vm.state =  {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    const response = [
      {
        "id": "QST0001",
        "label": "Question Sample 1",
        "options": [
          {
            "id": "OPT0001",
            "label": "Answer Sample 1-1"
          },
          {
            "id": "OPT0002",
            "label": "Answer Sample 1-2"
          },
          {
            "id": "OPT0003",
            "label": "Answer Sample 1-3"
          },
          {
            "id": "OPT0004",
            "label": "Answer Sample 1-4",
            "correct": true
          }
        ]
      },
      {
        "id": "QST0002",
        "label": "Question Sample 2",
        "options": [
          {
            "id": "OPT0011",
            "label": "Answer Sample 2-1"
          },
          {
            "id": "OPT0012",
            "label": "Answer Sample 2-2"
          },
          {
            "id": "OPT0013",
            "label": "Answer Sample 2-3"
          },
          {
            "id": "OPT0014",
            "label": "Answer Sample 2-4",
            "correct": true
          }
        ]
      }
    ]
    const paging = {
      page: 1,
      size: 2,
      totalRecords: 20
    }
    wrapper.vm.successFetchingQuestionBankQuestionList(paging, response)
    expect(wrapper.vm.questions).toEqual(response)
    expect(wrapper.vm.paging.page).toEqual(2)
    expect(wrapper.vm.state.loaded).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionBankQuestionList response is empty', () => {
    initComponent()
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    const response = []
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.successFetchingQuestionBankQuestionList(paging, response)
    expect(wrapper.vm.questions).toEqual([])
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })

  test('failFetchingQuestionBankQuestionList', () => {
    initComponent()
    wrapper.vm.failFetchingQuestionBankQuestionList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('redirectToEditQuestionBankForm', () => {
    initComponent()
    wrapper.vm.$route.params.bankId = 'BNK001'
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.redirectToEditQuestionBankForm()
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'editQuestionBank',
      params: {
        id: 'BNK001'
      }
    })
  })

  test('redirectToQuestionForm', () => {
    initComponent()
    wrapper.vm.$route.params.bankId = 'BNK001'
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.redirectToQuestionForm()
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'addQuestion',
      params: {
        bankId: 'BNK001'
      }
    })
  })

  test('redirectToEditQuestionForm', () => {
    initComponent()
    wrapper.vm.$route.params.bankId = 'BNK001'
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.redirectToEditQuestionForm('QTN001')
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'editQuestion',
      params: {
        bankId: 'BNK001',
        questionId: 'QTN001'
      }
    })
  })

  test('redirectToQuestionDetail', () => {
    initComponent()
    wrapper.vm.$route.params.bankId = 'BNK001'
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.redirectToQuestionDetail('QTN001')
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'questionBankQuestionDetail',
      params: {
        bankId: 'BNK001',
        questionId: 'QTN001'
      }
    })
  })

  test('openDeleteConfirmationModal', () => {
    initComponent()
    wrapper.vm.openDeleteConfirmationModal('ID01')
    expect(wrapper.vm.selectedId).toEqual('ID01')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('closeDeleteConfirmationModal', () => {
    initComponent()
    wrapper.vm.closeDeleteConfirmationModal()
    expect(wrapper.vm.selectedId).toEqual('')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('deleteItem deleting questionBank', () => {
    initComponent()
    wrapper.vm.selectedId = ''
    const spy = jest.spyOn(wrapper.vm, 'deleteThisBank')
    wrapper.vm.deleteItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteItem deleting question with selected ID', () => {
    initComponent()
    wrapper.vm.selectedId = 'QTN001'
    const spy = jest.spyOn(wrapper.vm, 'deleteThisQuestion')
    wrapper.vm.deleteItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteThisBank', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteQuestionBankById')
    wrapper.vm.deleteThisBank()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingBank', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successDeletingBank()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'scoringAdmin'
    })
  })

  test('failedDeletingBank', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedDeletingBank()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('deleteThisQuestion', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteQuestionById')
    wrapper.vm.deleteThisQuestion()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingQuestion', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.go = jest.fn()
    wrapper.vm.successDeletingQuestion()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1)
  })

  test('failedDeletingQuestion', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedDeletingQuestion()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })
})
