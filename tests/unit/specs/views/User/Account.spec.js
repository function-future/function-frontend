import Account from '@/views/User/Account'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Account', () => {
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
      currentUser: {
        name: 'Karnando'
      }
    }
    const actions = {
      attemptLogout: jest.fn()
    }
    const getters = {
      currentUser: state => state.currentUser
    }
    const store = new Vuex.Store({
      modules: {
        feeds: {
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
      error: jest.fn()
    }
    return shallowMount(Account, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'b-button',
        'b-icon',
        'vue-toasted'
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

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('checkLoggedIn not logged in', () => {
    wrapper.vm.$router.push = jest.fn()
    store.state.currentUser = {}
    wrapper.vm.checkLoggedIn()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('checkLoggedIn logged in', () => {
    wrapper.vm.$router.push = jest.fn()
    store.state.currentUser = {
      name: 'Karnando Sepryan'
    }
    wrapper.vm.checkLoggedIn()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(0)
  })

  test('goToProfile', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToProfile()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'profileMobile' })
  })

  test('goToChangePassword', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToChangePassword()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'changePasswordMobile' })
  })

  test('logout', () => {
    const spy = jest.spyOn(wrapper.vm, 'attemptLogout')
    wrapper.vm.logout()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successAttemptLogout', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successAttemptLogout()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'feeds' })
  })

  test('computed role no currentUser', () => {
    store.state.currentUser = {}
    expect(wrapper.vm.role).toEqual('')
  })

  test('computed role with currentUser', () => {
    store.state.currentUser = { role: 'STUDENT' }
    expect(wrapper.vm.role).toEqual('Student')
  })
})
