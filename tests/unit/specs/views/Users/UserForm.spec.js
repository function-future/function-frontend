import UserForm from '@/views/Users/UserForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

describe('UserForm', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
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
      fetchUserById: jest.fn()
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
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(UserForm, {
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
      propsData: {
        editMode: true
      },
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
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage editMode false', () => {
    const initialStateSpy = jest.spyOn(UserForm.methods, 'initialState')
    initComponent()
    wrapper.vm.editMode = false
    wrapper.vm.initPage()
    expect(initialStateSpy).toHaveBeenCalledTimes(2)
  })

  test('initPage editMode true', () => {
    const spy = jest.spyOn(UserForm.methods, 'initialState')
    const getUserDetailSpy = jest.spyOn(UserForm.methods, 'getUserDetail')
    initComponent()
    wrapper.vm.editMode = true
    wrapper.vm.initPage()
    expect(wrapper.vm.isLoading).toEqual(true)
    expect(spy).toHaveBeenCalledTimes(2)
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
    wrapper.vm.failFetchUserById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('setUserDetail', () => {
    initComponent()
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
    wrapper.vm.failUploadProfilePicture()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
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

  test('sendData not editMode', () => {
    initComponent()
    wrapper.vm.editMode = false
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
    wrapper.vm.editMode = false
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreateOrEditUser()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'users' })
  })

  test('successCreateOrEditUser editMode true', () => {
    initComponent()
    wrapper.vm.editMode = true
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreateOrEditUser()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'users' })
  })

  test('failCreateOrEditUser editMode false', () => {
    initComponent()
    wrapper.vm.editMode = false
    wrapper.vm.failCreateOrEditUser()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('failCreateOrEditUser editMode true', () => {
    initComponent()
    wrapper.vm.editMode = true
    wrapper.vm.failCreateOrEditUser()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('selectBatch', () => {
    initComponent()
    wrapper.vm.selectBatch('futur3')
    expect(wrapper.vm.userDetail.batch.code).toEqual('futur3')
    expect(wrapper.vm.showSelectBatchModal).toEqual(false)
  })

  test('closeModal', () => {
    initComponent()
    wrapper.vm.closeModal()
    expect(wrapper.vm.showSelectBatchModal).toEqual(false)
  })
})
