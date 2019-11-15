import CourseDetail from '@/views/Courses/CourseDetailRevamp'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'

describe('CourseDetail Revamp', () => {
  let store
  let wrapper
  let localVue
  let $route = {
    name: 'editStickyNote',
    query: { tab: 'master' },
    params: {
      id: 'id',
      code: 'code'
    }
  }

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(InfiniteLoading)
    return lv
  }

  function initStore () {
    const state = {
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const actions = {
      fetchCourseById: jest.fn(),
      fetchMasterCourseById: jest.fn(),
      fetchCourseDiscussions: jest.fn(),
      submitCourseDiscussion: jest.fn(),
      deleteCourseById: jest.fn(),
      deleteMasterCourseById: jest.fn(),
      downloadCourseMaterial: jest.fn()
    }
    const getters = {
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
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    const marked = jest.fn()
    return shallowMount(CourseDetail, {
      ...options,
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      propsData: {
        master: true
      },
      mocks: {
        $state,
        $toasted,
        $route,
        $router: {
          replace: jest.fn(),
          push: jest.fn()
        },
        marked
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

  test('initPage master', () => {
    wrapper.setProps({ master: true })
    const spy = jest.spyOn(wrapper.vm, 'initMasterCourse')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initPage batch', () => {
    wrapper.setProps({ master: false })
    const spy = jest.spyOn(wrapper.vm, 'initCourse')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchCourseById')
    wrapper.vm.initCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initMasterCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchMasterCourseById')
    wrapper.vm.initMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchById', () => {
    wrapper.vm.successFetchById('detail')
    expect(wrapper.vm.courseDetail).toEqual('detail')
  })

  test('failFetchById', () => {
    wrapper.vm.failFetchById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('initDiscussion', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchCourseDiscussions')
    wrapper.vm.initDiscussion()
    expect(spy).toHaveBeenCalledTimes(1)
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
    expect(wrapper.vm.state.loaded).toHaveBeenCalledTimes(1)
  })

  test('successFetchCourseDiscussions complete', () => {
    const response = []
    const paging = {
      page: 3,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchCourseDiscussions(response, paging)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
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

  test('goToEditPage master', () => {
    const spy = jest.spyOn(wrapper.vm, 'editMasterCourse')
    wrapper.setProps({ master: true })
    wrapper.vm.goToEditPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToEditPage not master', () => {
    const spy = jest.spyOn(wrapper.vm, 'editCourse')
    wrapper.setProps({ master: false })
    wrapper.vm.goToEditPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('editMasterCourse', () => {
    wrapper.vm.$route.params.id = 'sample-id'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.editMasterCourse()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editMasterCourse',
      params: {
        id: 'sample-id'
      }
    })
  })

  test('editCourse', () => {
    wrapper.setProps({ master: false })
    wrapper.vm.$route.params.id = 'sample-id'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.editCourse()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editCourse',
      params: {
        id: 'sample-id',
        code: 'code'
      }
    })
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.openDeleteConfirmationModal()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('deleteThis master', () => {
    wrapper.setProps({ master: true })
    const spy = jest.spyOn(wrapper.vm, 'deleteMasterCourse')
    wrapper.vm.deleteThis()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteThis master', () => {
    wrapper.setProps({ master: false })
    const spy = jest.spyOn(wrapper.vm, 'deleteCourse')
    wrapper.vm.deleteThis()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteMasterCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteMasterCourseById')
    wrapper.vm.deleteMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('deleteCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteCourseById')
    wrapper.vm.deleteCourse()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('successDeleteById', () => {
    const spy = jest.spyOn(wrapper.vm, 'backToCourseList')
    wrapper.vm.successDeleteById()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failDeleteById', () => {
    wrapper.vm.failDeleteById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('backToCourseList master', () => {
    wrapper.setProps({ master: true })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.backToCourseList()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courses',
      query: { tab: 'master' }
    })
  })

  test('backToCourseList batch', () => {
    wrapper.setProps({ master: false })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.backToCourseList()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courses',
      query: { tab: 'batch' }
    })
  })
})
