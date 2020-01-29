import MenuCard from '@/views/LoggingRoom/MenuCard'
import { shallowMount } from '@vue/test-utils'

describe('MenuCard', () => {
  let wrapper

  function initWrapper (propsData) {
    wrapper = shallowMount(MenuCard, {
      propsData: {
        ...propsData
      }
    })
  }

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initWrapper()
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
