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

  test('emit edit with data', () => {
    const user = {
      id: 'sample-id',
      name: 'aaa',
      university: 'aaa',
      role: 'STUDENT',
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

    wrapper.vm.edit()
    expect(wrapper.emitted().edit[0]).toEqual(['sample-id', 'STUDENT'])
  })

  test('deleteUser emit delete', () => {
    const user = {
      id: 'sample-id',
      name: 'aaa',
      university: 'aaa',
      role: 'STUDENT',
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
    wrapper.vm.deleteUser()
    expect(wrapper.emitted().delete[0]).toEqual(['sample-id'])
  })
})
