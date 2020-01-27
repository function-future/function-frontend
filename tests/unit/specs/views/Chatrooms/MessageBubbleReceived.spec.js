import MessageBubbleReceived from '@/views/Chatrooms/MessageBubbleReceived'
import moment from 'moment'
import { shallowMount } from '@vue/test-utils'

describe('MessageBubbleReceived', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('convertClock', () => {
    const timeNow = Date.now()
    const wrapper = shallowMount(MessageBubbleReceived, {
      propsData: {
        clock: timeNow
      }
    })
    expect(wrapper.vm.convertClock()).toEqual(moment(timeNow).format('HH:mm'))
  })
})
