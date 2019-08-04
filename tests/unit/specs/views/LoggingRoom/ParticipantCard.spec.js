import ParticipantCard from '@/views/LoggingRoom/ParticipantCard'
import { shallowMount } from '@vue/test-utils'

describe('ParticipantCard', () => {
  test('createComponent', () => {
    const wrapper = shallowMount(ParticipantCard, {
      stubs: ['BaseCard']
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
