import BatchCard from '@/components/batches/BatchCard'
import { shallowMount } from '@vue/test-utils'

describe('UserCard', () => {
  let wrapper
  beforeEach(() => {
    const batch = {
      'id': 'sample-id',
      'name': 'Batch Name',
      'code': '3'
    }
    wrapper = shallowMount(BatchCard, {
      propsData: {
        batch,
        showAction: true
      }
    })
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('emit edit', () => {
    wrapper.vm.edit()
    expect(wrapper.emitted().edit.length).toEqual(1)
  })

  test('emit deleteBatch', () => {
    wrapper.vm.deleteBatch()
    expect(wrapper.emitted().delete.length).toEqual(1)
  })
})
