import JudgingList from '@/views/FinalJudging/JudgingList'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('JudgingList', () => {
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
      judgingList: [],
      accessList: {},
      batchList: [{
        id: '1',
        code: 'futurre3',
        name: 'Future 3.0'
      }]
    }
    const actions = {
      fetchJudgingList: jest.fn(),
      deleteJudging: jest.fn()
    }
    const getters = {
      judgingList: state => state.judgingList,
      accessList: state => state.accessList,
      batchList: state => state.batchList
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

  function createWrapper(store, options) {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(JudgingList, {
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

  test('successFetchingJudgingList', () => {
    initComponent()
    const data = {
      page: 1,
      pageSize: 10,
      totalRecords: 20
    }
    wrapper.vm.successFetchingJudgingList(data)
    expect(wrapper.vm.paging).toEqual(data)
  })

  test('failFetchingJudgingList', () => {
    initComponent()
    wrapper.vm.failFetchingJudgingList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('addJudging', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.selectedBatch = 'futurre3'
    wrapper.vm.addJudging()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'addJudging',
      params: {
        batchCode: 'futurre3'
      }
    })
  })

  test('goToJudgingDetail', () => {
    initComponent()
    wrapper.vm.selectedBatch = 'futurre3'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToJudgingDetail(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'judgingDetail',
      params: {
        judgingId: 1,
        batchCode: 'futurre3'
      }
    })
  })

  test('goToEditJudging', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.selectedBatch = 'futurre3'
    wrapper.vm.goToEditJudging(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editJudging',
      params: {
        judgingId: 1,
        batchCode: 'futurre3'
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

  test('deleteThisJudging', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteJudging')
    wrapper.vm.deleteThisJudging()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingJudging', () => {
    initComponent()
    wrapper.vm.selectedBatch = '1'
    wrapper.vm.selectedId = 'FNC0001'
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    const closeDeleteConfirmationModal = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    wrapper.vm.successDeletingJudging()
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'judgingList',
      params: {
        batchCode: '1'
      }
    })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(closeDeleteConfirmationModal).toHaveBeenCalledTimes(1)
  })

  test('failDeletingJudging', () => {
    initComponent()
    wrapper.vm.failDeletingJudging()
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

  test('goToReportPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.selectedBatch = 'future3'
    wrapper.vm.goToReportPage()
    expect(spy).toHaveBeenCalledWith({
      name: 'batchReportPage',
      params: {
        batchCode: 'future3'
      }
    })
  })

  test('successFetchBatches', () => {
    initComponent()
    wrapper.vm.successFetchBatches()
    expect(wrapper.vm.batches).toEqual(wrapper.vm.batchList)
    expect(wrapper.vm.selectedBatch).toEqual('futurre3')
  })

  test('failFetchBatches', () => {
    initComponent()
    wrapper.vm.failFetchBatches()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
