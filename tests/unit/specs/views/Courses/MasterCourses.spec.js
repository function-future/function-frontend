import MasterCourses from '@/views/Courses/MasterCourses'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('MasterCourses', () => {
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
      ]
    }
    const actions = {
      fetchMasterCourses: jest.fn(),
      deleteMasterCourseById: jest.fn(),
      copyCourse: jest.fn()
    }
    const getters = {
      masterCourseList: state => state.masterCourseList
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
    return shallowMount(MasterCourses, {
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

  test('successFetchMasterCourses', () => {
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 25
    }
    wrapper.vm.successFetchMasterCourses(paging)
    expect(wrapper.vm.masterCourses).toEqual(wrapper.vm.masterCourseList)
    expect(wrapper.vm.paging).toEqual(paging)
  })

  test('failFetchMasterCourses', () => {
    wrapper.vm.failFetchMasterCourses()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('loadPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.loadPage(1)
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadPreviousPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadPreviousPage()
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadNextPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadNextPage()
    expect(wrapper.vm.paging.page).toEqual(3)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToThisMasterCourseDetail', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToThisMasterCourseDetail('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'masterCourseDetail',
      params: { id: 'sample-id-1' }
    })
  })

  test('goToAddMasterCourse', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToAddMasterCourse()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'addMasterCourse'
    })
  })

  test('goToEditMasterCourse', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToEditMasterCourse('sample-id-1')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editMasterCourse',
      params: { id: 'sample-id-1' }
    })
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.openDeleteConfirmationModal('sample-id-1')
    expect(wrapper.vm.selectedId).toEqual('sample-id-1')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('deleteThisMasterCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'deleteMasterCourseById')
    wrapper.vm.deleteThisMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeleteMasterById', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successDeleteMasterById()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'masterCourses' })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('failDeleteMasterById', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.failDeleteMasterById()
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
    expect(wrapper.vm.selectedIds).toEqual(wrapper.vm.masterCourses.map(i => i.id))
  })

  test('selectAll deselect', () => {
    wrapper.vm.allSelected = true
    wrapper.vm.selectAll()
    expect(wrapper.vm.selectedIds).toEqual([])
  })
})
