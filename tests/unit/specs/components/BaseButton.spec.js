import baseButton from '@/components/BaseButton'
import { shallowMount } from '@vue/test-utils'

describe('BaseButton', () => {
  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(baseButton)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
