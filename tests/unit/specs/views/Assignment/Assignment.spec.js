import { shallowMount } from '@vue/test-utils'
import Assignment from '@/views/Assignment/Assignment'

describe('Assignment.vue', () => {
  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(Assignment)
    expect(wrapper.find('[class="assignment-card"]').text()).toContain('Lorem ipsum')
  })
})
