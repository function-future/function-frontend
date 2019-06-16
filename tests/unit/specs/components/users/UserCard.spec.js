import userCard from '@/components/users/UserCard'
import { shallowMount } from '@vue/test-utils'

describe('UserCard', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const user = {
      name: 'aaa',
      university: 'aaa',
      division: 'aaa',
      batch: {
        name: 'asasd'
      }
    }
    const wrapper = shallowMount(userCard, {
      propsData: {
        user
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
