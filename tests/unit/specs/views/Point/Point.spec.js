import Point from '@/views/Point/Point'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Users', () => {
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
      points: {},
      currentUser: {}
    }
    const actions = {
      fetchPointList: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      points: state => state.points,
      currentUser: state => state.currentUser
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
    return shallowMount(Point, {
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

  test('activeTabType for quiz', () => {
    initComponent()
    wrapper.vm.activeTab = 0
    expect(wrapper.vm.activeTabType).toEqual('quiz')
  })

  test('activeTabType for assignemnt', () => {
    initComponent()
    wrapper.vm.activeTab = 1
    expect(wrapper.vm.activeTabType).toEqual('assignment')
  })

  test('resetPage', () => {
    initComponent()
    wrapper.vm.resetPage()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.pointList).toEqual([])
    expect(wrapper.vm.state).toEqual('')
    expect(wrapper.vm.paging).toEqual({
      page: 1,
      size: 10,
      totalRecords: 20
    })
  })

  test('initPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchPointList')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingPointList with response not yet empty', () => {
    initComponent()
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    const response = {
      "studentId":"5d57dbdbcea33323287dd393",
      "studentName":"Jonathan",
      "batchCode":"futurre3",
      "university":"BINUS",
      "avatar":"http://localhost:8080/api/core/resources/user/561a2bf6-ce6f-44ae-aab2-3d9121353566.png",
      "point":100,
      "totalPoint":215,
      "paging":{
        "page":1,
        "size":10,
        "totalRecords":8
      },
      "scores":[
        {
          "type":"QUIZ",
          "title":"Basic Vue.js and Springboot Quiz",
          "point":83
        },
        {
          "type":"QUIZ",
          "title":"Blibli.com Quiz",
          "point":0
        },
        {
          "type":"QUIZ",
          "title":"HTML Quiz",
          "point":0
        },
        {
          "type":"QUIZ",
          "title":"Quiz #1",
          "point":40
        },
        {
          "type":"QUIZ",
          "title":"New Quiz",
          "point":0
        },
        {
          "type":"QUIZ",
          "title":"Test quiz to DB",
          "point":0
        },
        {
          "type":"QUIZ",
          "title":"New Quiz",
          "point":0
        },
        {
          "type":"QUIZ",
          "title":"New Quiz",
          "point":92
        }
      ]
    }
    wrapper.vm.successFetchingPointList(response)
    expect(wrapper.vm.pointList).toEqual([
      {
        "type":"QUIZ",
        "title":"Basic Vue.js and Springboot Quiz",
        "point":83
      },
      {
        "type":"QUIZ",
        "title":"Blibli.com Quiz",
        "point":0
      },
      {
        "type":"QUIZ",
        "title":"HTML Quiz",
        "point":0
      },
      {
        "type":"QUIZ",
        "title":"Quiz #1",
        "point":40
      },
      {
        "type":"QUIZ",
        "title":"New Quiz",
        "point":0
      },
      {
        "type":"QUIZ",
        "title":"Test quiz to DB",
        "point":0
      },
      {
        "type":"QUIZ",
        "title":"New Quiz",
        "point":0
      },
      {
        "type":"QUIZ",
        "title":"New Quiz",
        "point":92
      }
    ])
    expect(wrapper.vm.studentData).toEqual({
      avatar: "http://localhost:8080/api/core/resources/user/561a2bf6-ce6f-44ae-aab2-3d9121353566.png",
      batchCode: 'futurre3',
      name: 'Jonathan',
      point: 215,
      university: 'BINUS'
    })
    expect(wrapper.vm.state.loaded).toHaveBeenCalledTimes(1)
  })

  test('successFetchingPointList with no more response', () => {
    initComponent()
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    const response = {
      "studentId":"5d57dbdbcea33323287dd393",
      "studentName":"Jonathan",
      "batchCode":"futurre3",
      "university":"BINUS",
      "avatar":"http://localhost:8080/api/core/resources/user/561a2bf6-ce6f-44ae-aab2-3d9121353566.png",
      "point":100,
      "totalPoint":215,
      "paging":{
        "page":1,
        "size":10,
        "totalRecords":8
      },
      "scores":[]
    }
    wrapper.vm.successFetchingPointList(response)
    expect(wrapper.vm.state.complete).toHaveBeenCalledTimes(1)
  })

  test('failFetchingPointList', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchingPointList()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
