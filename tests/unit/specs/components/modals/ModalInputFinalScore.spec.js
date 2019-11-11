import ModalInputFinalScore from '@/components/modals/ModalInputFinalScore'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ModalInputFinalScore', () => {
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
      batchList: []
    }
    const getters = {
      batches: state => state.batchList
    }
    const store = new Vuex.Store({
      state,
      getters
    })

    return {
      store,
      state,
      getters
    }
  }

  function createWrapper (store, options) {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(ModalInputFinalScore, {
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
      propsData: {
        studentData: {},
        point: 0
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
    expect(wrapper.vm.finalScore).toEqual(wrapper.vm.point)
  })

  test('close', () => {
    initComponent()
    wrapper.vm.close()
    expect(wrapper.emitted().close.length).toEqual(1)
  })

  test('finalizeScore', () => {
    initComponent()
    wrapper.vm.finalizeScore()
    expect(wrapper.emitted().finalizeScore.length).toEqual(1)
  })
})
