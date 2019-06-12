import activityBlogs from '@/views/ActivityBlogs/ActivityBlogs'
import { shallowMount } from '@vue/test-utils'

describe('ActivityBlogs', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(activityBlogs)
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
