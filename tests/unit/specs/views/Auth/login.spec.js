import Login from '@/views/Auth/Login'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

describe('Login', () => {
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
      currentUser: {
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Name',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    }
    const actions = {
      attemptLogin: jest.fn()
    }
    const getters = {
      currentUser: state => state.currentUser
    }
    const store = new Vuex.Store({
      modules: {
        auth: {
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
    return shallowMount(Login, {
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

  test('back', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.back()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'feeds' })
  })

  test('login', () => {
    const spy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.login()
    expect(wrapper.vm.loggingIn).toEqual(true)
    expect(spy).toHaveBeenCalledTimes(1)
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

  test('validationSuccess', () => {
    const spy = jest.spyOn(wrapper.vm, 'attemptLogin')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successLogin', (done) => {
    const spy = jest.spyOn(wrapper.vm, 'redirectAfterLogin')
    wrapper.vm.successLogin()
    expect(wrapper.vm.loginSuccess).toEqual(true)
    setTimeout(() => {
      wrapper.vm.$nextTick(() => {
        expect(spy).toHaveBeenCalledTimes(1)
        done()
      })
    }, 1000)
  })

  test('redirectAfterLogin', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.redirectAfterLogin()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('failLogin', (done) => {
    const spy = jest.spyOn(wrapper.vm, 'showFailMessage')
    wrapper.vm.failLogin()
    setTimeout(() => {
      wrapper.vm.$nextTick(() => {
        expect(spy).toHaveBeenCalledTimes(1)
        done()
      })
    }, 1000)
  })

  test('showFailMessage', () => {
    wrapper.vm.showFailMessage()
    expect(wrapper.vm.loggingIn).toEqual(false)
    expect(wrapper.vm.errorAlert).toEqual('You have entered an invalid email or password')
  })
})
