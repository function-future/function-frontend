import Breakpoint from '@/mixins/Breakpoint'
import { shallowMount } from '@vue/test-utils'

describe('Breakpoint', () => {
  function initComponent (opt) {
    return shallowMount(Breakpoint, opt)
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('created', () => {
    let spy1 = jest.spyOn(window, 'addEventListener')
    let spy2 = jest.spyOn(Breakpoint.methods, 'handleResize').mockImplementation(() => Promise.resolve())
    initComponent()
    expect(spy1).toBeCalledTimes(1)
    expect(spy2).toBeCalledTimes(1)
  })

  test('destroyed', () => {
    let spy = jest.spyOn(window, 'removeEventListener')
    let wrapper = initComponent()
    wrapper.vm.$destroy()
    expect(spy).toBeCalledTimes(1)
  })

  test('handleResize', () => {
    let wrapper = initComponent()
    wrapper.setData({ isMobile: false })
    global.innerWidth = 500
    wrapper.vm.handleResize()
    expect(wrapper.vm.isMobile).toBe(true)
  })
})
