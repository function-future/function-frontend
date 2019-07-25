import ModalAddQuestion from '@/views/Questionnaire/ModalAddQuestion'
import { shallowMount } from '@vue/test-utils'

describe('ModalAddQuestion', () => {
  let wrapper

  function initWrapper (props) {
    const $toasted = {
      error: jest.fn()
    }
    wrapper = shallowMount(ModalAddQuestion, {
      propsData: props,
      stubs: [
        'BaseButton',
        'BaseTextArea',
        'font-awesome-icon'
      ],
      mocks: {
        $toasted
      }
    })
  }

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('close', () => {
    initWrapper()
    wrapper.vm.close()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('submit success', () => {
    const props = { description: 'description' }
    const spy = jest.spyOn(ModalAddQuestion.methods, 'close')
    initWrapper(props)
    wrapper.vm.submit()
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(spy).toHaveBeenCalled()
  })

  test('submit fail', () => {
    initWrapper()
    wrapper.vm.submit()
    expect(wrapper.emitted('submit')).toBeFalsy()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('update success', () => {
    const props = { description: 'description' }
    const spy = jest.spyOn(ModalAddQuestion.methods, 'close')
    initWrapper(props)
    wrapper.vm.updateQuestion()
    expect(wrapper.emitted('update')).toBeTruthy()
    expect(spy).toHaveBeenCalled()
  })

  test('update fail', () => {
    initWrapper()
    wrapper.vm.updateQuestion()
    expect(wrapper.emitted('update')).toBeFalsy()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })
})
