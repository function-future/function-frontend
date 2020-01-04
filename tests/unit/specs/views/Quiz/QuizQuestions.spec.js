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
      quiz: {},
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
      submitAnswers: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      quiz: state => state.quiz,
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
      refs: {
        timer: {
          pause: jest.fn(),
        }
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

  test('optionLabel A', () => {
    initComponent()
    expect(wrapper.vm.optionLabel(0)).toEqual('A')
  })

  test('optionLabel B', () => {
    initComponent()
    expect(wrapper.vm.optionLabel(1)).toEqual('B')
  })

  test('optionLabel C', () => {
    initComponent()
    expect(wrapper.vm.optionLabel(2)).toEqual('C')
  })

  test('optionLabel D', () => {
    initComponent()
    expect(wrapper.vm.optionLabel(3)).toEqual('D')
  })

  test('successFetchingStudentQuizQuestions', () => {
    initComponent()
    wrapper.vm.successFetchingStudentQuizQuestions()
    expect(wrapper.vm.currentNumber).toEqual(0)
    expect(wrapper.vm.isLoading).toEqual(false)
  })

  test('failedFetchingStudentQuizQuestions', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedFetchingStudentQuizQuestions ()
    expect(spy).toBeCalledTimes(1)
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
    const arraySpy = jest.spyOn(wrapper.vm.studentQuizQuestions, 'forEach')
    const spy = jest.spyOn(wrapper.vm, 'submitQuiz')
    wrapper.vm.submitQuiz()
    expect(arraySpy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successSubmitStudentQuiz', () => {
    initComponent()
    const response = {
      data: {
        point: 80,
        trials: 10
      }
    }
    wrapper.vm.$refs = {
      timer: {
        pause: jest.fn()
      }
    }
    wrapper.vm.successSubmitStudentQuiz(response)
    expect(wrapper.vm.result).toEqual(80)
    expect(wrapper.vm.trialsLeft).toEqual(10)
    expect(wrapper.vm.showPointModal).toEqual(true)
    expect(wrapper.vm.$refs.timer.pause).toHaveBeenCalledTimes(1)
  })

  test('failedSubmitStudentQuiz', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedSubmitStudentQuiz()
    expect(spy).toHaveBeenCalledTimes(1)
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

  test('restart', () => {
    initComponent()
    wrapper.vm.$router.go = jest.fn()
    wrapper.vm.restart()
    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1)
  })

  test('finish', () => {
    initComponent()
    const routeSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.finish()
    expect(routeSpy).toHaveBeenCalledWith({
      name: 'scoringAdmin'
    })
  })

  test('mounted', () => {
    const spy = jest.spyOn(window, 'addEventListener')
    initComponent()
    expect(spy).toHaveBeenCalled()
  })

  test('beforeDestroyed', () => {
    initComponent()
    const spy = jest.spyOn(window, 'removeEventListener')
    wrapper.destroy()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('reloadHandler with isSubmitting equal false', () => {
    initComponent()
    wrapper.vm.isSubmitting = false
    let event = {}
    wrapper.vm.reloadHandler(event)
    expect(event.returnValue).toEqual('Page reload')
  })

  test('reloadHandler with isSubmitting equal true', () => {
    initComponent()
    wrapper.vm.isSubmitting = true
    let event = {}
    wrapper.vm.reloadHandler(event)
    expect(event).toEqual({})
  })

  test('select', () => {
    initComponent()
    wrapper.vm.select(0, 0)
    expect(wrapper.vm.answers[0]).toEqual(0)
  })
})
