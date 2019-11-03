import MobileNavBar from '@/components/skeletons/MobileNavBar'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'

describe('MobileNavBar', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('computed breadcrumbAvailable', () => {
    const $route = {
      meta: {
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' }
        ]
      }
    }
    const wrapper = shallowMount(MobileNavBar, {
      mocks: {
        $route
      },
      sync: false
    })
    expect(wrapper.vm.breadcrumbAvailable).toEqual(wrapper.vm.breadcrumbList)
  })

  test('computed breadcrumb', () => {
    const $route = {
      meta: {
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' }
        ]
      }
    }
    const wrapper = shallowMount(MobileNavBar, {
      mocks: {
        $route
      },
      sync: false
    })
    expect(wrapper.vm.breadcrumb).toEqual(wrapper.vm.$route.meta.breadcrumb[wrapper.vm.$route.meta.breadcrumb.length - 2])
  })

  test('updateList', () => {
    const $route = {
      meta: {
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' }
        ]
      }
    }
    const wrapper = shallowMount(MobileNavBar, {
      mocks: {
        $route
      },
      sync: false
    })
    wrapper.vm.fetchBreadcrumb()
    expect(wrapper.vm.breadcrumbList).toEqual(wrapper.vm.$route.meta.breadcrumb)
  })

  test('routeTo', () => {
    const $router = {
      push: jest.fn()
    }
    const $route = {
      meta: {
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' }
        ]
      }
    }
    const wrapper = shallowMount(MobileNavBar, {
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.$router.push = jest.fn()
    const breadcrumb = { link: 'feeds' }
    wrapper.vm.routeTo(breadcrumb)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'feeds' })
  })

  test('watch changes on $route', (done) => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    const router = new VueRouter({
      routes: [
        {
          path: '/route1',
          meta: { breadcrumb: [{ name: 'Batches', link: 'courseBatches' }] }
        },
        {
          path: '/route2',
          meta: {
            breadcrumb: [
              { name: 'Batches', link: 'courseBatches' },
              { name: 'Courses', link: 'courses' }
            ]
          }
        }
      ]
    })
    const wrapper = shallowMount(MobileNavBar, {
      localVue,
      router,
      sync: false
    })
    router.push({ path: '/route2' })
    const spy = jest.spyOn(wrapper.vm, 'fetchBreadcrumb')
    wrapper.vm.$nextTick().then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })
})
