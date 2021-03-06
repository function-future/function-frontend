import Profile from '@/views/User/Profile'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

describe('Profile', () => {
  let store
  let wrapper
  let localVue
  let usersState = {
    profile: {
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

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(VeeValidate)
    return lv
  }

  function initStore () {
    const state = usersState
    const actions = {
      fetchProfile: jest.fn(),
      uploadProfilePicture: jest.fn(),
      sendProfilePictureId: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      profile: state => state.profile
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
    return shallowMount(Profile, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'b-field',
        'b-input',
        'b-button'
      ],
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchProfile')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchProfile', () => {
    initComponent()
    wrapper.vm.successFetchProfile()
    expect(wrapper.vm.avatarPreview).toEqual('https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png')
  })

  test('successFetchProfile no avatar', () => {
    usersState = {
      profile: {
        'id': 'sample-id-student',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': null,
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      }
    }
    initComponent()
    wrapper.vm.successFetchProfile()
    expect(wrapper.vm.avatarPreview).toEqual('')
  })

  test('failFetchProfile', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchProfile()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to load profile',
        type: 'is-danger'
      }
    })
  })

  test('goToChangePassword', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToChangePassword()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'changePassword' })
  })

  test('onFileChange image > 1MB', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'imageUpload')
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

  test('successUploadProfilePicture', () => {
    const response = {
      file: {
        full: 'image'
      }
    }
    initComponent()
    wrapper.vm.successUploadProfilePicture(response)
    expect(wrapper.vm.newAvatar).toEqual(response)
    expect(wrapper.vm.uploadingProfilePicture).toEqual(false)
    expect(wrapper.vm.changeProfilePictureConfirmation).toEqual(true)
  })

  test('failUploadProfilePicture', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failUploadProfilePicture()
    expect(wrapper.vm.uploadingProfilePicture).toEqual(false)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to upload image, please try again',
        type: 'is-danger'
      }
    })
  })

  test('imageUpload', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'uploadProfilePicture')
    wrapper.vm.imageUpload()
    expect(wrapper.vm.uploadingProfilePicture).toEqual(true)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('sendUpdatedProfilePictureId', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'sendProfilePictureId')
    wrapper.vm.sendUpdatedProfilePictureId()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.updatingProfilePicture).toEqual(true)
  })

  test('successSendProfilePictureId', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.successSendProfilePictureId()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.updatingProfilePicture).toEqual(false)
    expect(wrapper.vm.changeProfilePictureConfirmation).toEqual(false)
  })

  test('failSendProfilePictureId', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failSendProfilePictureId()
    expect(wrapper.vm.updatingProfilePicture).toEqual(false)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to save new profile picture, please try again',
        type: 'is-danger'
      }
    })
  })

  test('cancelChangeProfilePicture', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.cancelChangeProfilePicture()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.changeProfilePictureConfirmation).toEqual(false)
  })
})
