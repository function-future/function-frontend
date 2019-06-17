import ActivityBlogDetail from '@/views/ActivityBlogs/ActivityBlogDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VeeValidate)

describe('ActivityBlogDetail', () => {
  let actions
  let getters
  let state
  let store
  beforeEach(() => {
    state = {
      activityBlog: {}
    }
    actions = {
      initialState: jest.fn()
    }
    getters = {
      activityBlog: state => state.activityBlog
    }
    store = new Vuex.Store({
      modules: {
        activityBlogs: {
          state,
          actions,
          getters
        }
      }
    })
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    // localVue.use(VueRouter)
    const $route = {
      params: {
        id: 'sample-id'
      }
    }
    const wrapper = shallowMount(ActivityBlogDetail, {
      store,
      localVue,
      mocks: {
        $route
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
