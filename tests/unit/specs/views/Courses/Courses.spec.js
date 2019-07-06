import Courses from '@/views/Courses/Courses'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Courses', () => {
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
      courseList: [
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
      ]
    }
    const actions = {
      fetchCourses: jest.fn(),
      deleteCourseById: jest.fn(),
      copyCourse: jest.fn()
    }
    const getters = {
      courseList: state => state.courseList
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
    return shallowMount(Courses, {
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

  test('initPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchCourses')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchCourses', () => {
    const response = [
      {
        'id': 'sample-id-11',
        'title': 'Course Title 11',
        'description': 'Course Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-12',
        'title': 'Course Title 12',
        'description': 'Course Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-13',
        'title': 'Course Title 13',
        'description': 'Course Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-14',
        'title': 'Course Title 14',
        'description': 'Course Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ]
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 25
    }
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchCourses(response, paging)
    expect(wrapper.vm.courses).toEqual(response)
    expect(wrapper.vm.paging).toEqual(paging)
  })

  test('successFetchCourses max page', () => {
    const response = [
      {
        'id': 'sample-id-11',
        'title': 'Course Title 11',
        'description': 'Course Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-12',
        'title': 'Course Title 12',
        'description': 'Course Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-13',
        'title': 'Course Title 13',
        'description': 'Course Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-14',
        'title': 'Course Title 14',
        'description': 'Course Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ]
    const paging = {
      page: 3,
      size: 10,
      totalRecords: 25
    }
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchCourses(response, paging)
    expect(wrapper.vm.courses).toEqual(response)
    expect(wrapper.vm.paging).toEqual(paging)
  })

  test('failFetchCourses', () => {
    wrapper.vm.failFetchCourses()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('goToThisCourseDetail', () => {
    wrapper.vm.$route.params.code = 'sample-id'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToThisCourseDetail('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courseDetail',
      params: {
        id: 'sample-id-1',
        code: wrapper.vm.$route.params.code
      }
    })
  })

  test('goToAddCourse', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToAddCourse()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'addCourse'
    })
  })

  test('goToEditCourse', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToEditCourse('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editCourse',
      params: { id: 'sample-id-1' }
    })
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.openDeleteConfirmationModal('sample-id-1')
    expect(wrapper.vm.selectedId).toEqual('sample-id-1')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('deleteThisCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteCourseById')
    wrapper.vm.deleteThisCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeleteCourseById', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successDeleteCourseById()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'courses' })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('failDeleteCourseById', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.failDeleteCourseById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('openCopySelectedCourseModal', () => {
    wrapper.vm.selectedIds = [
      'sample-id-1',
      'sample-id-2'
    ]
    wrapper.vm.openCopySelectedCourseModal()
    expect(wrapper.vm.showCopyCourseModal).toEqual(true)
  })

  test('openCopySelectedCourseModal not selecting anything', () => {
    wrapper.vm.selectedIds = []
    wrapper.vm.openCopySelectedCourseModal()
    expect(wrapper.vm.showCopyCourseModal).toEqual(false)
  })

  test('openCopyCourseModal', () => {
    wrapper.vm.openCopyCourseModal('sample-id-1')
    expect(wrapper.vm.selectedIds).toEqual([ 'sample-id-1' ])
    expect(wrapper.vm.showCopyCourseModal).toEqual(true)
  })

  test('submitCopyCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'copyCourse')
    wrapper.vm.submitCopyCourse('sample-id-1')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitCopyCourse no batch destination', () => {
    wrapper.vm.submitCopyCourse('')
  })

  test('successSubmitCopyCourse', () => {
    wrapper.vm.successSubmitCopyCourse()
    expect(wrapper.vm.selectedIds).toEqual([])
    expect(wrapper.vm.showCopyCourseModal).toEqual(false)
  })

  test('failSubmitCopyCourse', () => {
    wrapper.vm.failSubmitCopyCourse()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showCopyCourseModal).toEqual(false)
  })

  test('select', () => {
    wrapper.vm.select()
    expect(wrapper.vm.allSelected).toEqual(false)
  })

  test('selectAll', () => {
    wrapper.vm.allSelected = false
    wrapper.vm.selectAll()
    expect(wrapper.vm.selectedIds).toEqual(wrapper.vm.courses.map(i => i.id))
  })

  test('selectAll deselect', () => {
    wrapper.vm.allSelected = true
    wrapper.vm.selectAll()
    expect(wrapper.vm.selectedIds).toEqual([])
  })
})
