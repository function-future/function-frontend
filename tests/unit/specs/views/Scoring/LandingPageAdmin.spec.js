import LandingPageAdmin from '@/views/Scoring/LandingPageAdmin'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('LandingPageAdmin', () => {
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
      accessList: []
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
      accessList: state => state.accessList
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
    const router = new VueRouter([])
    return shallowMount(LandingPageAdmin, {
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

  test('getListData while selectedTab is questionBanks', () => {
    initComponent()
    wrapper.vm.selectedTab = 0
    const spy = jest.spyOn(wrapper.vm, 'getQuestionBanks')
    wrapper.vm.getListData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getListData while selectedTab is quizzes', () => {
    initComponent()
    wrapper.vm.selectedTab = 1
    const spy = jest.spyOn(wrapper.vm, 'getQuizzes')
    wrapper.vm.getListData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getListData while selectedTab is assignments', () => {
    initComponent()
    wrapper.vm.selectedTab = 2
    const spy = jest.spyOn(wrapper.vm, 'getAssignments')
    wrapper.vm.getListData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getQuestionBanks', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuestionBankList')
    wrapper.vm.getQuestionBanks()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionBankList response is not yet empty', () => {
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
    wrapper.vm.successFetchingQuestionBankList(response, paging)
    expect(wrapper.vm.items).toEqual(response)
    expect(wrapper.vm.paging.page).toEqual(2)
    expect(wrapper.vm.state.loaded).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuestionBankList response is empty', () => {
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
    wrapper.vm.successFetchingQuestionBankList(response, paging)
    expect(wrapper.vm.items).toEqual([])
    expect(wrapper.vm.paging.page).toEqual(2)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })

  test('failFetchingQuestionBankList', () => {
    initComponent()
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.failFetchingQuestionBankList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })

  test('getQuizzes', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuizList')
    wrapper.vm.getQuizzes()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuizList response is not yet empty', () => {
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
    wrapper.vm.successFetchingQuizList(response, paging)
    expect(wrapper.vm.items).toEqual(response)
    expect(wrapper.vm.paging.page).toEqual(2)
    expect(wrapper.vm.state.loaded).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuizList response is empty', () => {
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
    wrapper.vm.successFetchingQuizList(response, paging)
    expect(wrapper.vm.items).toEqual([])
    expect(wrapper.vm.paging.page).toEqual(2)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })

  test('failFetchingQuizList', () => {
    initComponent()
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.failFetchingQuizList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })
})
