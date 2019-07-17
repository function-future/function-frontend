import Profile from '@/views/User/Profile'
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
    const actions = {
      fetchProfile: jest.fn()
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
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(Profile, {
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

  test('failFetchProfile', () => {
    initComponent()
    wrapper.vm.failFetchProfile()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
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
  })

  test('failUploadProfilePicture', () => {
    initComponent()
    wrapper.vm.failUploadProfilePicture()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })

  test('imageUpload', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'uploadProfilePicture')
    wrapper.vm.imageUpload()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('sendUpdatedProfilePictureId', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'sendProfilePictureId')
    wrapper.vm.sendUpdatedProfilePictureId()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successSendProfilePictureId', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.successSendProfilePictureId()
    expect(wrapper.vm.showModalChangeProfilePicture).toEqual(false)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failSendProfilePictureId', () => {
    initComponent()
    wrapper.vm.failSendProfilePictureId()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })
})
