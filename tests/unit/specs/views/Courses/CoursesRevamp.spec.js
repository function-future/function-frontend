import Courses from '@/views/Courses/CoursesRevamp'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('Courses Revamp', () => {
  let store
  let wrapper
  let localVue
  let $route = {
    name: 'editStickyNote',
    params: { code: 'code' },
    query: { tab: 'master' }
  }

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    return lv
  }

  function initStore () {
    const state = {
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      },
      currentUser: {
        role: 'ADMIN'
      }
    }
    const actions = {
      fetchBatches: jest.fn(),
      fetchCourses: jest.fn(),
      fetchMasterCourses: jest.fn(),
      deleteCourseById: jest.fn(),
      deleteMasterCourseById: jest.fn(),
      copyCourse: jest.fn()
    }
    const getters = {
      accessList: state => state.accessList,
      currentUser: state => state.currentUser
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
    return shallowMount(Courses, {
      ...options,
      store,
      localVue,
      stubs: [
        'b-tabs',
        'b-tab-item',
        'b-checkbox',
        'b-button'
      ],
      mocks: {
        $toasted,
        $route,
        $router: {
          replace: jest.fn(),
          push: jest.fn()
        }
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

  test('checkCurrentUser', () => {
    store.state.currentUser.role = 'STUDENT'
    wrapper.vm.checkCurrentUser()
    expect(wrapper.vm.tabs[0].visible).toEqual(false)
  })

  test('a', () => {
    store.state.currentUser.role = 'STUDENT'
    wrapper.vm.checkCurrentUser()
  })

  test('initPage master', () => {
    $route.query.tab = 'master'
    const spy = jest.spyOn(wrapper.vm, 'fetchMasterCourse')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initPage batch', () => {
    $route.query.tab = 'batch'
    const spy = jest.spyOn(wrapper.vm, 'initBatchCourse')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('setQuery active tab outside validation', () => {
    $route.query.tab = 'batch'
    wrapper.vm.activeTab = -1
    wrapper.vm.setQuery()
    expect(wrapper.vm.activeTab).toEqual(0)
    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(1)
  })

  test('setQuery active tab same as query', () => {
    $route.query.tab = 'master'
    wrapper.vm.activeTab = -1
    wrapper.vm.setQuery()
    expect(wrapper.vm.activeTab).toEqual(0)
    expect(wrapper.vm.$router.replace).toHaveBeenCalledTimes(0)
  })

  test('initBatchCourse batches length > 0', () => {
    wrapper.vm.batches = [ 'test1', 'test2' ]
    const spy = jest.spyOn(wrapper.vm, 'fetchCourse')
    wrapper.vm.initBatchCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initBatchCourse batches length = 0', () => {
    wrapper.vm.batches = []
    const spy = jest.spyOn(wrapper.vm, 'fetchBatchList')
    wrapper.vm.initBatchCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('fetchBatchList', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchBatches')
    wrapper.vm.fetchBatchList()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchBatches', () => {
    const response = [
      { code: '1' },
      { code: '2' }
    ]
    const spy = jest.spyOn(wrapper.vm, 'fetchCourse')
    wrapper.vm.successFetchBatches(response)
    expect(wrapper.vm.batches).toEqual(response)
    expect(wrapper.vm.selectedBatchCode).toEqual(response[0].code)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failFetchBatches', () => {
    wrapper.vm.failFetchBatches()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('fetchCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchCourses')
    wrapper.vm.fetchCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('fetchMasterCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchMasterCourses')
    wrapper.vm.fetchMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchCourse complete', () => {
    const response = []
    const paging = {
      page: 3,
      size: 10,
      totalRecords: 25
    }
    wrapper.vm.infiniteState = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchCourse(response, paging)
    expect(wrapper.vm.infiniteState.complete).toHaveBeenCalledTimes(1)
  })

  test('successFetchCourse', () => {
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
    wrapper.vm.infiniteState = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchCourse(response, paging)
    expect(wrapper.vm.courses).toEqual(response)
    expect(wrapper.vm.paging).toEqual(paging)
    expect(wrapper.vm.infiniteState.loaded).toHaveBeenCalledTimes(1)
  })

  test('failFetchCourse', () => {
    wrapper.vm.failFetchCourse()
    expect(wrapper.vm.switchingTabLoading).toEqual(false)
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('resetPage', () => {
    wrapper.vm.resetPage()
    expect(wrapper.vm.isLoading).toEqual(true)
    expect(wrapper.vm.allSelected).toEqual(false)
  })

  test('goToAddPage', () => {
    wrapper.vm.goToAddPage()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('goToDetail master course', () => {
    $route.query.tab = 'master'
    const spy = jest.spyOn(wrapper.vm, 'goToMasterCourseDetail')
    wrapper.vm.goToDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToDetail course', () => {
    $route.query.tab = 'batch'
    const spy = jest.spyOn(wrapper.vm, 'goToCourseDetail')
    wrapper.vm.goToDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToEditPage master course', () => {
    $route.query.tab = 'master'
    const spy = jest.spyOn(wrapper.vm, 'editMasterCourse')
    wrapper.vm.goToEditPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToEditPage course', () => {
    $route.query.tab = 'batch'
    const spy = jest.spyOn(wrapper.vm, 'editCourse')
    wrapper.vm.goToEditPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteThis master course', () => {
    $route.query.tab = 'master'
    const spy = jest.spyOn(wrapper.vm, 'deleteThisMasterCourse')
    wrapper.vm.deleteThis()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteThis course', () => {
    $route.query.tab = 'batch'
    const spy = jest.spyOn(wrapper.vm, 'deleteThisCourse')
    wrapper.vm.deleteThis()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('editCourse', () => {
    wrapper.vm.selectedBatchCode = 'code'
    wrapper.vm.editCourse('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editCourse',
      params: {
        id: 'sample-id-1',
        code: 'code'
      }
    })
  })

  test('editMasterCourse', () => {
    wrapper.vm.selectedBatchCode = 'code'
    wrapper.vm.editMasterCourse('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editMasterCourse',
      params: { id: 'sample-id-1' }
    })
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.openDeleteConfirmationModal('sample-id-1')
    wrapper.vm.selectedId = 'sample-id-1'
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('deleteThisCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteCourseById')
    wrapper.vm.deleteThisCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteThisMasterCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteMasterCourseById')
    wrapper.vm.deleteThisMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToMasterCourseDetail', () => {
    wrapper.vm.goToMasterCourseDetail('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'masterCourseDetail',
      params: { id: 'sample-id-1' }
    })
  })

  test('goToCourseDetail', () => {
    wrapper.vm.selectedBatchCode = 'code'
    wrapper.vm.goToCourseDetail('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courseDetail',
      params: {
        id: 'sample-id-1',
        code: 'code'
      }
    })
  })

  test('successDeleteCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'resetPage')
    wrapper.vm.successDeleteCourse()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failDeleteCourse', () => {
    wrapper.vm.failDeleteCourse()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
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

  test('openShareCourseModal', () => {
    wrapper.vm.openShareCourseModal('sample-id-1')
    expect(wrapper.vm.selectedIds).toEqual([ 'sample-id-1' ])
    expect(wrapper.vm.showShareCourseModal).toEqual(true)
  })

  test('openShareSelectedCourseModal', () => {
    wrapper.vm.openShareSelectedCourseModal()
    expect(wrapper.vm.showShareCourseModal).toEqual(true)
  })

  test('submitShareCourse destination batch empty', () => {
    const spy = jest.spyOn(wrapper.vm, 'copyCourse')
    wrapper.vm.submitShareCourse('')
    expect(spy).toHaveBeenCalledTimes(0)
  })

  test('submitShareCourse destination', () => {
    const spy = jest.spyOn(wrapper.vm, 'copyCourse')
    wrapper.vm.submitShareCourse('code')
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successSubmitShareCourse', () => {
    wrapper.vm.successSubmitShareCourse()
    expect(wrapper.vm.selectedIds).toEqual([])
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failSubmitShareCourse', () => {
    wrapper.vm.failSubmitShareCourse()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('courseTitleEllipsis ellipsis', () => {
    const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet sollicitudin justo'
    expect(wrapper.vm.courseTitleEllipsis(text)).toEqual(text.substr(0, 50) + '...')
  })

  test('courseTitleEllipsis no ellipsis', () => {
    const text = 'Lorem ipsum'
    expect(wrapper.vm.courseTitleEllipsis(text)).toEqual(text)
  })

  test('watch activeTab', (done) => {
    wrapper.vm.activeTab = 2
    const spy = jest.spyOn(wrapper.vm, 'setQuery')
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })

  test('watch currentTabType', (done) => {
    $route.query.tab = 'batch'
    $route.query.tab = 'master'
    const spy = jest.spyOn(wrapper.vm, 'resetPage')
    wrapper.vm.activeTab = 1
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })

  test('watch allSelected', (done) => {
    wrapper.vm.allSelected = true
    const spy = jest.spyOn(wrapper.vm, 'selectAll')
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })

  test('watch currentUser', (done) => {
    store.state.currentUser = {
      role: 'MENTOR'
    }
    const spy = jest.spyOn(wrapper.vm, 'checkCurrentUser')
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledTimes(1)
      done()
    })
  })
})
