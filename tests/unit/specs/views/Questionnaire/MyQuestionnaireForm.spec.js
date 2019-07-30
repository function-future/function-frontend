import MyQuestionnaireForm from '@/views/Questionnaire/MyQuestionnaireForm'
import { shallowMount } from '@vue/test-utils'

describe('MyQuestionnaireForm', () => {
  let wrapper
  function initWrapper () {
    wrapper = shallowMount(MyQuestionnaireForm, {
      stubs: [
        'BaseCard',
        'BaseTextArea',
        'BaseSelect'
      ],
      propsData: {
        question: {}
      }
    })
  }

  test('score', () => {
    const spy = jest.spyOn(MyQuestionnaireForm.watch, 'score')
    initWrapper()
    wrapper.vm.score = 10
    expect(spy).toHaveBeenCalled()
    expect(wrapper.emitted('input')).toBeTruthy()
  })

  test('comment', () => {
    const spy = jest.spyOn(MyQuestionnaireForm.watch, 'comment')
    initWrapper()
    wrapper.vm.comment = 'test'
    expect(spy).toHaveBeenCalled()
    expect(wrapper.emitted('input')).toBeTruthy()
  })
})
