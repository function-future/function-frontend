import QuestionBanks from '@/views/QuestionBank/QuestionBanks'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuestionBanks', () => {
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
      questionBanks: {}
    }
    const actions = {
      fetchQuestionBankList: jest.fn(),
      deleteQuestionBankById: jest.fn()
    }
    const getters = {
      questionBanks: state => state.questionBanks
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
    return shallowMount(QuestionBanks, {
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
    wrapper.destroy()
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage', () => {
    initComponent()
    wrapper.vm.fetchQuestionBankList = jest.fn()
    wrapper.vm.initPage()
    expect(wrapper.vm.fetchQuestionBankList).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionBankQuestionList', () => {
    initComponent()
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.successFetchingQuestionBankList(paging)
    expect(wrapper.vm.paging.page).toEqual(paging.page)
    expect(wrapper.vm.paging.pageSize).toEqual(paging.size)
    expect(wrapper.vm.paging.totalRecords).toEqual(paging.totalRecords)
  })

  test('failFetchingQuestionBankQuestionList', () => {
    initComponent()
    wrapper.vm.failFetchingQuestionBankList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('addQuestionBank', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.addQuestionBank()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'addQuestionBank'
    })
  })

  test('goToQuestionBankQuestions', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToQuestionBankQuestions()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('goToQuestionBankDetail', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToQuestionBankDetail()
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

  test('deleteThisQuestionBanks', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteQuestionBankById')
    wrapper.vm.deleteThisQuestionBank()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingQuestionBanks', () => {
    initComponent()
    const closeDeleteConfirmationModal = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    wrapper.vm.successDeletingQuestionBank()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(closeDeleteConfirmationModal).toHaveBeenCalledTimes(1)
  })

  test('failedDeletingQuestionBanks', () => {
    initComponent()
    wrapper.vm.failDeletingQuestionBank()
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
