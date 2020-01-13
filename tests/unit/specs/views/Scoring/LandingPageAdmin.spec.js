import LandingPageAdmin from '@/views/Scoring/LandingPageAdmin'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('LandingPageAdmin', () => {
  let store
  let wrapper
  let localVue
  let $route = {
    name: 'scoring',
    query: {
      tab: 'questionBanks'
    }
  }

  function generateLocalVue() {
    const lv = createLocalVue()
    lv.use(Vuex)
    return lv
  }

  function initStore() {
    const state = {
      accessList: [],
      currentUser: {}
    }
    const actions = {
      fetchQuestionBankList: jest.fn(),
      fetchQuizList: jest.fn(),
      fetchAssignmentList: jest.fn(),
      deleteQuestionBankById: jest.fn(),
      deleteQuizById: jest.fn(),
      deleteAssignmentById: jest.fn()
    }
    const getters = {
      accessList: state => state.accessList,
      currentUser: state => state.currentUser
    }
    const store = new Vuex.Store({
      state,
      getters,
      actions
    })

    return {
      store,
      state,
      actions,
      getters
    }
  }

  function createWrapper(store, options) {
    return shallowMount(LandingPageAdmin, {
      ...options,
      store,
      localVue,
      stubs: [
        'BaseCard',
        'BaseButton',
        'font-awesome-icon',
        'b-tabs',
        'b-tab-item',
        'b-icon'
      ],
      mocks: {
        $route,
        $router: {
          replace: jest.fn(),
          push: jest.fn()
        }
      },
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

  test('Computed buttonText with batchCode still empty', () => {
    initComponent()
    wrapper.vm.batchCode = ''
    expect(wrapper.vm.batchButtonText).toEqual('Select Batch')
  })

  test('Computed buttonText with batchCode already filled', () => {
    initComponent()
    wrapper.vm.batchCode = 'futurre3'
    expect(wrapper.vm.batchButtonText).toEqual('futurre3')
  })

  test('Computed tabTitle with QuestionBank as selectedTab', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'questionBanks'
    expect(wrapper.vm.tabTitle).toEqual('Question Bank')
  })

  test('Computed tabTitle with Quiz as selectedTab', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'quizzes'
    expect(wrapper.vm.tabTitle).toEqual('Quiz')
  })

  test('Computed tabTitle with Assignment as selectedTab', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'assignments'
    expect(wrapper.vm.tabTitle).toEqual('Assignment')
  })

  test('checkCurrentUser with an ADMIN logged in', () => {
    initComponent()
    store.state.currentUser = {
      role: 'ADMIN'
    }
    wrapper.vm.checkCurrentUser()
    expect(wrapper.vm.tabs).toEqual([
      { type: 'questionBanks', title: 'Question Banks', visible: true },
      { type: 'quizzes', title: 'Quizzes', visible: true },
      { type: 'assignments', title: 'Assignments', visible: true }
    ])
  })

  test('checkCurrentUser with a STUDENT logged in', () => {
    initComponent()
    store.state.currentUser = {
      role: 'STUDENT'
    }
    wrapper.vm.checkCurrentUser()
    expect(wrapper.vm.tabs).toEqual([
      { type: 'quizzes', title: 'Quizzes', visible: true },
      { type: 'assignments', title: 'Assignments', visible: true }
    ])
  })

  test('checkCurrentUser with a JUDGE logged in', () => {
    initComponent()
    store.state.currentUser = {
      role: 'JUDGE'
    }
    wrapper.vm.checkCurrentUser()
    expect(wrapper.vm.tabs).toEqual([
      { type: 'assignments', title: 'Assignments', visible: true }
    ])
  })

  test('checkCurrentUser with a MENTOR logged in', () => {
    initComponent()
    store.state.currentUser = {
      role: 'MENTOR'
    }
    wrapper.vm.checkCurrentUser()
    expect(wrapper.vm.tabs).toEqual([
      { type: 'assignments', title: 'Assignments', visible: true }
    ])
  })

  test('setQuery active tab outside validation', () => {
    initComponent()
    wrapper.vm.$route.query.tab = ''
    wrapper.vm.selectedTab = -1
    wrapper.vm.setQuery()
    expect(wrapper.vm.selectedTab).toEqual(0)
    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(1)
    $route.query.tab = 'questionBanks'
  })

  test('setQuery active tab same as query', () => {
    initComponent()
    $route.query.tab = 'questionBanks'
    wrapper.vm.selectedTab = 0
    wrapper.vm.setQuery()
    expect(wrapper.vm.selectedTab).toEqual(0)
    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(0)
  })

  test('resetData', () => {
    initComponent()
    wrapper.vm.resetData()
    expect(wrapper.vm.paging).toEqual({
      page: 1,
      size: 10,
      totalRecords: 10
    })
    expect(wrapper.vm.items).toEqual([])
    expect(wrapper.vm.state).toEqual('')
  })

  test('getListData while route query is empty', () => {
    initComponent()
    wrapper.vm.$route.query.tab = ''
    const bankSpy = jest.spyOn(wrapper.vm, 'getQuestionBanks')
    const batchSpy = jest.spyOn(wrapper.vm, 'getBatchList')
    wrapper.vm.getListData()
    expect(bankSpy).not.toHaveBeenCalled()
    expect(batchSpy).not.toHaveBeenCalled()
  })

  test('getListData while selectedTab is questionBanks', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'questionBanks'
    const spy = jest.spyOn(wrapper.vm, 'getQuestionBanks')
    wrapper.vm.getListData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getListData while selectedTab is quizzes', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'quizzes'
    const spy = jest.spyOn(wrapper.vm, 'getBatchList')
    wrapper.vm.getListData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getListData while selectedTab is assignments', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'assignments'
    const spy = jest.spyOn(wrapper.vm, 'getBatchList')
    wrapper.vm.getListData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getBatchList', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchBatches')
    wrapper.vm.getBatchList()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchBatches with quiz as the selected tab and a batch is already pre-selected', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'getQuizzes')
    wrapper.vm.batchCode = 'future3'
    wrapper.vm.$route.query.tab = 'quizzes'
    wrapper.vm.successFetchBatches()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchBatches with assignment as the selected tab and a batch is already pre-selected', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'getAssignments')
    wrapper.vm.batchCode = 'future3'
    wrapper.vm.$route.query.tab = 'assignments'
    wrapper.vm.successFetchBatches()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchBatches with no batch selected yet', () => {
    initComponent()
    const response = [
      {
        code: 'future3',
        id: '3'
      },
      {
        code: 'future4',
        id: '4'
      }
    ]
    wrapper.vm.successFetchBatches(response)
    expect(wrapper.vm.batches).toEqual(response)
    expect(wrapper.vm.batchCode).toEqual('future3')
  })

  test('successFetchBatches with no batch created yet', () => {
    initComponent()
    const response = []
    wrapper.vm.successFetchBatches(response)
    expect(wrapper.vm.batches).toEqual(response)
    expect(wrapper.vm.batchCode).toEqual('No batch found')
  })

  test('failFetchBatches', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchBatches()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('getQuestionBanks', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuestionBankList')
    wrapper.vm.getQuestionBanks()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getQuizzes', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuizList')
    wrapper.vm.getQuizzes()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getAssignments', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchAssignmentList')
    wrapper.vm.getAssignments()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingListData response is not yet empty', () => {
    initComponent()
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    const response = [
      {
        "id":"5d57da87cea33323287dd313",
        "title":"VueJS Question Bank",
        "description":"This bank contains questions that relates to VueJS"
      },
      {"id":"5d57f531cea33323287dd39d",
        "title":"Spring Boot #1",
        "description":"Question bank of all Spring Boot related questions"
      }]
    const paging = {
      page: 1,
      size: 2,
      totalRecords: 2
    }
    wrapper.vm.successFetchingListData(response, paging)
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.items).toEqual(response)
    expect(wrapper.vm.paging.page).toEqual(2)
    expect(wrapper.vm.state.loaded).toHaveBeenCalledTimes(1)
  })

  test('successFetchingListData response is empty', () => {
    initComponent()
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    const response = []
    const paging = {
      page: 2,
      size: 2,
      totalRecords: 2
    }
    wrapper.vm.successFetchingListData(response, paging)
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.items).toEqual([])
    expect(wrapper.vm.paging.page).toEqual(2)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })

  test('failFetchingQuestionBankList', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.failFetchingQuestionBankList()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })

  test('failFetchingListData', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.failFetchingListData()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })

  test('textPreview', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'showLimitedPreviewText')
    const markdown = 'Lorem Ipsum Dolor Sit Amet'
    wrapper.vm.textPreview(markdown)
    expect(spy).toBeCalledWith('Lorem Ipsum Dolor Sit Amet')
  })

  test('showLimitedPreviewText < 250 characters', () => {
    initComponent()
    const text = 'Lorem Ipsum'
    expect(wrapper.vm.showLimitedPreviewText(text)).toEqual(text)
  })

  test('showLimitedPreviewText > 250 characters', () => {
    initComponent()
    const text = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    expect(wrapper.vm.showLimitedPreviewText(text)).toEqual(text.slice(0, 250) + '...')
  })

  test('goToEditItem with questionBankDetail as the target', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.query.tab = 'questionBanks'
    wrapper.vm.goToEditItem(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBankDetail',
      params: {
        bankId: 1
      }
    })
  })

  test('goToEditItem with quizDetail as the target', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.query.tab = 'quizzes'
    wrapper.vm.batchCode = 'futurre3'
    wrapper.vm.goToEditItem(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editQuiz',
      params: {
        quizId: 1,
        batchCode: 'futurre3'
      }
    })
  })

  test('goToEditItem with assignmentDetail as the target', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.query.tab = 'assignments'
    wrapper.vm.batchCode = 'futurre3'
    wrapper.vm.goToEditItem(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'assignmentDetail',
      params: {
        assignmentId: 1,
        batchCode: 'futurre3'
      }
    })
  })

  test('openDeleteConfirmationModal', () => {
    initComponent()
    wrapper.vm.isVisibleDeleteModal = false
    wrapper.vm.selectedId = ''
    wrapper.vm.openDeleteConfirmationModal(1)
    expect(wrapper.vm.isVisibleDeleteModal).toEqual(true)
    expect(wrapper.vm.selectedId).toEqual(1)
  })

  test('closeDeleteConfirmationModal', () => {
    initComponent()
    wrapper.vm.isVisibleDeleteModal = true
    wrapper.vm.selectedId = 1
    wrapper.vm.closeDeleteConfirmationModal()
    expect(wrapper.vm.isVisibleDeleteModal).toEqual(false)
    expect(wrapper.vm.selectedId).toEqual('')
  })

  test('deleteItem with questionBank as active tab', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'questionBanks'
    const spy = jest.spyOn(wrapper.vm, 'deleteQuestionBank')
    wrapper.vm.deleteItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteItem with quiz as active tab', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'quizzes'
    const spy = jest.spyOn(wrapper.vm, 'deleteQuiz')
    wrapper.vm.deleteItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteItem with assignment as active tab', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'assignments'
    const spy = jest.spyOn(wrapper.vm, 'deleteAssignment')
    wrapper.vm.deleteItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteQuestionBank', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteQuestionBankById')
    wrapper.vm.deleteQuestionBank()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteQuiz', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteQuizById')
    wrapper.vm.deleteQuiz()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteAssignment', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteAssignmentById')
    wrapper.vm.deleteAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingItem', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    const modalSpy = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    const resetSpy = jest.spyOn(wrapper.vm, 'resetData')
    wrapper.vm.$route.query.tab = 'questionBanks'
    wrapper.vm.successDeletingItem()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(modalSpy).toHaveBeenCalledTimes(1)
    expect(resetSpy).toHaveBeenCalledTimes(1)
  })

  test('failDeletingItem', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failDeletingItem()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('goToItemDetail with Question Bank as the active tab', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.query.tab = 'questionBanks'
    wrapper.vm.goToItemDetail(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBankDetail',
      params: {
        bankId: 1
      }
    })
  })

  test('goToItemDetail with Quiz as the active tab', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.query.tab = 'quizzes'
    wrapper.vm.batchCode = 'futurre3'
    wrapper.vm.goToItemDetail(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'quizDetail',
      params: {
        quizId: 1,
        batchCode: 'futurre3'
      }
    })
  })

  test('goToItemDetail with Assignment as the active tab', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.query.tab = 'assignments'
    wrapper.vm.batchCode = 'futurre3'
    wrapper.vm.goToItemDetail(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'assignmentDetail',
      params: {
        assignmentId: 1,
        batchCode: 'futurre3'
      }
    })
  })

  test('goToItemDetail with Assignment as the active tab and student as logged in user', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.query.tab = 'assignments'
    wrapper.vm.batchCode = 'futurre3'
    store.state.currentUser = {
      role: 'STUDENT',
      id: 'STD001'
    }
    wrapper.vm.goToItemDetail(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'assignmentRoomDetail',
      params: {
        assignmentId: 1,
        batchCode: 'futurre3',
        studentId: 'STD001'
      }
    })
  })

  test('selectBatch', () => {
    initComponent()
    wrapper.vm.batchCode = ''
    wrapper.vm.isVisibleBatchModal = true
    wrapper.vm.selectBatch('futurre3')
    expect(wrapper.vm.batchCode).toEqual('futurre3')
    expect(wrapper.vm.isVisibleBatchModal).toEqual(false)
  })

  test('closeModal', () => {
    initComponent()
    wrapper.vm.isVisibleBatchModal = true
    wrapper.vm.closeModal()
    expect(wrapper.vm.isVisibleBatchModal).toEqual(false)
  })

  test('addItem with selectedTab is questionBank', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'questionBanks'
    const spy = jest.spyOn(wrapper.vm, 'goToAddQuestionBank')
    wrapper.vm.addItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('addItem with selectedTab is quiz', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'quizzes'
    const spy = jest.spyOn(wrapper.vm, 'goToAddQuiz')
    wrapper.vm.addItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('addItem with selectedTab is assignment', () => {
    initComponent()
    wrapper.vm.$route.query.tab = 'assignments'
    const spy = jest.spyOn(wrapper.vm, 'goToAddAssignment')
    wrapper.vm.addItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('showCopyModal', () => {
    initComponent()
    wrapper.vm.showCopyModal('future3')
    expect(wrapper.vm.selectedId).toEqual('future3')
    expect(wrapper.vm.isVisibleCopyModal).toEqual(true)
  })

  test('copyItem with quiz as the selected tab', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'copyQuiz')
    wrapper.vm.$route.query.tab = 'quizzes'
    wrapper.vm.copyItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('copyItem with assignment as the selected tab', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'copyAssignment')
    wrapper.vm.$route.query.tab = 'assignments'
    wrapper.vm.copyItem()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCopyItem', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successCopyItem()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isVisibleCopyModal).toEqual(false)
  })

  test('failCopyItem', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failCopyItem()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isVisibleCopyModal).toEqual(false)
  })

  test('watch isPassedDeadline', (done) => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'resetData')
    wrapper.vm.isPassedDeadline = true
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })
})
