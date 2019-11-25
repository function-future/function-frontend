import BottomNavBar from '@/components/skeletons/BottomNavBar'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('BottomNavBar', () => {
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
      menuList: {},
      currentUser: {}
    }
    const actions = {}
    const getters = {
      menuList: state => state.menuList,
      currentUser: state => state.currentUser
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

  function createWrapper (store, options) {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(BottomNavBar, {
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

  test('goToPage not loggedIn go to feeds', () => {
    store.state.currentUser = {}
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToPage('feeds')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'feeds' })
  })

  test('goToPage not loggedIn go to points', () => {
    store.state.currentUser = {}
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToPage('points')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ query: { auth: 'login' } })
  })

  test('goToPage loggedIn', () => {
    store.state.currentUser = {
      name: 'Karnando Sepryan'
    }
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToPage('feeds')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'feeds' })
  })
})
