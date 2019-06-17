import userCard from '@/components/users/UserCard'
import { shallowMount } from '@vue/test-utils'

describe('UserCard', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(userCard)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
