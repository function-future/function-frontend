import ReminderCard from '@/views/Reminders/ReminderCard'
import { shallowMount } from '@vue/test-utils'

describe('ReminderCard', () => {
  let wrapper

  function initWrapper (propsData) {
    wrapper = shallowMount(ReminderCard, {
      stubs: ['font-awesome-icon'],
      propsData
    })
  }

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('toFirstUpperCase', () => {
    initWrapper({ reminder: { repeatDays: [] } })
    expect(wrapper.vm.toFirstUpperCase('tes')).toEqual('Tes')
  })

  test('formatDay repeatedMonthly', () => {
    const reminder = {
      isRepeatedMonthly: true,
      monthlyDate: 24,
      repeatDays: []
    }
    initWrapper({ reminder })
    expect(wrapper.vm.formatDay(reminder)).toEqual('Every month on 24')
  })

  test('formatDay repeated weekly every day', () => {
    const reminder = {
      isRepeatedMonthly: false,
      monthlyDate: 24,
      repeatDays: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    }
    initWrapper({ reminder })
    expect(wrapper.vm.formatDay(reminder)).toEqual('Every day')
  })

  test('formatDay repeated weekly not every day', () => {
    const reminder = {
      isRepeatedMonthly: false,
      monthlyDate: 24,
      repeatDays: ['SUNDAY', 'MONDAY', 'TUESDAY']
    }
    initWrapper({ reminder })
    expect(wrapper.vm.formatDay(reminder)).toEqual('Sun, Mon, Tue')
  })
})
