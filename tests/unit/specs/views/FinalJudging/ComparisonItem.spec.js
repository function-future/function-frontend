import ComparisonItem from '@/views/FinalJudging/ComparisonItem'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ComparisonItem', () => {
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
      accessList: {}
    }
    const actions = {
      fetchPointList : jest.fn(),
      submitScore: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      state,
      actions,
      getters,
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
    return shallowMount(ComparisonItem, {
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
        studentData: {}
      },
      mocks: {
        $toasted: {
          success: jest.fn(),
          error: jest.fn()
        }
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

  test('computed studentId', () => {
    initComponent()
    wrapper.vm.studentData = {
      id: '1',
      name: 'John'
    }
    expect(wrapper.vm.studentId).toEqual('1')
  })

  test('computed scoreList', () => {
    initComponent()
    wrapper.vm.pointData = {
      scores: [
        {
          id: 'ASG001',
          point: 10
        },
        {
          id: 'ASG002',
          point: 20
        }
      ]
    }
    expect(wrapper.vm.scoreList).toEqual([
      {
        id: 'ASG001',
        point: 10
      },
      {
        id: 'ASG002',
        point: 20
      }
    ])
  })

  test('resetPage', () => {
    initComponent()
    wrapper.vm.resetPage()
    expect(wrapper.vm.paging).toEqual({
      page: 1,
      size: 10,
      totalRecords: 10
    })
    expect(wrapper.vm.pointData).toEqual({})
    expect(wrapper.vm.state).toEqual('')
  })

  test('getPointsData', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchPointList')
    wrapper.vm.getPointsData()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingPointList with no finalScore and last page', () => {
    initComponent()
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.finalScore = ''
    wrapper.vm.successFetchingPointList({
      scores: [],
      point: 10
    })
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.finalScore).toEqual(10)
  })

  test('successFetchingPointList with finalScore not empty and not last page', () => {
    initComponent()
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.paging = {
      page: 1
    }
    wrapper.vm.finalScore = 30
    wrapper.vm.successFetchingPointList({
      scores: [{
        id: 'ASG001',
        point: 80
      }],
      point: 10,
      paging: {
        page: 1,
        size: 10,
        totalRecords: 20
      }
    })
    expect(wrapper.vm.paging.page).toEqual(2)
    expect(wrapper.vm.state.loaded).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.finalScore).toEqual(30)
  })

  test('failFetchingPointList', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.failFetchingPointList()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })

  test('submitFinalScore', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'submitScore')
    wrapper.vm.submitFinalScore()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successSubmittingScore', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successSubmittingScore()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failedSubmittingScore', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedSubmittingScore()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('closeScoreModal', () => {
    initComponent()
    wrapper.vm.closeScoreModal()
    expect(wrapper.vm.isMobileScoreModalVisible).toEqual(false)
  })

  test('getFinalScoreFromModal', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'submitFinalScore')
    wrapper.vm.getFinalScoreFromModal(10)
    expect(wrapper.vm.finalScore).toEqual(10)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('watch activeTab', (done) => {
    initComponent()
    wrapper.vm.activeTab = 2
    const resetSpy = jest.spyOn(wrapper.vm, 'resetPage')
    wrapper.vm.$nextTick(() => {
      expect(resetSpy).toHaveBeenCalledTimes(1)
      done()
    })
  })
})
