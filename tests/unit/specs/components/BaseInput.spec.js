import baseInput from '@/components/BaseInput'
import { shallowMount } from '@vue/test-utils'

describe('Base Input', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('updateValue', () => {
    const spy = jest.spyOn(baseInput.methods, 'updateValue')
    const wrapper = shallowMount(baseInput)
    wrapper.find('input').value = 'Test'
    wrapper.find('input').trigger('input')
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.emitted().input.length).toBe(1)
  })

  test('emitKeyUp', () => {
    const wrapper = shallowMount(baseInput)
    wrapper.vm.emitKeyUp()
    expect(wrapper.emitted.length).toEqual(1)
  })

  test('emitFocus', () => {
    const wrapper = shallowMount(baseInput)
    wrapper.vm.emitFocus()
    expect(wrapper.emitted.length).toEqual(1)
  })
})
