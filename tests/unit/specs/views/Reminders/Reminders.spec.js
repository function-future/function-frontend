import Reminders from '@/views/Reminders/Reminders'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import reminderApi from '@/api/controller/reminders'
import VueRouter from 'vue-router'

jest.mock('@/api/controller/reminders')

describe('Reminders', () => {
  let wrapper
  function initComponent () {
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    const lv = createLocalVue()
    lv.use(VueRouter)
    const router = new VueRouter([])

    wrapper = shallowMount(Reminders, {
      stubs: [
        'vue-infinite-loading',
        'SearchBar',
        'BaseButton',
        'ReminderCard',
        'InfiniteLoading'
      ],
      localVue: lv,
      mocks: {
        $toasted
      },
      router
    })
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('infiniteHandler page 1 response data > 0', () => {
    reminderApi.getReminders = success => {
      success({
        data: [{}, {}, {}]
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }

    initComponent()
    wrapper.vm.page = 1
    wrapper.vm.infiniteHandler($state)
    expect($state.loaded).toBeCalledTimes(1)
  })

  test('infiniteHandler page 1 response data === 0', () => {
    reminderApi.getReminders = success => {
      success({
        data: []
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }

    initComponent()
    wrapper.vm.page = 1
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toBeCalledTimes(1)
  })

  test('searchHandler', () => {
    reminderApi.getReminders = success => {
      success({
        data: []
      })
    }

    initComponent()
    wrapper.vm.searchHandler('test')
    expect(wrapper.vm.page).toEqual(1)
    expect(wrapper.vm.keyword).toEqual('test')
    expect(wrapper.vm.reminders).toEqual([])
  })

  test('errorCallback', () => {
    global.console.log = jest.fn()
    initComponent()
    wrapper.vm.errorCallback()
    expect(console.log).toBeCalledTimes(1)
  })

  test('removeHandler with keyword', () => {
    reminderApi.deleteReminder = success => {
      success()
    }
    const spy = jest.spyOn(Reminders.methods, 'searchHandler')
      .mockImplementation(() => Promise.resolve())
    window.confirm = jest.fn(() => true)
    initComponent()
    wrapper.vm.keyword = 'keyword'
    wrapper.vm.removeHandler('reminderId')
    expect(spy).toBeCalledTimes(1)
    expect(window.confirm).toBeCalledTimes(1)
  })

  test('removeHandler without keyword', () => {
    reminderApi.deleteReminder = success => {
      success()
    }
    window.confirm = jest.fn(() => true)
    initComponent()
    wrapper.vm.$refs.infiniteLoading = {
      stateChanger: {
        reset: jest.fn()
      }
    }
    wrapper.vm.removeHandler('reminderId')
    expect(wrapper.vm.$refs.infiniteLoading.stateChanger.reset).toBeCalledTimes(1)
    expect(window.confirm).toBeCalledTimes(1)
  })

  test('removeHandler confirm no', () => {
    reminderApi.deleteReminder = jest.fn()
    window.confirm = jest.fn(() => false)
    initComponent()
    wrapper.vm.keyword = 'keyword'
    wrapper.vm.removeHandler('reminderId')
    expect(reminderApi.deleteReminder).toBeCalledTimes(0)
    expect(window.confirm).toBeCalledTimes(1)
  })

  test('createHandler', () => {
    const spy = jest.spyOn(Reminders.methods, 'resetState').mockImplementation(() => Promise.resolve())
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.createHandler()
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.vm.$router.push).toBeCalledTimes(1)
  })

  test('detailHandler', () => {
    const spy = jest.spyOn(Reminders.methods, 'resetState').mockImplementation(() => Promise.resolve())
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.detailHandler()
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.vm.$router.push).toBeCalledTimes(1)
  })

  test('resetState', () => {
    initComponent()
    wrapper.vm.resetState()
    expect(wrapper.vm.reminders).toEqual([])
    expect(wrapper.vm.page).toEqual(1)
    expect(wrapper.vm.keyword).toEqual('')
  })
})
