import MasterCourseDetail from '@/views/Courses/MasterCourseDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('MasterCourseDetail', () => {
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
      masterCourse: {
        'id': 'sample-id-1',
        'title': 'Master Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      masterCourseList: [
        {
          'id': 'sample-id-1',
          'title': 'Master Course Title 1',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-2',
          'title': 'Master Course Title 2',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      ],
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const actions = {
      fetchMasterCourses: jest.fn(),
      deleteMasterCourseById: jest.fn(),
      copyCourse: jest.fn(),
      fetchMasterCourseById: jest.fn()
    }
    const getters = {
      masterCourse: state => state.masterCourse,
      masterCourseList: state => state.masterCourseList,
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      modules: {
        courses: {
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
    return shallowMount(MasterCourseDetail, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ],
      mocks: {
        $toasted
      },
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  beforeEach(() => {
    initComponent()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('successFetchMasterCourseById', () => {
    wrapper.vm.successFetchMasterCourseById()
    expect(wrapper.vm.masterCourseDetail).toEqual(wrapper.vm.masterCourse)
  })

  test('failFetchMasterCourseById', () => {
    wrapper.vm.failFetchMasterCourseById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('goToEditMasterCourse', () => {
    wrapper.vm.$route.params.id = 'sample-id'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToEditMasterCourse()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editMasterCourse',
      params: { id: 'sample-id' }
    })
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.openDeleteConfirmationModal()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('deleteMasterCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteMasterCourseById')
    wrapper.vm.deleteMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('successDeleteMasterById', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successDeleteMasterById()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'masterCourses' })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failDeleteMasterById', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.failDeleteMasterById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
