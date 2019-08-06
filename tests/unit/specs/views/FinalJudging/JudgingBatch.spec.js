import JudgingBatch from '@/views/FinalJudging/JudgingBatch'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('JudgingBatch', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore () {
    const state = {
      batchList: [
        {
          'id': 'sample-id-1',
          'code': '1',
          'name': 'Batch 1'
        },
        {
          'id': 'sample-id-2',
          'code': '2',
          'name': 'Batch 2'
        },
        {
          'id': 'sample-id-3',
          'code': '3',
          'name': 'Batch 3'
        },
        {
          'id': 'sample-id-4',
          'code': '4',
          'name': 'Batch 3'
        }
      ],
      accessList: {}
    }
    const actions = {
      fetchBatches: jest.fn(),
      deleteBatch: jest.fn()
    }
    const getters = {
      batchList: state => state.batchList,
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      modules: {
        batches: {
          state,
          actions,
          getters
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

  function createWrapper (store, options) {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(JudgingBatch, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ],
      mocks: {
        $toasted
      },
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  beforeEach(() => {
    initComponent()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('goToJudgingList', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToJudgingList('3')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'judgingList',
      params: { batchCode: '3' }
    })
  })

  test('createNewBatch', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.createNewBatch()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'addJudgingBatch' })
  })

  test('successFetchBatches', () => {
    wrapper.vm.successFetchBatches()
    expect(wrapper.vm.batches).toEqual(wrapper.vm.batchList)
  })

  test('failFetchBatches', () => {
    wrapper.vm.failFetchBatches()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('editBatch', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.editBatch('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editJudgingBatch',
      params: { batchCode: 'sample-id-1' }
    })
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.openDeleteConfirmationModal('sample-id-1')
    expect(wrapper.vm.selectedId).toEqual('sample-id-1')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('deleteThisBatch', () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteBatch')
    wrapper.vm.deleteThisBatch()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeleteBatch', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successDeleteBatch()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'judgingBatch' })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.selectedId).toEqual('')
  })

  test('failDeleteBatch', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.failDeleteBatch()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.selectedId).toEqual('')
  })
})
