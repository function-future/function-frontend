import QuestionCard from '@/views/Questionnaire/QuestionCard'
import { shallowMount } from '@vue/test-utils'

describe('QuestionCard', () => {
  test('createComponent', () => {
    const wrapper = shallowMount(QuestionCard, {
      stubs: ['BaseCard']
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
