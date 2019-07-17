import modalCopy from '@/components/modals/ModalCopy'
import { shallowMount, createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ModalCopy', () => {
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
          'id': 'sample-id',
          'name': 'sample name'
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
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(modalCopy, {
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

  test('successFetchBatches', () => {
    initComponent()
    wrapper.vm.$route.params.batchCode = 'sample-id'
    wrapper.vm.successFetchBatches()
    expect(wrapper.vm.batches).toEqual(wrapper.vm.batchList)
  })

  test('failFetchBatches', () => {
    initComponent()
    wrapper.vm.failFetchBatches()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
