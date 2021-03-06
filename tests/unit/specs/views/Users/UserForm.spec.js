import UserForm from '@/views/Users/UserForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'

describe('UserForm', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VeeValidate)
    return lv
  }

  function initStore () {
    const state = {
      user: {
        'id': 'sample-id-student',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      }
    }
    const actions = {
      initialState: jest.fn(),
      fetchUserById: jest.fn(),
      fetchBatches: jest.fn(),
      uploadProfilePicture: jest.fn(),
      updateUser: jest.fn(),
      createUser: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      user: state => state.user
    }
    const store = new Vuex.Store({
      modules: {
        users: {
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
    const $route = {
      params: { id: 'id' },
      query: { role: 'ADMIN' }
    }
    const $router = {
      push: jest.fn()
    }
    return shallowMount(UserForm, {
      ...options,
      store,
      localVue,
      stubs: [
        'b-loading',
        'b-field',
        'b-input',
        'b-select',
        'b-button'
      ],
      propsData: {
        editMode: true
      },
      mocks: {
        $route,
        $router
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
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage editMode false', () => {
    const initialStateSpy = jest.spyOn(UserForm.methods, 'initialState')
    const setSelectedRoleBasedOnQueryParamSpy = jest.spyOn(UserForm.methods, 'setSelectedRoleBasedOnQueryParam')
    initComponent()
    wrapper.setProps({ editMode: false })
    wrapper.vm.initPage()
    expect(initialStateSpy).toHaveBeenCalledTimes(2)
    expect(setSelectedRoleBasedOnQueryParamSpy).toHaveBeenCalledTimes(2)
  })

  test('initPage editMode true', () => {
    const spy = jest.spyOn(UserForm.methods, 'initialState')
    const setSelectedRoleBasedOnQueryParamSpy = jest.spyOn(UserForm.methods, 'setSelectedRoleBasedOnQueryParam')
    const getUserDetailSpy = jest.spyOn(UserForm.methods, 'getUserDetail')
    initComponent()
    wrapper.setProps({ editMode: true })
    wrapper.vm.initPage()
    expect(wrapper.vm.isLoading).toEqual(true)
    expect(spy).toHaveBeenCalledTimes(2)
    expect(setSelectedRoleBasedOnQueryParamSpy).toHaveBeenCalledTimes(2)
    expect(getUserDetailSpy).toHaveBeenCalledTimes(2)
  })

  test('getUserDetail', () => {
    const spy = jest.spyOn(UserForm.methods, 'fetchUserById')
    initComponent()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchUserById', () => {
    const spy = jest.spyOn(UserForm.methods, 'setUserDetail')
    initComponent()
    wrapper.vm.successFetchUserById()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failFetchUserById', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchUserById()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to load user detail',
        type: 'is-danger'
      }
    })
  })

  test('setUserDetail with avatar', () => {
    initComponent()
    store.state.user.avatar = 'asdasdsada.jpg'
    wrapper.vm.setUserDetail()
    expect(wrapper.vm.userDetail).toEqual(store.state.user)
  })

  test('setUserDetail no avatar', () => {
    initComponent()
    store.state.user.avatar = ''
    wrapper.vm.setUserDetail()
    expect(wrapper.vm.userDetail).toEqual(store.state.user)
  })

  test('imageUpload', () => {
    const spy = jest.spyOn(UserForm.methods, 'uploadProfilePicture')
    initComponent()
    wrapper.vm.imageUpload()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUploadProfilePicture', () => {
    const response = {
      'id': 'sample-id',
      'name': 'File Name',
      'file': {
        'full': 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
        'thumbnail': null
      }
    }
    initComponent()
    wrapper.vm.successUploadProfilePicture(response)
    expect(wrapper.vm.userDetail.avatarId).toEqual(response.id)
    expect(wrapper.vm.avatarPreview).toEqual(response.file.full)
  })

  test('failUploadProfilePicture', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failUploadProfilePicture()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to upload image, please try again',
        type: 'is-danger'
      }
    })
  })

  test('cancel', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'users' })
  })

  test('validateBeforeSubmit is resolved', (done) => {
    initComponent()
    const callback = jest.fn()
    wrapper.vm.$validator.validateAll = jest.fn().mockResolvedValue(true)
    wrapper.vm.validateBeforeSubmit(callback)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$validator.validateAll).toHaveBeenCalledTimes(1)
      done()
    })
  })

  test('validateBeforeSubmit is resolved false', (done) => {
    initComponent()
    const callback = jest.fn()
    wrapper.vm.$validator.validateAll = jest.fn().mockResolvedValue(false)
    wrapper.vm.validateBeforeSubmit(callback)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$validator.validateAll).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledTimes(0)
      done()
    })
  })

  test('validateBeforeSubmit is rejected', () => {
    const callback = jest.fn()
    initComponent()
    wrapper.vm.validateBeforeSubmit(() => {})
    expect(callback).toHaveBeenCalledTimes(0)
  })

  test('save', () => {
    initComponent()
    const validateSpy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.save()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'sendData')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess studentMode', () => {
    initComponent()
    wrapper.vm.studentMode = true
    const spy = jest.spyOn(wrapper.vm, 'sendData')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('userAvatarId avatarId null', () => {
    initComponent()
    wrapper.vm.userDetail.avatarId = null
    expect(wrapper.vm.userAvatarId).toEqual([])
  })

  test('userAvatarId avatarId not null', () => {
    initComponent()
    wrapper.vm.userDetail.avatarId = 'sample-id'
    expect(wrapper.vm.userAvatarId).toEqual(['sample-id'])
  })

  test('roleFromQueryParam has query', () => {
    initComponent()
    wrapper.vm.$route.query.role = 'ADMIN'
    expect(wrapper.vm.roleFromQueryParam).toEqual('ADMIN')
  })

  test('roleFromQueryParam no query', () => {
    initComponent()
    wrapper.vm.$route.query = {}
    expect(wrapper.vm.roleFromQueryParam).toEqual(null)
  })

  test('sendData not editMode', () => {
    initComponent()
    wrapper.setProps({ editMode: false })
    const spy = jest.spyOn(wrapper.vm, 'createUser')
    wrapper.vm.sendData({})
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('onFileChange image <= 1 MB', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'imageUpload')
    const e = {
      target: {
        files: [
          {
            name: 'test.png',
            size: 10000,
            type: 'image/png'
          }
        ]
      }
    }
    wrapper.vm.onFileChange(e)
    expect(wrapper.vm.maximumSizeAlert).toEqual(false)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('onFileChange image > 1 MB', () => {
    initComponent()
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
    expect(wrapper.vm.maximumSizeAlert).toEqual(true)
  })

  test('successCreateOrEditUser editMode false', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.setProps({ editMode: false })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreateOrEditUser()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'users' })
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully created new user',
        type: 'is-success'
      }
    })
  })

  test('successCreateOrEditUser editMode true', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.setProps({ editMode: true })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreateOrEditUser()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'users' })
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully save edited user',
        type: 'is-success'
      }
    })
  })

  test('failCreateOrEditUser editMode false', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.setProps({ editMode: false })
    wrapper.vm.failCreateOrEditUser()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to create new user',
        type: 'is-danger'
      }
    })
  })

  test('failCreateOrEditUser editMode true', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.setProps({ editMode: true })
    wrapper.vm.failCreateOrEditUser()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to save edited user',
        type: 'is-danger'
      }
    })
  })

  test('initBatches', () => {
    const spy = jest.spyOn(UserForm.methods, 'fetchBatches')
    initComponent()
    wrapper.vm.initBatches()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('successFetchBatches', () => {
    const response = 'response'
    initComponent()
    wrapper.vm.successFetchBatches(response)
    expect(wrapper.vm.isFetchingBatches).toEqual(false)
    expect(wrapper.vm.batches).toEqual(response)
  })

  test('failFetchBatches', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchBatches()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to fetch batches, please try again',
        type: 'is-danger'
      }
    })
  })

  test('setSelectedRoleBasedOnQueryParam editMode true', () => {
    initComponent()
    wrapper.setProps({ editMode: true })
    wrapper.vm.setSelectedRoleBasedOnQueryParam()
  })

  test('setSelectedRoleBasedOnQueryParam editMode false', () => {
    initComponent()
    wrapper.setProps({ editMode: false })
    wrapper.vm.setSelectedRoleBasedOnQueryParam()
    expect(wrapper.vm.userDetail.role).toEqual(wrapper.vm.$route.query.role)
  })
})
