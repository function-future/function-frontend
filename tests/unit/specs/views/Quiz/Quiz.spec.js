import Quiz from '@/views/Quiz/Quiz'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Quiz', () => {
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
      quizList: [
        {
          "id": "QZ00001",
          "title": "Quiz Number 1",
          "description": "Description Number 1",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batch": 3
        },
        {
          "id": "QZ00002",
          "title": "Quiz Number 2",
          "description": "Description Number 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batch": 3
        },
        {
          "id": "QZ00003",
          "title": "Quiz Number 3",
          "description": "Description Number 3",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batch": 3
        },
        {
          "id": "QZ00004",
          "title": "Quiz Number 4",
          "description": "Description Number 4",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batch": 3
        }
      ]
    }
    const actions = {
      fetchQuizList: jest.fn(),
      deleteQuizById: jest.fn(),
      copyQuiz: jest.fn()
    }
    const getters = {
      quizList: state => state.quizList
    }
    const store = new Vuex.Store({
      modules: {
        quizzes: {
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
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(Quiz, {
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
        $toasted
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

  test('successFetchingQuizList', () => {
    initComponent()
    const data = {
      page: 1,
      pageSize: 10,
      totalRecords: 20
    }
    wrapper.vm.successFetchingQuizList(data)
    expect(wrapper.vm.paging).toEqual(data)
  })

  test('failFetchingQuizList', () => {
    initComponent()
    wrapper.vm.failFetchingQuizList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('addQuiz', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.addQuiz()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'addQuiz'
    })
  })

  test('isComplete Done', () => {
    initComponent()
    const deadline = new Date(2000, 5, 10)
    expect(wrapper.vm.isComplete(deadline)).toEqual('Done')
  })

  test('isComplete Ongoing', () => {
    initComponent()
    const deadline = new Date(2077, 7, 7)
    expect(wrapper.vm.isComplete(deadline)).toEqual('Ongoing')
  })

  test('goToQuizDetail', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToQuizDetail('QZ0001', 'futur3')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'quizDetail',
      params: {
        quizId: 'QZ0001'
      },
      query: {
        batchCode: 'futur3'
      }
    })
  })

  test('openDeleteConfirmationModal', () => {
    initComponent()
    wrapper.vm.openDeleteConfirmationModal('sample-id')
    expect(wrapper.vm.selectedId).toEqual('sample-id')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('closeDeleteConfirmationModal', () => {
    initComponent()
    wrapper.vm.closeDeleteConfirmationModal()
    expect(wrapper.vm.selectedId).toEqual('')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('deleteThisQuiz', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteQuizById')
    wrapper.vm.deleteThisQuiz()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingQuiz', () => {
    initComponent()
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    const closeDeleteConfirmationModal = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    wrapper.vm.successDeletingQuiz()
    expect(routerSpy).toHaveBeenCalledWith({ name: 'quizzes' })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(closeDeleteConfirmationModal).toHaveBeenCalledTimes(1)
  })

  test('failedDeletingQuiz', () => {
    initComponent()
    wrapper.vm.failedDeletingQuiz()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('loadPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.loadPage(1)
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadPreviousPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadPreviousPage()
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadNextPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadNextPage()
    expect(wrapper.vm.paging.page).toEqual(3)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('openCopyModal', () => {
    initComponent()
    wrapper.vm.openCopyModal('sample-id')
    expect(wrapper.vm.selectedId).toEqual('sample-id')
    expect(wrapper.vm.showCopyModal).toEqual(true)
  })

  test('closeCopyModal', () => {
    initComponent()
    wrapper.vm.closeCopyModal()
    expect(wrapper.vm.selectedId).toEqual('')
    expect(wrapper.vm.showCopyModal).toEqual(false)
  })

  test('submitCopyModal batchDestination not yet selected', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'copyQuiz')
    wrapper.vm.submitCopyModal('')
    expect(spy).not.toHaveBeenCalled()
  })

  // test('submitCopyModal have selected batchDestination', () => {
  //   initComponent()
  //   console.log(wrapper.vm.quizList)
  //   const spy = jest.spyOn(wrapper.vm, 'copyQuiz')
  //   wrapper.vm.submitCopyModal('sample-id')
  //   expect(spy).toHaveBeenCalledTimes(1)
  // })
//  TODO: UNIT TEST THI

  test('successSubmitCopyQuiz', () => {
    initComponent()
    wrapper.vm.successSubmitCopyQuiz()
    expect(wrapper.vm.selectedId).toEqual('')
    expect(wrapper.vm.showCopyModal).toEqual(false)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failSubmitCopyQuiz', () => {
    initComponent()
    wrapper.vm.failSubmitCopyQuiz()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
