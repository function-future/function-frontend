import CourseDetail from '@/views/Courses/CourseDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import InfiniteLoading from 'vue-infinite-loading'

describe('CourseDetail', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(InfiniteLoading)
    return lv
  }

  function initStore () {
    const state = {
      course: {
        'id': 'sample-id-1',
        'title': 'Master Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
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
      fetchMasterCourseById: jest.fn(),
      fetchCourseById: jest.fn()
    }
    const getters = {
      course: state => state.course,
      masterCourse: state => state.masterCourse,
      masterCourseList: state => state.masterCourseList,
      accessList: state => state.accessList
    }
    const discussionState = {
      courseDiscussions: [
        {
          'id': 'sample-id-1',
          'author': {
            'id': 'sample-id',
            'name': 'Oliver Sebastian'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-2',
          'author': {
            'id': 'sample-id',
            'name': 'David William Kurnia'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-3',
          'author': {
            'id': 'sample-id',
            'name': 'Jonathan'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-4',
          'author': {
            'id': 'sample-id',
            'name': 'Stelli'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        }
      ]
    }
    const discussionActions = {
      fetchCourseDiscussions: jest.fn()
    }
    const discussionGetters = {
      courseDiscussions: state => state.courseDiscussions
    }
    const store = new Vuex.Store({
      modules: {
        courses: {
          state,
          actions,
          getters
        },
        discussions: {
          state: discussionState,
          actions: discussionActions,
          getters: discussionGetters
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
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    return shallowMount(CourseDetail, {
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
        $toasted,
        $state
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
    const initCourseSpy = jest.spyOn(wrapper.vm, 'initCourse')
    wrapper.vm.initPage()
    expect(initCourseSpy).toHaveBeenCalledTimes(1)
  })

  test('initCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchCourseById')
    wrapper.vm.initCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initDiscussion', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchCourseDiscussions')
    wrapper.vm.initDiscussion()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchCourseById', () => {
    wrapper.vm.successFetchCourseById()
    expect(wrapper.vm.courseDetail).toEqual(wrapper.vm.course)
  })

  test('successFetchCourseDiscussions', () => {
    const response = [
      {
        'id': 'sample-id-1',
        'author': {
          'id': 'sample-id',
          'name': 'Oliver Sebastian'
        },
        'comment': 'Comment Example 12',
        'createdAt': 1580000000
      },
      {
        'id': 'sample-id-2',
        'author': {
          'id': 'sample-id',
          'name': 'David William Kurnia'
        },
        'comment': 'Comment Example 11',
        'createdAt': 1570000000
      }
    ]
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.state = {
      loaded: jest.fn()
    }
    wrapper.vm.successFetchCourseDiscussions(response, paging)
    expect(wrapper.vm.discussions).toEqual(response)
  })

  test('successFetchCourseDiscussions maximum page', () => {
    const response = [
      {
        'id': 'sample-id-1',
        'author': {
          'id': 'sample-id',
          'name': 'Oliver Sebastian'
        },
        'comment': 'Comment Example 12',
        'createdAt': 1580000000
      },
      {
        'id': 'sample-id-2',
        'author': {
          'id': 'sample-id',
          'name': 'David William Kurnia'
        },
        'comment': 'Comment Example 11',
        'createdAt': 1570000000
      }
    ]
    const paging = {
      page: 2,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchCourseDiscussions(response, paging)
    expect(wrapper.vm.discussions).toEqual(response)
  })

  test('failFetchCourseById', () => {
    wrapper.vm.failFetchCourseById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('failFetchCourseDiscussions', () => {
    wrapper.vm.failFetchCourseDiscussions()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('postDiscussion', () => {
    const spy = jest.spyOn(wrapper.vm, 'submitCourseDiscussion')
    wrapper.vm.postDiscussion()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successSubmitCourseDiscussion', () => {
    const response = {
      'id': 'sample-id-2',
      'author': {
        'id': 'sample-id',
        'name': 'David William Kurnia'
      },
      'comment': 'Comment Example 11',
      'createdAt': 1570000000
    }
    wrapper.vm.successSubmitCourseDiscussion(response)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.discussion.comment).toEqual('')
    expect(wrapper.vm.discussions).toContain(response)
  })

  test('failSubmitCourseDiscussion', () => {
    wrapper.vm.failSubmitCourseDiscussion()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('goToEditCourse', () => {
    wrapper.vm.$route.params.id = 'sample-id'
    wrapper.vm.$route.params.code = '3'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToEditCourse()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editCourse',
      params: {
        id: 'sample-id',
        code: wrapper.vm.$route.params.code
      }
    })
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.openDeleteConfirmationModal()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('deleteCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteCourseById')
    wrapper.vm.deleteCourse()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('successDeleteCourseById', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successDeleteCourseById()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'courseDetail' })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failDeleteCourseById', () => {
    wrapper.vm.failDeleteCourseById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
