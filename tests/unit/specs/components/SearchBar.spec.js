import SearchBar from '@/components/SearchBar'
import BaseInput from '@/components/BaseInput'
import { shallowMount, mount } from '@vue/test-utils'

describe('Search Bar', () => {

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(SearchBar, {
      stubs: ['font-awesome-icon', 'BaseInput']
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.contains(BaseInput)).toBe(true)
  })

  test('Emit value', () => {
    const spy = jest.spyOn(SearchBar.methods, 'emitValue')
    const wrapper = mount(SearchBar, {
      stubs: ['font-awesome-icon']
    })
    wrapper.find('input').value = 'Test'
    wrapper.find('input').trigger('input')
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.emitted().input.length).toBe(1)
  })
})
