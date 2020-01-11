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
        endDate: 15000,
        timeLimit: 3600,
        trials: 0,
        batch: '',
        questionCount: 0
      },
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      },
      currentUser: {
        batchCode: 'future3'
      }
    }
    const actions = {
      fetchQuizById: jest.fn(),
      updateQuizDetail: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      quiz: state => state.quiz,
      accessList: state => state.accessList,
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

  function createWrapper(store, options) {
    const router = new VueRouter([])
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

  test('initPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuizById')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingQuizById', () => {
    initComponent()
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
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchingQuizById()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToEditQuiz', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.$route.params.batchCode = 'future3'
    wrapper.vm.$route.params.quizId = 'QZ0001'
    wrapper.vm.goToEditQuiz()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editQuiz',
      params: {
        batchCode: 'future3',
        id: 'QZ0001'
      }
    })
  })

  test('deleteThisQuiz', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteQuizById')
    wrapper.vm.deleteThisQuiz()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingQuiz', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successDeletingQuiz()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'scoringAdmin'
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failedDeletingQuiz', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedDeletingQuiz()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToStudentQuiz', () => {
    initComponent()
    wrapper.vm.$route.params.quizId = 'QZ0001'
    const spy = jest.spyOn(wrapper.vm, 'fetchStudentQuizDetail')
    wrapper.vm.goToStudentQuiz()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingStudentQuiz', () => {
    initComponent()
    wrapper.vm.$route.params.quizId = 'QZ0001'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successFetchingStudentQuiz()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'studentQuizQuestions',
      params: {
        quizId: 'QZ0001'
      }
    })
  })

  test('failedFetchingStudentQuiz', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedFetchingStudentQuiz()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
