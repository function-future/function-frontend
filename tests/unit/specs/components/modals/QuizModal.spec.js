import modal from '@/components/modals/QuizModal'
import BaseButton from '@/components/BaseButton'
import { shallowMount, mount } from '@vue/test-utils'

describe('QuizModal', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(modal)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Retry', () => {
    const wrapper = shallowMount(modal)
    wrapper.vm.retry()
    expect(wrapper.emitted().retry.length).toEqual(1)
  })

  test('finish', () => {
    const wrapper = shallowMount(modal)
    wrapper.vm.finish()
    expect(wrapper.emitted().finish.length).toEqual(1)
  })
})
