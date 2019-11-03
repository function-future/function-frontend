import modalCopy from '@/components/modals/ModalCopy'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

describe('ModalCopy', () => {
  let store
  let wrapper
  let localVue
  let $route = {}

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    return lv
  }

  function initStore () {
    const state = {
      batchList: [
        {
          'id': 'sample-id',
          'name': 'sample name',
          'code': 'batch-code'
        },
        {
          'id': 'sample-id',
          'name': 'sample name',
          'code': 'batch-code-1'
        }
      ]
    }
    const actions = {
      fetchBatches: jest.fn()
    }
    const getters = {
      batchList: state => state.batchList
    }
    const store = new Vuex.Store({
      modules: {
        users: {
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
    const $router = {
      push: jest.fn()
    }
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(modalCopy, {
      ...options,
      store,
      localVue,
      stubs: [
        'b-icon',
        'b-button',
        'b-radio'
      ],
      mocks: {
        $route,
        $toasted,
        $router
      },
      sync: false
    })
  }

  function initComponent () {
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

  test('close', () => {
    initComponent()
    wrapper.vm.close()
    expect(wrapper.emitted().close.length).toBe(1)
  })

  test('copy', () => {
    initComponent()
    wrapper.vm.copy()
    expect(wrapper.emitted().copy.length).toBe(1)
  })

  test('successFetchBatches params batchCode', () => {
    $route = {
      params: {
        batchCode: 'batch-code'
      }
    }
    const expectedResult = [
      {
        'id': 'sample-id',
        'name': 'sample name',
        'code': 'batch-code-1'
      }
    ]
    initComponent()
    wrapper.vm.successFetchBatches()
    expect(wrapper.vm.batches).toEqual(expectedResult)
  })

  test('successFetchBatches params code', () => {
    $route = {
      params: {
        code: 'batch-code'
      }
    }
    const expectedResult = [
      {
        'id': 'sample-id',
        'name': 'sample name',
        'code': 'batch-code-1'
      }
    ]
    initComponent()
    wrapper.vm.successFetchBatches()
    expect(wrapper.vm.batches).toEqual(expectedResult)
  })

  test('successFetchBatches no same batchCode', () => {
    $route = {
      params: {
        batchCode: 'batch-code-2'
      }
    }
    initComponent()
    wrapper.vm.successFetchBatches()
    expect(wrapper.vm.batches).toEqual(wrapper.vm.batchList)
  })

  test('successFetchBatches no same code', () => {
    $route = {
      params: {
        code: 'batch-code-2'
      }
    }
    initComponent()
    wrapper.vm.successFetchBatches()
    expect(wrapper.vm.batches).toEqual(wrapper.vm.batchList)
  })

  test('failFetchBatches', () => {
    initComponent()
    wrapper.vm.failFetchBatches()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('select', () => {
    initComponent()
    wrapper.vm.select('code')
    expect(wrapper.vm.batchDestination).toEqual('code')
  })

  test('goToCreateBatch', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToCreateBatch()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })
})
