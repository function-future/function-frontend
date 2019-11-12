import JudgingForm from '@/views/FinalJudging/JudgingForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import mavonEditor from 'mavon-editor'

describe('JudgingForm', () => {
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
      judging: {}
    }
    const actions = {
      fetchJudgingDetail: jest.fn(),
      createJudging: jest.fn(),
      updateJudging: jest.fn(),
      initialState: jest.fn()
    }
    const getters = {
      judging: state => state.judging
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
    return shallowMount(JudgingForm, {
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
    const spy = jest.spyOn(wrapper.vm, 'getJudgingDetail')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initPage add new', () => {
    wrapper.vm.editMode = false
    wrapper.vm.initPage()
  })

  test('getJudgingDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchJudgingDetail')
    wrapper.vm.getJudgingDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingJudgingDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'setJudgingDetail')
    wrapper.vm.successFetchingJudgingDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failedFetchingJudgingDetail', () => {
    initComponent()
    wrapper.vm.failedFetchingJudgingDetail()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('setJudgingDetail', () => {
    initComponent()
    wrapper.vm.setJudgingDetail()
    expect(wrapper.vm.judgingDetail).toEqual(wrapper.vm.judging)
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

  test('validateJudging', () => {
    const spy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.validateJudging()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess editMode false', () => {
    wrapper.vm.editMode = false
    const spy = jest.spyOn(wrapper.vm, 'createJudging')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess editMode true', () => {
    wrapper.vm.editMode = true
    wrapper.vm.updateJudgingDetail = jest.fn()
    const spy = jest.spyOn(wrapper.vm, 'updateJudgingDetail')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('createJudgingDetail', () => {
    const spy = jest.spyOn(wrapper.vm, 'createJudging')
    wrapper.vm.createJudgingDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCreatingJudgingDetail', () => {
    wrapper.vm.editMode = false
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreatingJudgingDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'judgingList' })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failedCreatingJudgingDetail', () => {
    wrapper.vm.editMode = false
    wrapper.vm.failedCreatingJudgingDetail()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('updateJudgingDetail', () => {
    const spy = jest.spyOn(wrapper.vm, 'updateJudging')
    wrapper.vm.judgingDetail = {
      students: [
        {
          id: '1',
          name: 'John'
        },
        {
          id: '2',
          name: 'Jane'
        },
        {
          id: '3',
          name: 'Doe'
        }
      ]
    }
    wrapper.vm.updateJudgingDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUpdatingJudgingDetail', () => {
    wrapper.vm.judgingDetail = {
      id: '1'
    }
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successUpdatingJudgingDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'judgingDetail',
      params: {
        id: '1'
      }
    })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failedUpdatingJudgingDetail', () => {
    wrapper.vm.failedUpdatingJudgingDetail()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('cancel', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'judgingList' })
  })

  test('removeStudentFromJudging', () => {
    wrapper.vm.judgingDetail = {
      students: [
        {
          id: '1',
          name: 'John'
        },
        {
          id: '2',
          name: 'Jane'
        },
        {
          id: '3',
          name: 'Doe'
        }
      ]
    }
    let student = {
      id: '1',
      name: 'John'
    }
    wrapper.vm.removeStudentFromJudging(student)
    expect(wrapper.vm.judgingDetail).toEqual({
      students: [
        {
          id: '2',
          name: 'Jane'
        },
        {
          id: '3',
          name: 'Doe'
        }
      ]
    })
  })

  test('toggleSelectStudentModal', () => {
    wrapper.vm.toggleSelectStudentModal()
    expect(wrapper.vm.showSelectStudentModal).toEqual(true)
  })

  test('closeSelectStudentModal', () => {
    wrapper.vm.closeSelectStudentModal()
    expect(wrapper.vm.showSelectStudentModal).toEqual(false)
  })

  test('setSelectedStudents', () => {
    const spy = jest.spyOn(wrapper.vm, 'closeSelectStudentModal')
    wrapper.vm.setSelectedStudents([
      {
        id: '1',
        name: 'John'
      },
      {
        id: '2',
        name: 'Jane'
      },
      {
        id: '3',
        name: 'Doe'
      }
    ])
    expect(wrapper.vm.judgingDetail).toEqual({
      students: [
        {
          id: '1',
          name: 'John'
        },
        {
          id: '2',
          name: 'Jane'
        },
        {
          id: '3',
          name: 'Doe'
        }
      ]
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
