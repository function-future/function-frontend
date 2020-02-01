import ReminderForm from '@/views/Reminders/ReminderForm'
import reminderApi from '@/api/controller/reminders'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import moment from 'moment'

jest.mock('@/api/controller/reminders')

describe('ReminderForm', () => {
  function initWrapper (propsData) {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    localVue.use(Vuex)
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

    return shallowMount(ReminderForm, {
      propsData,
      stubs: [
        'BaseInput',
        'BaseButton',
        'UserSimpleCard',
        'ReminderMemberModal',
        'BaseTextArea',
        'VueCtkDateTimePicker',
        'font-awesome-icon'
      ],
      localVue,
      store,
      router
    })
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('save create mode', () => {
    reminderApi.createReminder = success => {
      success({ data: {} })
    }
    const wrapper = initWrapper({ createMode: true })
    wrapper.vm.$router.replace = jest.fn()
    wrapper.vm.title = 'title'
    wrapper.vm.description = 'description'
    wrapper.vm.timeType = 'EVERY_DAY'
    wrapper.vm.members = [{ id: 'memberId' }]
    wrapper.vm.date = 10
    wrapper.vm.time = moment('10:00', 'HH:mm').toDate()

    wrapper.vm.save()

    expect(wrapper.vm.$router.replace).toBeCalled()
  })

  test('save not create mode', () => {
    reminderApi.updateReminder = success => {
      success()
    }
    const wrapper = initWrapper({ createMode: false })
    wrapper.vm.$router.replace = jest.fn()
    wrapper.vm.title = 'title'
    wrapper.vm.description = 'description'
    wrapper.vm.timeType = 'EVERY_DAY'
    wrapper.vm.members = [{ id: 'memberId' }]
    wrapper.vm.date = 10
    wrapper.vm.time = moment('10:00', 'HH:mm').toDate()

    wrapper.vm.save()

    expect(wrapper.vm.$router.replace).toBeCalled()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('toDisplayDay', () => {
    const wrapper = initWrapper()
    expect(wrapper.vm.toDisplayDay('SUNDAY')).toEqual('Sun')
  })

  test('handleTopBtnClick editMode', () => {
    const spy = jest.spyOn(ReminderForm.methods, 'save')
      .mockImplementation(() => Promise.resolve())
    const wrapper = initWrapper({ editMode: true })
    wrapper.vm.handleTopBtnClick()
    expect(spy).toBeCalled()
  })

  test('handleTopBtnClick not editMode', () => {
    const wrapper = initWrapper({ editMode: false })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.handleTopBtnClick()
    expect(wrapper.vm.$router.push).toBeCalled()
  })

  test('parseTime', () => {
    const wrapper = initWrapper()
    wrapper.vm.time = moment('12:00', 'HH:mm').toDate()
    expect(wrapper.vm.parseTime()).toEqual({
      minute: 0,
      hour: 12
    })
  })

  test('prepareDataForRequest scen 1', () => {
    const wrapper = initWrapper()
    wrapper.vm.title = 'title'
    wrapper.vm.description = 'description'
    wrapper.vm.timeType = 'MONTHLY'
    wrapper.vm.members = [{ id: 'memberId' }]
    wrapper.vm.daysChosen = []
    wrapper.vm.date = 10
    wrapper.vm.time = moment('10:00', 'HH:mm').toDate()
    expect(wrapper.vm.prepareDataForRequest()).toEqual({
      title: 'title',
      description: 'description',
      isRepeatedMonthly: true,
      members: ['memberId'],
      repeatDays: [],
      monthlyDate: 10,
      minute: 0,
      hour: 10
    })
  })

  test('prepareDataForRequest scen 2', () => {
    const wrapper = initWrapper()
    wrapper.vm.title = 'title'
    wrapper.vm.description = 'description'
    wrapper.vm.timeType = 'EVERY_DAY'
    wrapper.vm.members = [{ id: 'memberId' }]
    wrapper.vm.date = 10
    wrapper.vm.time = moment('10:00', 'HH:mm').toDate()
    expect(wrapper.vm.prepareDataForRequest()).toEqual({
      title: 'title',
      description: 'description',
      isRepeatedMonthly: false,
      members: ['memberId'],
      repeatDays: wrapper.vm.days,
      monthlyDate: 10,
      minute: 0,
      hour: 10
    })
  })

  test('errorHandler', () => {
    global.console.log = jest.fn()
    const wrapper = initWrapper()
    wrapper.vm.errorHandler()
    expect(console.log).toBeCalled()
  })

  test('addMemberHandler', () => {
    const wrapper = initWrapper()
    wrapper.vm.members = []
    wrapper.vm.addMemberHandler('test')
    expect(wrapper.vm.members).toEqual(['test'])
  })

  test('removeMember', () => {
    const wrapper = initWrapper()
    wrapper.vm.members = ['test']
    wrapper.vm.removeMember(0)
    expect(wrapper.vm.members).toEqual([])
  })

  test('dayClickHandler scen 1', () => {
    const wrapper = initWrapper({ editMode: true })
    wrapper.vm.daysChosen = ['SUNDAY']
    wrapper.vm.dayClickHandler('MONDAY')
    expect(wrapper.vm.daysChosen).toEqual(['SUNDAY', 'MONDAY'])
  })

  test('dayClickHandler scen 2', () => {
    const wrapper = initWrapper({ editMode: true })
    wrapper.vm.daysChosen = ['SUNDAY']
    wrapper.vm.dayClickHandler('SUNDAY')
    expect(wrapper.vm.daysChosen).toEqual(['SUNDAY'])
  })

  test('dayClickHandler scen 3', () => {
    const wrapper = initWrapper({ editMode: true })
    wrapper.vm.daysChosen = ['SUNDAY', 'MONDAY']
    wrapper.vm.dayClickHandler('SUNDAY')
    expect(wrapper.vm.daysChosen).toEqual(['MONDAY'])
  })

  test('dayClickHandler scen 4', () => {
    const wrapper = initWrapper({ editMode: false })
    wrapper.vm.daysChosen = ['SUNDAY', 'MONDAY']
    wrapper.vm.dayClickHandler('SUNDAY')
    expect(wrapper.vm.daysChosen).toEqual(['SUNDAY', 'MONDAY'])
  })

  test('setData repeatedMonthly', () => {
    const wrapper = initWrapper()
    const data = {
      members: [],
      title: 'title',
      description: 'description',
      isRepeatedMonthly: true,
      monthlyDate: 20
    }
    wrapper.vm.setData(data)
    expect(wrapper.vm.reminder).toEqual(data)
    expect(wrapper.vm.timeType).toEqual('MONTHLY')
  })

  test('setData every day', () => {
    const wrapper = initWrapper()
    const data = {
      members: [],
      title: 'title',
      description: 'description',
      isRepeatedMonthly: false,
      monthlyDate: null,
      repeatDays: [1, 2, 3, 4, 5, 6, 7]
    }
    wrapper.vm.setData(data)
    expect(wrapper.vm.reminder).toEqual(data)
    expect(wrapper.vm.timeType).toEqual('EVERY_DAY')
  })

  test('setData weekly', () => {
    const wrapper = initWrapper()
    const data = {
      members: [],
      title: 'title',
      description: 'description',
      isRepeatedMonthly: false,
      monthlyDate: null,
      repeatDays: [1, 2, 3, 4, 5]
    }
    wrapper.vm.setData(data)
    expect(wrapper.vm.reminder).toEqual(data)
    expect(wrapper.vm.timeType).toEqual('WEEKLY')
  })

  test('created create mode false', () => {
    const data = {}
    const spyData = jest.spyOn(ReminderForm.methods, 'setData')
      .mockImplementation(() => Promise.resolve())
    reminderApi.getReminder = success => {
      success({ data })
    }
    const spy = jest.spyOn(reminderApi, 'getReminder')
    initWrapper({ createMode: false })
    expect(spy).toBeCalled()
    expect(spyData).toBeCalled()
  })

  test('created create mode true', () => {
    const data = {}
    const spyData = jest.spyOn(ReminderForm.methods, 'setData')
      .mockImplementation(() => Promise.resolve())
    reminderApi.getReminder = success => {
      success({ data })
    }
    const spy = jest.spyOn(reminderApi, 'getReminder')
    initWrapper({ createMode: true })
    expect(spy).toBeCalledTimes(0)
    expect(spyData).toBeCalledTimes(0)
  })
})
