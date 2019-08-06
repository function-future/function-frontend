import LogMessage from '@/views/LoggingRoom/LogMessage'
import { shallowMount } from '@vue/test-utils'
import moment from 'moment'

describe('ParticipantCard', () => {
  let wrapper

  function initWrapper (propsData) {
    wrapper = shallowMount(LogMessage, {
      propsData: {
        ...propsData
      }
    })
  }

  test('convert Clock', () => {
    const spy = jest.spyOn(LogMessage.methods, 'convertClock')
    const clock = 86400000
    initWrapper({
      clock: clock
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.convertClock()).toEqual(moment(clock).format('HH:mm'))
  })
})
