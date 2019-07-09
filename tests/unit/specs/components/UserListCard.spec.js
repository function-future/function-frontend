import UserListCard from '@/components/UserListCard'
import { shallowMount } from '@vue/test-utils'

describe('UserListCard', () => {

  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('userType STUDENT', () => {
    const wrapper = shallowMount(UserListCard, {
      propsData: {
        role: 'STUDENT',
        batch: '3'
      }
    })

    expect(wrapper.vm.userType).toEqual('Student - Batch 3')
  })

  test('userType MENTOR', () => {
    const wrapper = shallowMount(UserListCard, {
      propsData: {
        role: 'MENTOR'
      }
    })

    expect(wrapper.vm.userType).toEqual('Mentor')
  })

})
