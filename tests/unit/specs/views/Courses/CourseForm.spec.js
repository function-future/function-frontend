import CourseForm from '@/views/Courses/CourseForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import mavonEditor from 'mavon-editor'

describe('CourseForm', () => {
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
      ]
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
    return shallowMount(CourseForm, {
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
      propsData: {
        editMode: true
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
    const spy = jest.spyOn(wrapper.vm, 'fetchCourse')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initPage add new', () => {
    wrapper.vm.editMode = false
    wrapper.vm.initPage()
  })

  test('fetchCourse', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchCourseById')
    wrapper.vm.fetchCourse()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchCourseById', () => {
    wrapper.vm.successFetchCourseById()
    expect(wrapper.vm.courseData).toEqual(wrapper.vm.course)
    expect(wrapper.vm.filePreviewName).toEqual(wrapper.vm.course.material)
  })

  test('failFetchCourseById', () => {
    wrapper.vm.failFetchCourseById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
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

  test('validationSuccess editMode false', () => {
    wrapper.vm.editMode = false
    const spy = jest.spyOn(wrapper.vm, 'createCourse')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess editMode true', () => {
    wrapper.vm.editMode = true
    const spy = jest.spyOn(wrapper.vm, 'updateCourse')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCreateOrEditCourse', () => {
    wrapper.vm.$route.params.code = 'code-1'
    wrapper.vm.editMode = false
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreateOrEditCourse()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courses',
      params: {
        code: wrapper.vm.$route.params.code
      }
    })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('successCreateOrEditCourse editMode', () => {
    wrapper.vm.$route.params.code = 'code-1'
    wrapper.vm.editMode = true
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreateOrEditCourse()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courses',
      params: {
        code: wrapper.vm.$route.params.code
      }
    })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failCreateOrEditCourse', () => {
    wrapper.vm.editMode = false
    wrapper.vm.failCreateOrEditCourse()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('failCreateOrEditCourse editMode', () => {
    wrapper.vm.editMode = true
    wrapper.vm.failCreateOrEditCourse()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
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
    expect(wrapper.vm.courseData.material).toEqual([ response.id ])
    expect(wrapper.vm.filePreviewName).toEqual('sample-file-name')
  })

  test('failUploadMaterial', () => {
    wrapper.vm.failUploadMaterial()
    expect(wrapper.vm.uploadingFile).toEqual(false)
    expect(wrapper.vm.filePreviewName).toEqual('Fail to upload material, please try again')
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('cancel when editMode true', () => {
    wrapper.vm.editMode = true
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.params.id = 'sample-id-1'
    wrapper.vm.$route.params.code = 'sample-code-1'
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courseDetail',
      params: {
        code: wrapper.vm.$route.params.code,
        id: wrapper.vm.$route.params.id
      }
    })
  })

  test('cancel when editMode false', () => {
    wrapper.vm.editMode = false
    wrapper.vm.$route.params.code = 'sample-code-1'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'courses',
      params: { code: wrapper.vm.$route.params.code }
    })
  })
})
