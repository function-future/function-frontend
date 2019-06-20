import modal from '@/components/modals/Modal'
import BaseButton from '@/components/BaseButton'
import { shallowMount, mount } from '@vue/test-utils'

describe('Modal', () => {
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

  test('close from button', () => {
    const spy = jest.spyOn(modal.methods, 'close')
    const wrapper = mount(modal)
    wrapper.find(BaseButton).vm.$emit('click')
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.emitted().close.length).toBe(1)
  })
})
