import NavBar from '@/components/skeletons/NavBar'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import notificationApi from '@/api/controller/notifications'

jest.mock('@/api/controller/notifications')

describe('NavBar', () => {
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

  function createWrapper (store, options, name = '') {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    const $cookies = {
      remove: jest.fn()
    }
    const $route = {
      name: name
    }
    return shallowMount(NavBar, {
      mocks: {
        $toasted,
        $cookies,
        $route
      },
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'b-navbar',
        'b-navbar-item',
        'b-button',
        'b-dropdown',
        'b-dropdown-item',
        'b-icon',
        'v-date-picker'
      ],
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

  test('computed firstName > 1 word', () => {
    initComponent()
    store.state.currentUser = {
      name: 'Karnando Sepryan'
    }
    expect(wrapper.vm.firstName).toEqual('Karnando')
  })

  test('computed firstName one word', () => {
    initComponent()
    store.state.currentUser = {
      name: 'Karnando'
    }
    expect(wrapper.vm.firstName).toEqual('Karnando')
  })

  test('login not logged in', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.login()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(({ query: { auth: 'login' } }))
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
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'feeds' })
  })

  test('goToProfile', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToProfile()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'profile' })
  })

  test('goToNotifications case 1', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToNotifications()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'notifications' })
  })

  test('goToNotifications case 2', () => {
    window.location.reload = jest.fn()
    const $route = {
      name: 'notifications',
      meta: {
        title: 'notification'
      }
    }
    const $router = {
      push: jest.fn()
    }
    const lv = createLocalVue()
    lv.use(Vuex)
    store = initStore()
    wrapper = shallowMount(NavBar, {
      mixins: [],
      mocks: {
        $route,
        $router
      },
      store,
      localVue: lv,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'v-date-picker',
        'font-awesome-icon'
      ],
      sync: false
    })
    wrapper.vm.goToNotifications()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(0)
    expect(window.location.reload).toHaveBeenCalled()
  })

  test('errorHandler', () => {
    initComponent()
    global.console.log = jest.fn()
    wrapper.vm.errorHandler('err')
    expect(console.log).toHaveBeenCalledWith('err')
  })

  test('computed role no currentUser', () => {
    initComponent()
    store.state.currentUser = {}
    expect(wrapper.vm.role).toEqual('')
  })

  test('computed role with currentUser', () => {
    initComponent()
    store.state.currentUser = { role: 'STUDENT' }
    expect(wrapper.vm.role).toEqual('Student')
  })
})
