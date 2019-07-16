import userBar from '@/components/UserBar'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('UserBar', () => {
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
      currentUser: {}
    }
    const actions = {
      attemptLogout: jest.fn()
    }
    const getters = {
      currentUser: state => state.currentUser
    }
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
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    const $cookies = {
      remove: jest.fn()
    }
    return shallowMount(userBar, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'v-date-picker',
        'font-awesome-icon'
      ],
      mocks: {
        $toasted,
        $cookies
      },
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('computed name', () => {
    initComponent()
    expect(wrapper.vm.name).toEqual('')
  })

  test('computed name', () => {
    initComponent()
    store.state.currentUser = {
      name: 'Karnando Sepryan'
    }
    expect(wrapper.vm.name).toEqual('Karnando Sepryan')
  })

  test('computed firstName', () => {
    initComponent()
    store.state.currentUser = {
      name: 'Karnando Sepryan'
    }
    expect(wrapper.vm.firstName).toEqual('Karnando')
  })

  test('extendUserBar', () => {
    initComponent()
    store.state.currentUser = {
      name: 'Karnando Sepryan'
    }
    expect(wrapper.vm.isExtend).toEqual('')
    wrapper.vm.extendUserBar()
    expect(wrapper.vm.isExtend).toEqual(true)
  })

  test('shrinkUserBar', () => {
    initComponent()
    store.state.currentUser = {
      name: 'Karnando Sepryan'
    }
    expect(wrapper.vm.isExtend).toEqual('')
    wrapper.vm.shrinkUserBar()
    expect(wrapper.vm.isExtend).toEqual(false)
  })

  test('login not logged in', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.login()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'login' })
  })

  test('login already logged in', () => {
    initComponent()
    store.state.currentUser = {
      name: 'Karnando Sepryan'
    }
    wrapper.vm.login()
  })

  test('logout', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'attemptLogout')
    wrapper.vm.logout()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successAttemptLogout', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successAttemptLogout()
    expect(wrapper.vm.$cookies.remove).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'login' })
  })

  test('goToProfile', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToProfile()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'profile' })
  })
})
