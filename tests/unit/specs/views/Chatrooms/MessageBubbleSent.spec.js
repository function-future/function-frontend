import MessageBubbleSent from '@/views/Chatrooms/deprecated/MessageBubbleSent'
import moment from 'moment'
import { shallowMount } from '@vue/test-utils'

describe('MessageBubbleSent', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('convertClock', () => {
    const timeNow = Date.now()
    const wrapper = shallowMount(MessageBubbleSent, {
      propsData: {
        clock: timeNow
      }
    })
    expect(wrapper.vm.convertClock()).toEqual(moment(timeNow).format('HH:mm'))
  })
})
