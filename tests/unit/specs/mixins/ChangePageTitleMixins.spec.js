import changePageTitleMixins from '@/mixins/ChangePageTitleMixins'
import { shallowMount } from '@vue/test-utils'

describe('ChangePageTitleMixins', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('calls fetchTitle onCreated', () => {
    const spy = jest.spyOn(changePageTitleMixins.methods, 'fetchTitle')
    const $route = {
      meta: {
        title: 'Testing mixins'
      }
    }
    shallowMount(changePageTitleMixins, {
      mocks: {
        $route
      },
      sync: false
    })
    expect(spy).toBeCalledTimes(1)
  })

  test('fetchTitle', () => {
    const $route = {
      meta: {
        title: 'Testing mixins'
      }
    }
    const wrapper = shallowMount(changePageTitleMixins, {
      mocks: {
        $route
      },
      sync: false
    })
    expect(wrapper.vm.title).toBe('Testing mixins')
  })

  test('fetchTitle meta login', () => {
    const $route = {
      meta: {
        title: 'Login'
      }
    }
    const wrapper = shallowMount(changePageTitleMixins, {
      mocks: {
        $route
      },
      sync: false
    })
    expect(wrapper.vm.title).toBe('')
  })

  test('watch changes on $route', () => {
    const spy = jest.spyOn(changePageTitleMixins.methods, 'fetchTitle')
    const $route = {
      path: 'function/mixin',
      meta: {
        title: 'Testing mixins'
      }
    }
    const wrapper = shallowMount(changePageTitleMixins, {
      mocks: {
        $route
      },
      sync: false
    })
    console.log(wrapper.vm.$route.meta.title)
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.vm.title).toBe('Testing mixins')
    spy.mockRestore()
    wrapper.setData({
      $route: {
        path: 'function/mixin/update-test',
        meta: {
          title: 'Should be updated'
        }
      }
    })
    wrapper.vm.$options.watch.$route.call(wrapper.vm)
    wrapper.vm.$nextTick().then(() => {
      console.log(wrapper.vm.$route.meta.title)
      console.log(wrapper.vm.title)
      expect(wrapper.vm.title).toBe('Should be updated')
    })
  })
})
