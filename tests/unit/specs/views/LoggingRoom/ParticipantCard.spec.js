import ParticipantCard from '@/views/LoggingRoom/ParticipantCard'
import { shallowMount } from '@vue/test-utils'

describe('ParticipantCard', () => {
  let wrapper

  function initWrapper (propsData) {
    wrapper = shallowMount(ParticipantCard, {
      stubs: [
        'BaseButton'
      ],
      propsData: {
        ...propsData
      }
    })
  }

  test('computed Title', () => {
    const spy = jest.spyOn(ParticipantCard.computed, 'computedRole')
    const role = 'MENTOR'
    initWrapper({
      role: role
    })
    expect(spy).toHaveBeenCalled
    expect(wrapper.vm.computedRole).toEqual('Mentor')
  })
})
