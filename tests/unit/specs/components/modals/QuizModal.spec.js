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

  test('close from icon', async () => {
    const spy = jest.spyOn(modal.methods, 'close')
    const wrapper = shallowMount(modal)
    wrapper.find('font-awesome-icon').trigger('click')
    await wrapper.vm.$nextTick()
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.emitted().close.length).toBe(1)
  })
})
