import baseTextArea from '@/components/BaseTextArea'
import { shallowMount } from '@vue/test-utils'

describe('BaseTextArea', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(baseTextArea)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Update value', () => {
    const spy = jest.spyOn(baseTextArea.methods, 'updateValue')
    const wrapper = shallowMount(baseTextArea)
    wrapper.find('textarea').value = 'Test text area input'
    wrapper.find('textarea').trigger('input')
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.emitted().input.length).toBe(1)
  })
})
