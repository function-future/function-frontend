import userBar from '@/components/UserBar'
import { shallowMount } from '@vue/test-utils'

describe('UserBar', () => {
  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(userBar)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('extendUserBar', () => {
    const wrapper = shallowMount(userBar)
    expect(wrapper.vm.isExtend).toEqual('')
    wrapper.vm.extendUserBar()
    expect(wrapper.vm.isExtend).toEqual(true)
  })

  test('shrinkUserBar', () => {
    const wrapper = shallowMount(userBar)
    expect(wrapper.vm.isExtend).toEqual('')
    wrapper.vm.shrinkUserBar()
    expect(wrapper.vm.isExtend).toEqual(false)
  })
})
