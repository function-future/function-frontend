import JudgingDetail from '@/views/FinalJudging/JudgingDetail'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('JudgingDetail', () => {
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
    const state = {
      judging: {}
    }
    const actions = {
      updateJudging: jest.fn(),
      fetchJudgingDetail: jest.fn()
    }
    const getters = {
      judging: state => state.judging
    }
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
    return shallowMount(JudgingDetail, {
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

  test('successFetchingJudgingDetail', () => {
    initComponent()
    wrapper.vm.$store.state.judging = {
      "id": "FNC0001",
      "name": "Final Comparison 1",
      "description": "Final Comparison of Students",
      "batchCode": "3",
      "uploadedDate": 15000000000,
      "studentCount": 3,
      "students": [
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
    }
    wrapper.vm.judgingDetail = {
      name: '',
      description: '',
      students: []
    }
    wrapper.vm.successFetchingJudgingDetail()
    expect(wrapper.vm.judgingDetail).toEqual({
      "name": "Final Comparison 1",
      "description": "Final Comparison of Students",
      "students": [
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
    })
    expect(wrapper.vm.isLoading).toEqual(false)
  })

  test('failedFetchingJudgingDetail', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.failedFetchingJudgingDetail()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })

  test('goToComparison', () => {
    initComponent()
    wrapper.vm.$route.params.judgingId = 'FNC0001'
    const spy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.goToComparison()
    expect(spy).toHaveBeenCalledWith({
      name: 'comparison',
      params: {
        judgingId: 'FNC0001'
      }
    })
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

  test('actionButtonClicked editMode is true', () => {
    initComponent()
    wrapper.vm.editMode = true
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
    expect(store.actions.updateJudging).toBeCalledTimes(1)
    expect(wrapper.vm.editMode).toEqual(false)
  })

  test('actionButtonClicked editMode is false', () => {
    initComponent()
    wrapper.vm.editMode = false
    wrapper.vm.actionButtonClicked()
    expect(store.actions.updateJudging).not.toBeCalled()
    expect(wrapper.vm.editMode).toEqual(true)
  })

  test('returnButtonClicked editMode is true', () => {
    initComponent()
    wrapper.vm.editMode = true
    wrapper.vm.returnButtonClicked()
    expect(wrapper.vm.editMode).toEqual(false)
  })

  test('returnButtonClicked editMode is false', () => {
    initComponent()
    wrapper.vm.$route.params.batchCode = '1'
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.editMode = false
    wrapper.vm.returnButtonClicked()
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'judgingList',
      params: {
        batchCode: '1'
      }
    })
  })

  test('successUpdatingJudging', () => {
    initComponent()
    wrapper.vm.$route.params.batchCode = '1'
    const spy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.successUpdatingJudging()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith({
      name: 'judgingList',
      params: {
        batchCode: '1'
      }
    })

  })

  test('failUpdatingJudging', () => {
    initComponent()
    wrapper.vm.failUpdatingJudging()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })
})
