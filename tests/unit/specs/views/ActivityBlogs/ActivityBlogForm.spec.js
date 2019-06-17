import ActivityBlogForm from '@/views/ActivityBlogs/ActivityBlogForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VeeValidate)

describe('ActivityBlogForm', () => {
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
    const wrapper = shallowMount(ActivityBlogForm, {
      store,
      localVue
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
