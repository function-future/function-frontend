import Reminders from '@/views/Reminders/Reminders'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import reminderApi from '@/api/controller/reminders'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

jest.mock('@/api/controller/reminders')

describe('Reminders', () => {
  let wrapper
  function initComponent () {
    const lv = createLocalVue()
    lv.use(VueRouter)
    lv.use(Vuex)
    const router = new VueRouter([])
    const store = new Vuex.Store({
      modules: {
        reminders: {
          actions: {
            toast: jest.fn()
          }
        }
      }
    })
    wrapper = shallowMount(Reminders, {
      stubs: [
        'vue-infinite-loading',
        'SearchBar',
        'BaseButton',
        'ReminderCard',
        'InfiniteLoading'
      ],
      store,
      localVue: lv,
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

  test('infiniteHandler page 2 response data === 0', () => {
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
    wrapper.vm.page = 2
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toBeCalledTimes(1)
  })

  test('infiniteHandler with keyword', () => {
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }

    initComponent()
    wrapper.vm.keyword = 'keyword'
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

  test('deleteReminder with keyword', () => {
    reminderApi.deleteReminder = success => {
      success()
    }
    const spy = jest.spyOn(Reminders.methods, 'searchHandler')
      .mockImplementation(() => Promise.resolve())
    initComponent()
    wrapper.vm.keyword = 'keyword'
    wrapper.vm.deleteReminder()
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteReminder without keyword', () => {
    reminderApi.deleteReminder = success => {
      success()
    }
    initComponent()
    wrapper.vm.$refs.infiniteLoading = {
      stateChanger: {
        reset: jest.fn()
      }
    }
    wrapper.vm.deleteReminder()
    expect(wrapper.vm.$refs.infiniteLoading.stateChanger.reset).toBeCalledTimes(1)
  })

  test('removeHandler', () => {
    initComponent()
    wrapper.vm.removeHandler('reminderId')
    expect(wrapper.vm.showDeleteConfirmation).toBe(true)
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
