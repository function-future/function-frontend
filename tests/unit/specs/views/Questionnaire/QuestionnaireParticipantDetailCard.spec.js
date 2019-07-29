import QuestionnaireParticipantDetailCard from '@/views/Questionnaire/QuestionnaireParticipantDetailCard'
import { shallowMount } from '@vue/test-utils'

describe('QuestionnaireParticipantCard', () => {
  test('computedRole', () => {
    const spy = jest.spyOn(QuestionnaireParticipantDetailCard.computed, 'computedRole')
    const role = 'STUDENT'
    const wrapper = shallowMount(QuestionnaireParticipantDetailCard, {
      propsData: {
        role,
        score: 5
      },
      stubs: [
        'BaseCard',
        'font-awesome-icon'
      ]
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedRole).toEqual('Student')
  })
})
