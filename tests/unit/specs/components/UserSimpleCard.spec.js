import UserSimpleCard from '@/components/UserSimpleCard'
import { shallowMount } from '@vue/test-utils'

describe('UserSimpleCard', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(UserSimpleCard, {
      propsData: {
        user: {}
      },
      stubs: ['font-awesome-icon']
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
