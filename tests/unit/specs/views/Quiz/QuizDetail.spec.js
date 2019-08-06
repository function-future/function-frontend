import QuizDetail from '@/views/Quiz/QuizDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuizDetail', () => {
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
      quiz: {
        title: '',
        description: '',
        endDate: new Date(15000),
        timeLimit: 3600,
        trials: 0,
        batch: '',
        questionCount: 0
      },
      accessLIst: {}
    }
    const actions = {
      fetchQuizById: jest.fn(),
      updateQuizDetail: jest.fn()
    }
    const getters = {
      quiz: state => state.quiz,
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      modules: {
        quizzes: {
          state,
          actions,
          getters,
          namespaced: true
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

  function createWrapper(store, options) {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(QuizDetail, {
      ...options,
      store,
      localVue,
      router,
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

  test('isCalendarDisabled true', () => {
    initComponent()
    wrapper.vm.editMode = true
    expect(wrapper.vm.isCalendarDisabled).toEqual({ placement: 'bottom', visibility: 'click' })
  })

  test('isCalendarDisabled false', () => {
    initComponent()
    wrapper.vm.editMode = false
    expect(wrapper.vm.isCalendarDisabled).toEqual({visibility: null})
  })

  test('cancelButtonText true', () => {
    initComponent()
    wrapper.vm.editMode = true
    expect(wrapper.vm.cancelButtonText).toEqual('Cancel')
  })

  test('cancelButtonText false', () => {
    initComponent()
    wrapper.vm.editMode = false
    expect(wrapper.vm.cancelButtonText).toEqual('Return')
  })

  test('actionButtonText true', () => {
    initComponent()
    wrapper.vm.editMode = true
    expect(wrapper.vm.actionButtonText).toEqual('Save')
  })

  test('actionButtonText false', () => {
    initComponent()
    wrapper.vm.editMode = false
    expect(wrapper.vm.actionButtonText).toEqual('Edit')
  })

  test('successFetchingQuizById', () => {
    initComponent()
    wrapper.vm.$store.getters.quiz = {
      title: '',
      description: '',
      endDate: 15000,
      timeLimit: 3600,
      trials: 0,
      batch: '',
      questionCount: 0
    }
    wrapper.vm.successFetchingQuizById()
    expect(wrapper.vm.quizDetail).toEqual({
      title: '',
      description: '',
      endDate: new Date(15000),
      timeLimit: 60,
      trials: 0,
      batch: '',
      questionCount: 0
    })
  })

  test('failFetchingQuizById', () => {
    initComponent()
    wrapper.vm.failFetchingQuizById()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })

  test('actionButtonClicked editMode is true', () => {
    initComponent()
    wrapper.vm.updateQuizDetail = jest.fn()
    wrapper.vm.editMode = true
    wrapper.vm.actionButtonClicked()
    expect(wrapper.vm.updateQuizDetail).toBeCalledTimes(1)
    expect(wrapper.vm.editMode).toEqual(false)
  })

  test('actionButtonClicked editMode is false', () => {
    initComponent()
    wrapper.vm.editMode = false
    wrapper.vm.actionButtonClicked()
    expect(store.actions.updateQuizDetail).not.toBeCalled()
    expect(wrapper.vm.editMode).toEqual(true)
  })

  test('returnButtonClicked editMode is true', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.editMode = true
    wrapper.vm.returnButtonClicked()
    expect(spy).toBeCalledTimes(1)
  })

  test('returnButtonClicked editMode is false', () => {
    initComponent()
    wrapper.vm.$route.params.batchCode = '1'
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.editMode = false
    wrapper.vm.returnButtonClicked()
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'quizzes',
      params: {
        batchCode: '1'
      }
    })
  })

  test('successUpdatingQuiz', () => {
    initComponent()
    wrapper.vm.successUpdatingQuiz()
    expect(wrapper.vm.$toasted.success).toBeCalledTimes(1)
  })

  test('failUpdatingQuiz', () => {
    initComponent()
    wrapper.vm.failUpdatingQuiz()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })
})
