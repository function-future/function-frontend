import courseCard from '@/components/courses/CourseCard'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('BaseCard', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore () {
    const state = {
      courseList: {},
      accessList: {}
    }
    const actions = {
    }
    const getters = {
      courseList: state => state.courseList,
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      modules: {
        auth: {
          state,
          actions,
          getters
        }
      }
    })

    return {
      store,
      state,
      actions,
      getters
    }
  }

  function createWrapper (store, options) {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    const $cookies = {
      remove: jest.fn()
    }
    return shallowMount(courseCard, {
      ...options,
      store,
      localVue,
      router,
      propsData: {
        course: {
          title: 'course title course title course title course title course title course title course title',
          id: 'sample-id-1'
        }
      },
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'v-date-picker',
        'font-awesome-icon'
      ],
      mocks: {
        $toasted,
        $cookies
      },
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })
  test('copy', () => {
    initComponent()
    wrapper.vm.copy()
    expect(wrapper.emitted().copy.length).toBe(1)
  })

  test('edit', () => {
    initComponent()
    wrapper.vm.edit()
    expect(wrapper.emitted().edit.length).toBe(1)
  })

  test('deleteCourse', () => {
    initComponent()
    wrapper.vm.deleteCourse()
    expect(wrapper.emitted().delete.length).toBe(1)
  })

  test('computed title > 40', () => {
    initComponent()
    wrapper.vm.course.title = 'course title course title course title course title course title course title course title'
    expect(wrapper.vm.title).toEqual(wrapper.vm.course.title.slice(0, 40) + '...')
  })
})
