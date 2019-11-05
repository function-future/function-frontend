import modalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import { shallowMount, mount } from '@vue/test-utils'

describe('ModalDeleteConfirmation', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(modalDeleteConfirmation)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('close', () => {
    const wrapper = mount(modalDeleteConfirmation)
    wrapper.vm.close()
    expect(wrapper.emitted().close.length).toBe(1)
  })

  test('clickDelete', () => {
    const wrapper = mount(modalDeleteConfirmation)
    wrapper.vm.clickDelete()
    expect(wrapper.emitted().clickDelete.length).toBe(1)
  })
})
