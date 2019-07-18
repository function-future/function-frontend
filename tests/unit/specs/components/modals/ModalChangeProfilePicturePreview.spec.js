import ModalChangeProfilePicturePreview from '@/components/modals/ModalChangeProfilePicturePreview'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ModalChangeProfilePicturePreview', () => {
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
    return shallowMount(ModalChangeProfilePicturePreview, {
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

  test('save', () => {
    initComponent()
    wrapper.vm.save()
    expect(wrapper.emitted().save.length).toBe(1)
  })
})
