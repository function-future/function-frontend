import Comparison from '@/views/FinalJudging/Comparison'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Comparisons', () => {
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
      comparison: '',
      score: '',
      accessList: {}
    }
    const actions = {
      fetchComparison : jest.fn(),
      submitScore: jest.fn()
    }
    const getters = {
      comparison: state => state.comparison,
      score: state => state.score,
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
    return shallowMount(Comparison, {
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

  test('successFetchingComparison', () => {
    initComponent()
    wrapper.vm.$store.state.comparison = [
      {
        "studentId": "student-id-1",
        "studentName" : "Student 1",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          },
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      },
      {
        "studentId": "student-id-2",
        "studentName" : "Student 2",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      }
    ]
    const spy = jest.spyOn(wrapper.vm.$store.getters.comparison, 'forEach')
    wrapper.vm.successFetchingComparison()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failedFetchingComparison', () => {
    initComponent()
    wrapper.vm.failedFetchingComparison()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('returnButtonClicked', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm.$router, 'go')
    wrapper.vm.returnButtonClicked()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('submitButtonClicked', () => {
    initComponent()
    wrapper.vm.$store.state.comparison = [
      {
        "studentId": "student-id-1",
        "studentName" : "Student 1",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          },
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      },
      {
        "studentId": "student-id-2",
        "studentName" : "Student 2",
        "batchCode" : "1",
        "university": "Binus University",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "point": 100,
        "scores" : [
          {
            "title" : "Quiz #1",
            "type": "QUIZ",
            "point" : 100
          },
          {
            "title" : "Quiz #2",
            "type": "QUIZ",
            "point" : 80
          },
          {
            "title" : "Assignment #1",
            "type": "ASSIGNMENT",
            "point" : 80
          }
        ]
      }
    ]
    const loopSpy = jest.spyOn(wrapper.vm.$store.getters.comparison, 'forEach')
    const spy = jest.spyOn(store.actions, 'submitScore')
    wrapper.vm.submitButtonClicked()
    expect(loopSpy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successSubmittingScore', () => {
    initComponent()
    wrapper.vm.$route.params.batchCode = 1
    const spy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.successSubmittingScore()
    expect(spy).toHaveBeenCalledWith({
      name: 'judgingList',
      params: {
        batchCode: 1
      }
    })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failedSubmittingScore', () => {
    initComponent()
    wrapper.vm.failedSubmittingScore()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
