import Batches from '@/views/Batches/Batches'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Batches', () => {
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
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      },
      currentUser: {
        role: 'ADMIN'
      }
    }
    const actions = {
      fetchBatches: jest.fn(),
      deleteBatch: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      accessList: state => state.accessList,
      currentUser: state => state.currentUser
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
    return shallowMount(Batches, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'b-button',
        'b-input'
      ],
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

  test('createNewBatch', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.createNewBatch()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'addBatch' })
  })

  test('successFetchBatches', () => {
    wrapper.vm.successFetchBatches()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.batches).toEqual(wrapper.vm.batchList)
  })

  test('failFetchBatches', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchBatches()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to fetch batches, please try again',
        type: 'is-danger'
      }
    })
  })

  test('editBatch', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.editBatch('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editBatch',
      params: { id: 'sample-id-1' }
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
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successDeleteBatch()
    expect(wrapper.vm.selectedId).toEqual('')
    expect(spy).toHaveBeenCalledTimes(1)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully delete batch',
        type: 'is-success'
      }
    })
  })

  test('failDeleteBatch', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.failDeleteBatch()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to delete batch',
        type: 'is-danger'
      }
    })
    expect(wrapper.vm.selectedId).toEqual('')
  })
})
