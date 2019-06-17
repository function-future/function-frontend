import activityBlogs from '@/views/ActivityBlogs/ActivityBlogs'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import config from '@/config/index'
import VeeValidate from 'vee-validate'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ActivityBlogs', () => {
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
    const wrapper = shallowMount(activityBlogs, {
      store,
      localVue
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
