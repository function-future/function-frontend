import baseCard from '@/components/BaseCard'
import { shallowMount } from '@vue/test-utils'

describe('BaseCard', () => {
  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(baseCard)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
