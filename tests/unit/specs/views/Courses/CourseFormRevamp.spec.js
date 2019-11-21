import CourseForm from '@/views/Courses/CourseFormRevamp'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import mavonEditor from 'mavon-editor'

describe('CourseForm Revamp', () => {
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
      }
    }
    const actions = {
      fetchCourseById: jest.fn(),
      fetchMasterCourseById: jest.fn(),
      createCourse: jest.fn(),
      createMasterCourse: jest.fn(),
      updateCourse: jest.fn(),
      updateMasterCourse: jest.fn(),
      uploadMaterial: jest.fn(),
      toast: jest.fn()
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
    const router = new VueRouter([])
    return shallowMount(CourseForm, {
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

  test('computed courseMaterialId materialId null', () => {
    wrapper.vm.courseData.materialId = null
    expect(wrapper.vm.courseMaterialId).toEqual([])
  })

  test('computed courseMaterialId materialId not null', () => {
    wrapper.vm.courseData.materialId = 'sample-id'
    expect(wrapper.vm.courseMaterialId).toEqual(['sample-id'])
  })

  test('computed message editMode true', () => {
    wrapper.setProps({ editMode: true })
    expect(wrapper.vm.message).toEqual('edit')
  })

  test('computed message editMode false', () => {
    wrapper.setProps({ editMode: false })
    expect(wrapper.vm.message).toEqual('create new')
  })

  test('computed courseType master', () => {
    wrapper.setProps({ master: true })
    expect(wrapper.vm.courseType).toEqual(' master course')
  })

  test('computed courseType batch', () => {
    wrapper.setProps({ master: false })
    expect(wrapper.vm.courseType).toEqual(' course')
  })

  test('initPage editMode', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchData')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initPage add new', () => {
    wrapper.setProps({ editMode: false })
    wrapper.vm.initPage()
  })

  test('fetchData master', () => {
    wrapper.setProps({ master: true })
    const spy = jest.spyOn(wrapper.vm, 'fetchMasterCourse')
    wrapper.vm.fetchData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('fetchData batch', () => {
    wrapper.setProps({ master: false })
    const spy = jest.spyOn(wrapper.vm, 'fetchCourse')
    wrapper.vm.fetchData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('fetchMasterCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchMasterCourseById')
    wrapper.vm.fetchMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('fetchCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchCourseById')
    wrapper.vm.fetchCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchById', () => {
    const response = { material: 'material' }
    wrapper.vm.successFetchById(response)
    expect(wrapper.vm.courseData).toEqual(response)
    expect(wrapper.vm.filePreviewName).toEqual(response.material)
  })

  test('successFetchById no material', () => {
    const response = 'material'
    wrapper.vm.successFetchById(response)
    expect(wrapper.vm.courseData).toEqual(response)
    expect(wrapper.vm.filePreviewName).toEqual('No file uploaded')
  })

  test('failFetchById', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchById()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to load course detail, please refresh the page',
        type: 'is-danger'
      }
    })
  })

  test('validateBeforeSubmit is resolved', (done) => {
    const callback = jest.fn()
    wrapper.vm.$validator.validateAll = jest.fn().mockResolvedValue(true)
    wrapper.vm.validateBeforeSubmit(callback)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$validator.validateAll).toHaveBeenCalledTimes(1)
      done()
    })
  })

  test('validateBeforeSubmit is rejected', () => {
    const callback = jest.fn()
    wrapper.vm.validateBeforeSubmit(() => {})
    expect(callback).toHaveBeenCalledTimes(0)
  })

  test('sendCourse', () => {
    const validateSpy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.sendCourse()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess master', () => {
    wrapper.setProps({ master: true })
    const spy = jest.spyOn(wrapper.vm, 'submitMasterCourse')
    wrapper.vm.validationSuccess()
    expect(wrapper.vm.isSubmitting).toEqual(true)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess batch', () => {
    wrapper.setProps({ master: false })
    const spy = jest.spyOn(wrapper.vm, 'submitCourse')
    wrapper.vm.validationSuccess()
    expect(wrapper.vm.isSubmitting).toEqual(true)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitMasterCourse editMode true', () => {
    wrapper.setProps({ editMode: true })
    const spy = jest.spyOn(wrapper.vm, 'submitUpdateMasterCourse')
    wrapper.vm.submitMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitMasterCourse editMode false', () => {
    wrapper.setProps({ editMode: false })
    const spy = jest.spyOn(wrapper.vm, 'submitCreateMasterCourse')
    wrapper.vm.submitMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitCourse editMode true', () => {
    wrapper.setProps({ editMode: true })
    const spy = jest.spyOn(wrapper.vm, 'submitUpdateCourse')
    wrapper.vm.submitCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitCourse editMode false', () => {
    wrapper.setProps({ editMode: false })
    const spy = jest.spyOn(wrapper.vm, 'submitCreateCourse')
    wrapper.vm.submitCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitUpdateMasterCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'updateMasterCourse')
    wrapper.vm.submitUpdateMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitCreateMasterCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'createMasterCourse')
    wrapper.vm.submitCreateMasterCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitUpdateCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'updateCourse')
    wrapper.vm.submitUpdateCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitCreateCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'createCourse')
    wrapper.vm.submitCreateCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCreateOrEditCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'backToCourseList')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successCreateOrEditCourse()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isSubmitting).toEqual(false)
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })

  test('failCreateOrEditCourse', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failCreateOrEditCourse()
    expect(wrapper.vm.isSubmitting).toEqual(false)
    expect(toastSpy).toHaveBeenCalledTimes(1)
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
    wrapper.vm.file.name = 'sample-file-name'
    wrapper.vm.successUploadMaterial(response)
    expect(wrapper.vm.uploadingFile).toEqual(false)
    expect(wrapper.vm.courseData.materialId).toEqual(response.id)
    expect(wrapper.vm.filePreviewName).toEqual('sample-file-name')
  })

  test('failUploadMaterial', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failUploadMaterial()
    expect(wrapper.vm.uploadingFile).toEqual(false)
    expect(wrapper.vm.filePreviewName).toEqual('Fail to upload material, please try again')
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to upload material, please try again',
        type: 'is-danger'
      }
    })
  })

  test('cancel when editMode true', () => {
    wrapper.setProps({ editMode: true })
    const spy = jest.spyOn(wrapper.vm, 'backToDetail')
    wrapper.vm.cancel()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('cancel when editMode false', () => {
    wrapper.setProps({ editMode: false })
    const spy = jest.spyOn(wrapper.vm, 'backToCourseList')
    wrapper.vm.cancel()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('backToDetail master', () => {
    wrapper.setProps({ master: true })
    const spy = jest.spyOn(wrapper.vm, 'backToMasterCourseDetail')
    wrapper.vm.backToDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('backToDetail batch', () => {
    wrapper.setProps({ master: false })
    const spy = jest.spyOn(wrapper.vm, 'backToCourseDetail')
    wrapper.vm.backToDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('backToCourseDetail', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.params.id = 'sample-id-1'
    wrapper.vm.$route.params.code = 'sample-code-1'
    wrapper.vm.backToCourseDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courseDetail',
      params: {
        code: wrapper.vm.$route.params.code,
        id: wrapper.vm.$route.params.id
      }
    })
  })

  test('backToMasterCourseDetail', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.params.id = 'sample-id-1'
    wrapper.vm.backToMasterCourseDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'masterCourseDetail',
      params: { id: wrapper.vm.$route.params.id }
    })
  })

  test('backToCourseList master', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.setProps({ master: true })
    wrapper.vm.backToCourseList()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courses',
      query: { tab: 'master' }
    })
  })

  test('backToCourseList batch', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.setProps({ master: false })
    wrapper.vm.backToCourseList()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courses',
      query: { tab: 'batch' }
    })
  })
})
