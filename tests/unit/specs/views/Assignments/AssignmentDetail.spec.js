import AssignmentDetail from '@/views/Assignment/AssignmentDetail'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('AssignmentDetail', () => {
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
      assignment: {}
    }
    const actions = {
      updateAssignmentDetail: jest.fn(),
      fetchAssignmentDetail: jest.fn()
    }
    const getters = {
      assignment: state => state.assignment
    }
    const store = new Vuex.Store({
      modules: {
        assignments: {
          state,
          actions,
          getters,
          namespaced: true
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
    return shallowMount(AssignmentDetail, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon',
        'vue-toasted',
        'v-date-picker',
        'v-calendar',
        'mavon-editor'
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

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const spy = jest.spyOn(AssignmentDetail.methods, 'initPage')
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingAssignmentDetail', () => {
    initComponent()
    wrapper.vm.$store.getters.assignment = {
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': 15000,
      'file': 'http://function-static.com/ASG0001/fileName.docx',
      'batch': 3
    }
    wrapper.vm.assignmentDetail = {
      id: '',
      title: '',
      description: '',
      deadline: null,
      batch: 'Batch 3'
    }
    wrapper.vm.successFetchingAssignmentDetail()
    expect(wrapper.vm.assignmentDetail).toEqual({
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': new Date(15000),
      'file': 'http://function-static.com/ASG0001/fileName.docx',
      'batch': 3})
    expect(wrapper.vm.displayedDates.start).toEqual(wrapper.vm.assignmentDetail.deadline)
    expect(wrapper.vm.displayedDates.end).toEqual(wrapper.vm.assignmentDetail.deadline)
  })

  test('failFetchingAssignmentDetail', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.failFetchingAssignmentDetail()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'assignments'})
  })

  test('editAnnouncement deadline < current date', () => {
    initComponent()
    wrapper.vm.assignmentDetail.deadline = 15000
    wrapper.vm.editAssignment()
    expect(wrapper.vm.displayedDates.start).toEqual(15000)
  })

  test('editAnnouncement deadline >= currentDate', () => {
    initComponent()
    const date = new Date()
    wrapper.vm.assignmentDetail.deadline = date
    wrapper.vm.editAssignment()
    expect(wrapper.vm.displayedDates.start).toEqual(date)
  })

  test('cancel', () => {
    initComponent()
    wrapper.vm.editMode = true
    wrapper.vm.successFetchingAssignmentDetail = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.editMode).toEqual(false)
    expect(wrapper.vm.successFetchingAssignmentDetail).toHaveBeenCalled()
  })

  test('saveAssignment', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'updateAssignmentDetail')
    wrapper.vm.saveAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUpdatingAssignment', () => {
    initComponent()
    wrapper.vm.editMode = true
    wrapper.vm.assignmentDetail.deadline = new Date(15000)
    wrapper.vm.displayedDates.start = new Date(30000)
    wrapper.vm.displayedDates.end = new Date(60000)
    wrapper.vm.successUpdatingAssignment()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.displayedDates.start).toEqual(wrapper.vm.assignmentDetail.deadline)
    expect(wrapper.vm.displayedDates.end).toEqual(wrapper.vm.assignmentDetail.deadline)
  })

  test('failUpdatingAssignment', () => {
    initComponent()
    wrapper.vm.failUpdatingAssignment()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })
})
