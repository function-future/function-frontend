import userBar from '@/components/UserBar'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import notificationApi from '@/api/controller/notifications'

jest.mock('@/api/controller/notifications')

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
    return shallowMount(userBar, {
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
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'v-date-picker',
        'font-awesome-icon'
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

  test('extendUserBar', () => {
    initComponent()
    store.state.currentUser = {
      name: 'Karnando Sepryan'
    }
    expect(wrapper.vm.isExtend).toEqual('')
    wrapper.vm.extendUserBar()
    expect(wrapper.vm.isExtend).toEqual(true)
  })

  test('extendUserBar not logged in', () => {
    initComponent()
    store.state.currentUser = {}
    wrapper.vm.extendUserBar()
    expect(wrapper.vm.isExtend).toEqual('')
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

  test('shrinkUserBar not logged in', () => {
    initComponent()
    store.state.currentUser = {}
    wrapper.vm.shrinkUserBar()
    expect(wrapper.vm.isExtend).toEqual('')
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
      name: 'notifications'
    }
    const $router = {
      push: jest.fn()
    }
    const lv = createLocalVue()
    lv.use(Vuex)
    store = initStore()
    wrapper = shallowMount(userBar, {
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

  test('notificationPollingHandler', () => {
    notificationApi.getTotalUnseen = success => {
      success({
        data: {
          total: 10
        }
      })
    }
    initComponent()
    wrapper.vm.notificationPollingHandler()
    expect(wrapper.vm.unreadNotifications).toEqual(10)
  })
})
