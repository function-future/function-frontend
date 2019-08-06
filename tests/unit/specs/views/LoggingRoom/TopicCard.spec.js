import TopicCard from '@/views/LoggingRoom/TopicCard'
import { shallowMount } from '@vue/test-utils'

describe('Topic Card', () => {
  test('createComponent', () => {
    const wrapper = shallowMount(TopicCard, {
      stubs: ['BaseCard']
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
