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
      assignment: {},
      accessList: {}
    }
    const actions = {
      updateAssignmentDetail: jest.fn(),
      fetchAssignmentDetail: jest.fn(),
      downloadCourseMaterial: jest.fn(),
      uploadMaterial: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      assignment: state => state.assignment,
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      state,
      actions,
      getters
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
        'v-date-picker'
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
    wrapper.vm.$store.state.assignment = {
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': 15000,
      'file': 'http://function-static.com/ASG0001/fileName.docx',
      'fileId': 'fileId',
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
      'fileId': 'fileId',
      'batch': 3 })
  })

  test('successFetchingAssignmentDetailWithoutFile', () => {
    initComponent()
    wrapper.vm.$store.state.assignment = {
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': 15000,
      'fileId': '',
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
      'fileId': '',
      'batch': 3 })
    expect(wrapper.vm.filePreviewName).toEqual('')
  })

  test('failFetchingAssignmentDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.failFetchingAssignmentDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'assignments'})
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deleteThis', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteAssignmentById')
    wrapper.vm.deleteThis()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToEditAssignment', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.$route.params.batchCode = 'futurre3'
    wrapper.vm.assignmentDetail.id = 'ASG001'
    wrapper.vm.goToEditAssignment()
    expect(spy).toHaveBeenCalledWith({
      name: 'editAssignment',
      params: {
        batchCode: 'futurre3',
        assignmentId: 'ASG001'
      }
    })
  })

  test('goToRoomList', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.goToRoomList()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
