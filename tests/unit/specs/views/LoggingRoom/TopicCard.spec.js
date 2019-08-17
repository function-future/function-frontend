import TopicCard from '@/views/LoggingRoom/TopicCard'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Topic Card', () => {
  let wrapper
  let store
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
      }
    }
    const getters = {
      accessList: state => state.accessList
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

  function initWrapper (store, options) {
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    const router = new VueRouter([])
    return shallowMount(TopicCard, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseButton',
        'InfiniteLoading',
        'BaseInput',
        'font-awesome-icon'
      ],
      propsData: {
        title: 'title'
      },
      mocks: {
        $toasted
      }
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = initWrapper(store.store)
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('createComponent', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
