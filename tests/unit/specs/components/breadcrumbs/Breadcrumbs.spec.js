import Breadcrumbs from '@/components/breadcrumbs/Breadcrumbs'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'

describe('Breadcrumbs', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('calls updateList onCreated', () => {
    const spy = jest.spyOn(Breadcrumbs.methods, 'updateList')
    const $route = {
      meta: {
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' }
        ]
      }
    }
    shallowMount(Breadcrumbs, {
      mocks: {
        $route
      },
      sync: false
    })
    expect(spy).toBeCalledTimes(1)
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
    const wrapper = shallowMount(Breadcrumbs, {
      mocks: {
        $route
      },
      sync: false
    })
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
    const wrapper = shallowMount(Breadcrumbs, {
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.$router.push = jest.fn()
    const index = 1
    wrapper.vm.routeTo(index)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'courses' })
  })

  test('watch changes on $route', () => {
    const spy = jest.spyOn(Breadcrumbs.methods, 'updateList')
    const $route = {
      meta: {
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' }
        ]
      }
    }
    const wrapper = shallowMount(Breadcrumbs, {
      mocks: {
        $route
      },
      sync: false
    })
    wrapper.setData({
      $route: {
        path: 'function/mixin/update-test',
        meta: {
          breadcrumb: [
            { name: 'Batches', link: 'courseBatches' },
            { name: 'Courses', link: 'courses' },
            { name: 'Course Detail', link: 'course Detail' },
          ]
        }
      }
    })
    wrapper.vm.$options.watch.$route.call(wrapper.vm)
    wrapper.vm.$nextTick().then(() => {
      expect(spy).toHaveBeenCalledTimes(1)
    })
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
    const wrapper = shallowMount(Breadcrumbs, {
      mocks: {
        $route
      },
      sync: false
    })
    expect(wrapper.vm.breadcrumbAvailable).toEqual(wrapper.vm.breadcrumbList)
  })

  test('computed breadcrumbs length < 4', () => {
    const $route = {
      meta: {
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' }
        ]
      }
    }
    const wrapper = shallowMount(Breadcrumbs, {
      mocks: {
        $route
      },
      sync: false
    })
    expect(wrapper.vm.breadcrumbs).toEqual(wrapper.vm.breadcrumbList)
  })

  test('computed breadcrumbs length > 4', () => {
    const $route = { meta: { breadcrumb: [] } }
    const wrapper = shallowMount(Breadcrumbs, {
      mocks: {
        $route
      },
      sync: false
    })
    wrapper.vm.breadcrumbList = [
      { name: 'Home', link: 'feeds' },
      { name: 'Activity Blogs', link: 'activityBlogs' },
      { name: 'Activity Blog Detail', link: 'activityBlogDetail' },
      { name: 'Edit Activity Blog', link: 'editActivityBlog' },
      { name: 'Activity Blog List', link: 'activityBlogList' }
    ]
    const expectedData = [
      { name: 'Home', link: 'feeds' },
      { name: 'Activity Blogs', link: 'activityBlogs' },
      { name: '...' },
      { name: 'Edit Activity Blog', link: 'editActivityBlog' },
      { name: 'Activity Blog List', link: 'activityBlogList' }
    ]
    expect(wrapper.vm.breadcrumbs).toEqual(expectedData)
  })
})
