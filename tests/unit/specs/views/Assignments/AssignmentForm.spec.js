import AssignmentForm from '@/views/Assignment/AssignmentForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import mavonEditor from 'mavon-editor'

describe('AssignmentForm', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(VeeValidate)
    lv.use(mavonEditor)
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
      assignment: {}
    }
    const actions = {
      fetchAssignmentDetail: jest.fn(),
      updateAssignmentDetail: jest.fn(),
      createAssignment: jest.fn(),
      uploadMaterial: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      accessList: state => state.accessList,
      assignment: state => state.assignment
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
    return shallowMount(AssignmentForm, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'b-button',
        'b-field',
        'b-input',
        'b-icon'
      ],
      mocks: {
        $toasted
      },
      propsData: {
        editMode: true,
        master: true
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

  test('initPage editMode', () => {
    wrapper.setProps({ editMode: true })
    const spy = jest.spyOn(wrapper.vm, 'getAssignmentDetail')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initPage add new', () => {
    wrapper.setProps({ editMode: false })
    wrapper.vm.initPage()
  })

  test('getAssignmentDetail', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchAssignmentDetail')
    wrapper.vm.getAssignmentDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingAssignmentDetail with no file', () => {
    const response = {
      id: 'ASG001',
      file: '',
      fileId: ''
    }
    wrapper.vm.successFetchingAssignmentDetail(response)
    expect(wrapper.vm.assignmentDetail).toEqual(response)
  })

  test('successFetchingAssignmentDetail with existing file', () => {
    const response = {
      id: 'ASG001',
      file: {
        name: 'Dummy File'
      },
      fileId: 'FL001'
    }
    wrapper.vm.successFetchingAssignmentDetail(response)
    expect(wrapper.vm.assignmentDetail).toEqual(response)
    expect(wrapper.vm.filePreviewName).toEqual('Dummy File')
  })

  test('failedFetchingAssignmentDetail', () => {
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'go')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedFetchingAssignmentDetail()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(routerSpy).toHaveBeenCalledTimes(1)
  })

  test('onFileChange', () => {
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

  test('onFileChange empty', () => {
    const spy = jest.spyOn(wrapper.vm, 'materialUpload')
    const e = {
      target: {
        files: []
      }
    }
    wrapper.vm.onFileChange(e)
    expect(spy).toHaveBeenCalledTimes(0)
  })

  test('materialUpload', () => {
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
    const response = {
      'id': 'sample-id',
      'name': 'File Name',
      'file': {
        'full': 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
        'thumbnail': null
      }
    }
    wrapper.vm.assignmentDetail.file.name = 'sample-file-name'
    wrapper.vm.successUploadMaterial(response)
    expect(wrapper.vm.assignmentDetail.fileId).toEqual(response.id)
    expect(wrapper.vm.filePreviewName).toEqual('sample-file-name')
  })

  test('failUploadMaterial', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failUploadMaterial()
    expect(wrapper.vm.filePreviewName).toEqual('Fail to upload file, please try again')
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('cancel', () => {
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'go')
    wrapper.vm.cancel()
    expect(routerSpy).toHaveBeenCalledTimes(1)
  })

  test('saveAssignment with editMode is true', () => {
    wrapper.setProps({ editMode: true })
    const spy = jest.spyOn(wrapper.vm, 'editAssignment')
    wrapper.vm.saveAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('saveAssignment with editMode is false', () => {
    wrapper.setProps({ editMode: false })
    const spy = jest.spyOn(wrapper.vm, 'addAssignment')
    wrapper.vm.saveAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('editAssignment without file', () => {
    const spy = jest.spyOn(wrapper.vm, 'updateAssignmentDetail')
    wrapper.vm.editAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('editAssignment with file', () => {
    wrapper.vm.assignmentDetail = {
      fileId: 'FILE001'
    }
    const spy = jest.spyOn(wrapper.vm, 'updateAssignmentDetail')
    wrapper.vm.addAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUpdatingAssignment', () => {
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$route.params.batchCode = 'futurre3'
    wrapper.vm.$route.params.assignmentId = 'ASG001'
    wrapper.vm.successUpdatingAssignment()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'assignmentDetail',
      params: {
        batchCode: 'futurre3',
        assignmentId: 'ASG001'
      }
    })
  })

  test('failedUpdatingAssignment', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedUpdatingAssignment()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('addAssignment without file', () => {
    const spy = jest.spyOn(wrapper.vm, 'createAssignment')
    wrapper.vm.addAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('addAssignment with file', () => {
    wrapper.vm.assignmentDetail = {
      fileId: 'FILE001'
    }
    const spy = jest.spyOn(wrapper.vm, 'createAssignment')
    wrapper.vm.addAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCreatingAssignment', () => {
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successCreatingAssignment()
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'questionBanks'
    })
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('failedCreatingAssignment', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedCreatingAssignment()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })
})
