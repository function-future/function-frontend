import QuizQuestions from '@/views/Quiz/QuizQuestions'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuizQuestions', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue() {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore() {
    const state = {
      studentQuizQuestions: [
        {
          "number" : 1,
          "text" : "Question Example 1",
          "options" : [
            {
              "optionId" : "OptionId1",
              "label" : "Answer Example 1"
            },
            {
              "optionId" : "OptionId2",
              "label" : "Answer Example 2"
            },
            {
              "optionId" : "OptionId3",
              "label" : "Answer Example 3"
            },
            {
              "optionId" : "OptionId4",
              "label" : "Answer Example 4"
            }
          ]
        },
        {
          "number" : 2,
          "text" : "Question Example 2",
          "options" : [
            {
              "optionId" : "OptionId1",
              "label" : "Answer Example 5"
            },
            {
              "optionId" : "OptionId2",
              "label" : "Answer Example 6"
            },
            {
              "optionId" : "OptionId3",
              "label" : "Answer Example 7"
            },
            {
              "optionId" : "OptionId4",
              "label" : "Answer Example 8"
            }
          ]
        },
      ],
      currentUser: {}
    }
    const actions = {
      fetchStudentQuizQuestions: jest.fn(),
      submitAnswers: jest.fn()
    }
    const getters = {
      studentQuizQuestions: state => state.studentQuizQuestions,
      currentUser: state => state.currentUser
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

  function createWrapper(store, options) {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(QuizQuestions, {
      ...options,
      store,
      localVue,
      router,
      data () {
        return {
          currentNumber: 0,
          questions: []
        }
      },
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'v-date-picker',
        'font-awesome-icon'
      ],
      mocks: {
        $toasted
      },
      sync: false
    })
  }

  function initComponent() {
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

  test('successFetchingStudentQuizQuestions', () => {
    initComponent()
    wrapper.vm.successFetchingStudentQuizQuestions()
    expect(wrapper.vm.currentNumber).toEqual(0)
    expect(wrapper.vm.isLoading).toEqual(false)
  })

  test('failedFetchingStudentQuizQuestions', () => {
    initComponent()
    wrapper.vm.failedFetchingStudentQuizQuestions ()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })

  test('viewQuestion', () => {
    initComponent()
    wrapper.vm.viewQuestion(3)
    expect(wrapper.vm.currentNumber).toEqual(2)
  })

  test('viewNextQuestion not limit', () => {
    initComponent()
    wrapper.vm.currentNumber = 0
    wrapper.vm.viewNextQuestion()
    expect(wrapper.vm.currentNumber).toEqual(1)
  })

  test('viewNextQuestion is on upper bound', () => {
    initComponent()
    wrapper.vm.currentNumber = 1
    wrapper.vm.viewNextQuestion()
    expect(wrapper.vm.currentNumber).toEqual(1)
  })

  test('viewPreviousQuestion not limit', () => {
    initComponent()
    wrapper.vm.studentQuizQuestions.length = 3
    wrapper.vm.currentNumber = 3
    wrapper.vm.viewPreviousQuestion()
    expect(wrapper.vm.currentNumber).toEqual(2)
  })

  test('viewPreviousQuestion is on lower bound', () => {
    initComponent()
    wrapper.vm.currentNumber = 0
    wrapper.vm.viewPreviousQuestion()
    expect(wrapper.vm.currentNumber).toEqual(0)
  })

  test('submitQuiz', () => {
    initComponent()
    wrapper.vm.answers = ['option1', 'option2']
    const arraySpy = jest.spyOn(wrapper.vm.answers, 'forEach')
    const spy = jest.spyOn(wrapper.vm, 'submitQuiz')
    wrapper.vm.submitQuiz()
    expect(arraySpy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successSubmitStudentQuiz', () => {
    initComponent()
    store.state.currentUser.id = 'sample-id'
    const routeSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.successSubmitStudentQuiz()
    expect(routeSpy).toHaveBeenCalledWith({
      name: 'studentQuizzes',
      params: {
        studentId: 'sample-id',
        page: 1,
        pageSize: 10
      }
    })
  })

  test('failedSubmitStudentQuiz', () => {
    initComponent()
    wrapper.vm.failedSubmitStudentQuiz()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('highlightedOption is true', () => {
    initComponent()
    wrapper.vm.answers = [
      'option1',
      'option2'
    ]
    expect(wrapper.vm.highlightedOption('option1')).toEqual('active')
  })

  test('highlightedOption is false', () => {
    initComponent()
    wrapper.vm.answers = [
      'option1',
      'option2'
    ]
    expect(wrapper.vm.highlightedOption('option3')).toEqual('')
  })
})
