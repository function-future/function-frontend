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
      uploadMaterial: jest.fn()
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
    expect(wrapper.vm.displayedDates.start).toEqual(wrapper.vm.assignmentDetail.deadline)
    expect(wrapper.vm.displayedDates.end).toEqual(wrapper.vm.assignmentDetail.deadline)
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

  test('saveAssignmentWithEmptyFile', () => {
    initComponent()
    wrapper.vm.assignmentDetail.fileId = ''
    const spy = jest.spyOn(wrapper.vm, 'updateAssignmentDetail')
    wrapper.vm.saveAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('saveAssignmentWithFile', () => {
    initComponent()
    wrapper.vm.assignmentDetail.fileId = 'abc'
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

  test('goToRoomList', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.goToRoomList()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('onFileChange', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'materialUpload')
    const e = {
      target: {
        files: [
          {
            name: 'test.png',
            size: 2000000,
            type: 'image/png'
          }
        ]
      }
    }
    wrapper.vm.onFileChange(e)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('materialUpload', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'uploadMaterial')
    const file = {
      name: 'test.png',
      size: 2000000,
      type: 'image/png'
    }
    wrapper.vm.materialUpload(file)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUploadMaterial', () => {
    initComponent()
    const response = {
      'id': 'sample-id',
      'name': 'File Name',
      'file': {
        'full': 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
        'thumbnail': null
      }
    }
    wrapper.vm.file.name = 'sample-file-name'
    wrapper.vm.successUploadMaterial(response)
    expect(wrapper.vm.uploadingFile).toEqual(false)
    expect(wrapper.vm.assignmentDetail.fileId).toEqual(response.id)
    expect(wrapper.vm.filePreviewName).toEqual('sample-file-name')
  })

  test('failUploadMaterial', () => {
    initComponent()
    wrapper.vm.failUploadMaterial()
    expect(wrapper.vm.uploadingFile).toEqual(false)
    expect(wrapper.vm.filePreviewName).toEqual('Fail to upload material, please try again')
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('deleteAssignmentFile', () => {
    initComponent()
    wrapper.vm.deleteAssignmentFile()
    expect(wrapper.vm.assignmentDetail.fileId).toEqual('')
  })
})
