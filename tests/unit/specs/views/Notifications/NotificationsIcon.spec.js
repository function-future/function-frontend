import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import NotificationsIcon from '@/views/Notifications/NotificationsIcon'
import notificationApi from '@/api/controller/notifications'

jest.mock('@/api/controller/notifications')

describe('NotificationsIcon', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  function generateLocalVue () {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    return localVue
  }

  function initComponent (currentUser) {
    const localVue = generateLocalVue()
    const store = new Vuex.Store({
      modules: {
        notifications: {
          getters: {
            currentUser: () => currentUser || {}
          }
        }
      }
    })

    const $router = {
      push: jest.fn()
    }

    return shallowMount(NotificationsIcon, {
      localVue,
      store,
      methods: {
        initWebsocketConnection: jest.fn(),
        subscribe: jest.fn()
      },
      stubs: ['b-icon'],
      mocks: {
        $router
      }
    })
  }

  test('sanity', () => {
    expect(true).toBe(true)
  })

  test('created 1', () => {
    notificationApi.getTotalUnseen = (success) => {
      success({
        data: {
          total: 10
        }
      })
    }
    let wrapper = initComponent()
    expect(wrapper.vm.notification.color).toEqual('red')
    expect(wrapper.vm.notification.total).toEqual(10)
  })

  test('created 2', () => {
    notificationApi.getTotalUnseen = (success) => {
      success({
        data: {
          total: 0
        }
      })
    }
    let wrapper = initComponent()
    expect(wrapper.vm.notification.color).toEqual('white')
    expect(wrapper.vm.notification.total).toEqual(0)
  })

  test('destroyed 1', () => {
    let wrapper = initComponent()
    let subscription = {
      unsubscribe: jest.fn()
    }
    wrapper.vm.notificationSubscription = subscription
    wrapper.vm.$destroy()
    expect(subscription.unsubscribe).toHaveBeenCalled()
  })

  test('destroyed 2', () => {
    let wrapper = initComponent()
    let subscription = {
      unsubscribe: jest.fn()
    }
    wrapper.vm.$destroy()
    expect(subscription.unsubscribe).not.toHaveBeenCalled()
  })

  test('watch isSocketConnected', done => {
    let wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'subscribe')
    wrapper.vm.isSocketConnected = true
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalled()
      done()
    })
  })

  test('watch isSocketConnected 2', done => {
    let wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'subscribe')
    wrapper.vm.isSocketConnected = false
    wrapper.vm.$nextTick(() => {
      expect(spy).not.toHaveBeenCalled()
      done()
    })
  })

  test('goToNotification 1', () => {
    let wrapper = initComponent()
    wrapper.vm.$route = { name: 'chatrooms' }
    wrapper.vm.goToNotifications()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'notifications' })
  })

  test('goToNotification 2', () => {
    let wrapper = initComponent()
    global.location.reload = jest.fn()
    wrapper.vm.$route = { name: 'notifications' }
    wrapper.vm.goToNotifications()
    expect(global.location.reload).toHaveBeenCalledWith()
  })

  test('notificationSubscriptionCallback', () => {
    let wrapper = initComponent()
    wrapper.vm.notificationSubscriptionCallback({
      body: JSON.stringify({
        data: {
          total: 10
        }
      })
    })
    expect(wrapper.vm.notification).toEqual({
      total: 10,
      color: 'red'
    })
  })
})
