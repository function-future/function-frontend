import SkeletonBox from '@/components/skeletonBox/SkeletonBox'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('SkeletonBox', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    return lv
  }

  function initStore () {
    const state = {
      currentUser: {
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Name',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    }
    const actions = {}
    const getters = {}
    const store = new Vuex.Store({
      modules: {
        auth: {
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
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(SkeletonBox, {
      ...options,
      store,
      localVue,
      propsData: {
        minWidth: 80,
        maxWidth: 100
      },
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
})
