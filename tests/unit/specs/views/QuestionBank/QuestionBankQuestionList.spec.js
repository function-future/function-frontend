import QuestionBankQuestionList from '@/views/QuestionBank/QuestionBankQuestionList'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuestionBankQuestionList', () => {
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
      questionList: {}
    }
    const actions = {
      fetchQuestionBankQuestionList: jest.fn()
    }
    const getters = {
      questionList: state => state.questionList
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
    return shallowMount(QuestionBankQuestionList, {
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

  test('initPage', () => {
    initComponent()
    wrapper.vm.fetchQuestionBankQuestionList = jest.fn()
    wrapper.vm.initPage()
    expect(wrapper.vm.fetchQuestionBankQuestionList).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionBankQuestionList', () => {
    initComponent()
    const response = {
      page: 1,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.successFetchingQuestionBankQuestionList(response)
    expect(wrapper.vm.paging).toEqual(response)
  })

  test('failFetchingQuestionBankQuestionList', () => {
    initComponent()
    wrapper.vm.failFetchingQuestionBankQuestionList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('redirectToAddQuestion', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.redirectToAddQuestion()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBankAddQuestion'
    })
  })

  test('redirectToQuestionDetail', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.redirectToQuestionDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
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

  test('deleteThisQuestion', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteQuestionById')
    wrapper.vm.deleteThisQuestion()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingQuestion', () => {
    initComponent()
    const closeDeleteConfirmationModal = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    wrapper.vm.successDeletingQuestion()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(closeDeleteConfirmationModal).toHaveBeenCalledTimes(1)
  })

  test('failedDeletingQuestionBanks', () => {
    initComponent()
    wrapper.vm.failDeletingQuestion()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('loadPage', () => {
    initComponent()
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 20
    }
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.loadPage(paging.page)
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
})
