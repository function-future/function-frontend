import baseTitle from '@/components/BaseTitle'
import { shallowMount } from '@vue/test-utils'

describe('BaseTitle', () => {
  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(baseTitle)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
