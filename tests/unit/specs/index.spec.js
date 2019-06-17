import App from '@/App'
import { shallowMount, createLocalVue } from '@vue/test-utils'

let localVue = createLocalVue()

describe('Main component', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const $route = {
      meta: {
        title: 'Testing mixins'
      }
    }
    const wrapper = shallowMount(App, {
      localVue,
      stubs: [
        'BaseTitle',
        'HeaderComp',
        'BaseButton',
        'BaseInput',
        'BaseCard',
        'UserBar',
        'ChangePageTitleMixins'
      ],
      mocks: {
        $route
      },
      sync: false
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
