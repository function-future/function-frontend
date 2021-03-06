import ChangePassword from '@/views/User/ChangePassword'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

describe('ChangePassword', () => {
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
      fetchProfile: jest.fn(),
      changePassword: jest.fn(),
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
    return shallowMount(ChangePassword, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'b-field',
        'b-notification',
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

  test('save', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.save()
    expect(spy).toHaveBeenCalledTimes(1)
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

  test('validateBeforeSubmit is rejected', () => {
    initComponent()
    const callback = jest.fn()
    wrapper.vm.validateBeforeSubmit(() => {})
    expect(callback).toHaveBeenCalledTimes(0)
  })

  test('validationSuccess', () => {
    const spy = jest.spyOn(wrapper.vm, 'changePassword')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failChangePassword old password not valid', () => {
    const error = {
      response: {
        status: 401
      }
    }
    initComponent()
    wrapper.vm.failChangePassword(error)
    expect(wrapper.vm.showErrorMessage).toEqual(true)
  })

  test('failChangePassword', () => {
    const error = {
      response: {
        status: 500
      }
    }
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failChangePassword(error)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to update password',
        type: 'is-danger'
      }
    })
  })

  test('successChangePassword mobile', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.setProps({ mobile: true })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successChangePassword()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'account' })
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully updated password',
        type: 'is-success'
      }
    })
  })

  test('successChangePassword not mobile', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.setProps({ mobile: false })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successChangePassword()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'profile' })
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully updated password',
        type: 'is-success'
      }
    })
  })

  test('cancel mobile', () => {
    initComponent()
    wrapper.setProps({ mobile: true })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'account' })
  })

  test('cancel not mobile', () => {
    initComponent()
    wrapper.setProps({ mobile: false })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'profile' })
  })
})
