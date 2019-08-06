import AddJudging from '@/views/FinalJudging/AddJudging'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('AddJudging', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore () {
    const state = {}
    const actions = {
      createJudging: jest.fn()
    }
    const getters = {}
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
    return shallowMount(AddJudging, {
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
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('toggleSelectStudentModal', () => {
    initComponent()
    wrapper.vm.toggleSelectStudentModal()
    expect(wrapper.vm.showSelectStudentModal).toEqual(true)
  })

  test('closeSelectStudentModal', () => {
    initComponent()
    wrapper.vm.closeSelectStudentModal()
    expect(wrapper.vm.showSelectStudentModal).toEqual(false)
  })

  test('setSelectedStudents', () => {
    initComponent()
    const selectedStudents = []
    const spy = jest.spyOn(wrapper.vm, 'closeSelectStudentModal')
    wrapper.vm.setSelectedStudents(selectedStudents)
    expect(wrapper.vm.selectedStudents).toEqual(selectedStudents)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('actionButtonClicked', () => {
    initComponent()
    wrapper.vm.selectedStudents = [
      {
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
      },
      {
        'id': 'sample-id-2',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 2',
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
    ]
    wrapper.vm.actionButtonClicked()
    expect(wrapper.vm.judgingDetail.students).toEqual([
      'sample-id-student',
      'sample-id-2'
    ])
    expect(store.actions.createJudging).toBeCalledTimes(1)
  })

  test('returnButtonClicked', () => {
    initComponent()
    wrapper.vm.$route.params.batchCode = '1'
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.returnButtonClicked()
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'judgingList',
      params: {
        batchCode: '1'
      }
    })
  })

  test('successCreatingJudging', () => {
    initComponent()
    wrapper.vm.$route.params.batchCode = '1'
    const spy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.successCreatingJudging()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      name: 'judgingList',
      params: {
        batchCode: '1'
      }
    })

  })

  test('failCreatingJudging', () => {
    initComponent()
    wrapper.vm.failCreatingJudging()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })
})
