import Notifications from '@/views/Notifications/Notifications'
import notificationApi from '@/api/controller/notifications'
import moment from 'moment'
import { shallowMount } from '@vue/test-utils'

jest.mock('@/api/controller/notifications')

describe('Notifications', () => {

  let wrapper

  function initWrapper () {
    wrapper = shallowMount(Notifications, {
      stubs: ['BaseCard', 'VueInfiniteLoading']
    })
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('infiniteHandler case 1', () => {
    const data = [
      {
        id: 'id1'
      },
      {
        id: 'id2'
      }
    ]
    notificationApi.getNotifications = success => {
      success({
        data
      })
    }
    const spy = jest.spyOn(Notifications.methods, 'readNotification')
      .mockImplementation()
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }

    initWrapper()
    wrapper.vm.infiniteHandler($state)

    expect(spy).toHaveBeenCalledWith(data[0].id)
    expect($state.loaded).toHaveBeenCalled()
  })

  test('infiniteHandler case 2', () => {
    const data = [
      {
        id: 'id1'
      },
      {
        id: 'id2'
      }
    ]
    notificationApi.getNotifications = success => {
      success({
        data
      })
    }
    const spy = jest.spyOn(Notifications.methods, 'readNotification')
      .mockImplementation()
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }

    initWrapper()
    wrapper.vm.page = 2
    wrapper.vm.infiniteHandler($state)

    expect(spy).toHaveBeenCalledTimes(0)
    expect($state.loaded).toHaveBeenCalled()
  })

  test('infiniteHandler case 2', () => {
    const data = []
    notificationApi.getNotifications = success => {
      success({
        data
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }

    initWrapper()
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('readNotification', () => {
    notificationApi.readNotification = jest.fn()
    initWrapper()
    wrapper.vm.readNotification()
    expect(notificationApi.readNotification).toHaveBeenCalled()
  })

  test('convertClock', () => {
    const epoch = Date.now()
    initWrapper()
    expect(wrapper.vm.convertClock(epoch)).toEqual({
      clock: moment(epoch).format('HH:mm'),
      date: moment(epoch).format('DD MMM YY')
    })
  })

  test('errorHandler', () => {
    global.console.log = jest.fn()
    initWrapper()
    wrapper.vm.errorHandler('test')
    expect(console.log).toHaveBeenCalledWith('test')
  })
})
