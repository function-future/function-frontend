import baseSelect from '@/components/BaseSelect'
import { shallowMount } from '@vue/test-utils'

describe('Sanity Test', () => {
  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(baseSelect)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Update value', () => {
    const spy = jest.spyOn(baseSelect.methods, 'updateValue')
    const wrapper = shallowMount(baseSelect)
    wrapper.find('select').value = 'Test selection'
    wrapper.find('select').trigger('input')
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.emitted().input.length).toBe(1)
  })
})
