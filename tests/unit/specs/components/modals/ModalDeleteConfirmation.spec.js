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
    const spy = jest.spyOn(modalDeleteConfirmation.methods, 'close')
    const wrapper = mount(modalDeleteConfirmation)
    wrapper.find('.button-cancel').trigger('click')
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.emitted().close.length).toBe(1)
  })

  test('clickDelete', () => {
    const spy = jest.spyOn(modalDeleteConfirmation.methods, 'clickDelete')
    const wrapper = mount(modalDeleteConfirmation)
    wrapper.find('.button-delete').trigger('click')
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.emitted().clickDelete.length).toBe(1)
  })
})
