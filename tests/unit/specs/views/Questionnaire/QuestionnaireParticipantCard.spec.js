import QuestionnaireParticipantCard from '@/views/Questionnaire/QuestionnaireParticipantCard'
import { shallowMount } from '@vue/test-utils'

describe('QuestionnaireParticipantCard', () => {
  test('computedRole', () => {
    const spy = jest.spyOn(QuestionnaireParticipantCard.computed, 'computedRole')
    const role = 'STUDENT'
    const wrapper = shallowMount(QuestionnaireParticipantCard, {
      propsData: {
        role
      },
      stubs: [
        'BaseCard'
      ]
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedRole).toEqual('Student')
  })
})
