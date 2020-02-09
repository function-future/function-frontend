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
        role: 'STUDENT',
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

  test('trialsExist false', () => {
    initComponent()
    wrapper.vm.quizDetail = {
      title: '',
      description: '',
      endDate: new Date(15000),
      timeLimit: 1,
      trials: 0,
      batch: '',
      questionCount: 0
    }
    expect(wrapper.vm.trialsExist).toEqual(false)
  })

  test('trialsExist true', () => {
    initComponent()
    wrapper.vm.quizDetail = {
      title: '',
      description: '',
      endDate: new Date(15000),
      timeLimit: 1,
      trials: 10,
      batch: '',
      questionCount: 0
    }
    expect(wrapper.vm.trialsExist).toEqual(true)
  })

  test('initPage with student loggedIn', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'getStudentQuizDetail')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getStudentQuizDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchStudentQuizDetail')
    wrapper.vm.getStudentQuizDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getAdminQuizDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuizById')
    wrapper.vm.getAdminQuizDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingStudentQuiz with timeLimit changed to hour', () => {
    initComponent()
    const response = {
      id: 'QZ001',
      quiz: {
        title: '',
        description: '',
        endDate: 15000,
        timeLimit: 60,
        trials: 10,
        batch: '',
        questionCount: 0
      },
      trials: 0
    }
    wrapper.vm.successFetchingStudentQuiz(response)
    expect(wrapper.vm.quizDetail).toEqual({
      title: '',
      description: '',
      endDate: new Date(15000),
      timeLimit: 1,
      trials: 0,
      batch: '',
      questionCount: 0
    })
    expect(wrapper.vm.isMinutes).toEqual(false)
  })

  test('successFetchingStudentQuiz with timeLimit changed to minute', () => {
    initComponent()
    const response = {
      id: 'QZ001',
      quiz: {
        title: '',
        description: '',
        endDate: 15000,
        timeLimit: 20,
        trials: 10,
        batch: '',
        questionCount: 0
      },
      trials: 0
    }
    wrapper.vm.successFetchingStudentQuiz(response)
    expect(wrapper.vm.quizDetail).toEqual({
      title: '',
      description: '',
      endDate: new Date(15000),
      timeLimit: 20,
      trials: 0,
      batch: '',
      questionCount: 0
    })
    expect(wrapper.vm.isMinutes).toEqual(true)
  })

  test('successFetchingAdminQuiz with timeLimit changed to hour', () => {
    initComponent()
    const response = {
      title: '',
      description: '',
      endDate: 15000,
      timeLimit: 60,
      trials: 10,
      batch: '',
      questionCount: 0
    }
    wrapper.vm.successFetchingAdminQuiz(response)
    expect(wrapper.vm.quizDetail).toEqual({
      title: '',
      description: '',
      endDate: new Date(15000),
      timeLimit: 1,
      trials: 10,
      batch: '',
      questionCount: 0
    })
    expect(wrapper.vm.isMinutes).toEqual(false)
  })

  test('successFetchingAdminQuiz with timeLimit changed to minute', () => {
    initComponent()
    const response = {
      title: '',
      description: '',
      endDate: 15000,
      timeLimit: 20,
      trials: 10,
      batch: '',
      questionCount: 0
    }
    wrapper.vm.successFetchingAdminQuiz(response)
    expect(wrapper.vm.quizDetail).toEqual({
      title: '',
      description: '',
      endDate: new Date(15000),
      timeLimit: 20,
      trials: 10,
      batch: '',
      questionCount: 0
    })
    expect(wrapper.vm.isMinutes).toEqual(true)
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
    wrapper.vm.$route.params.quizId = 'QZ0001'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToStudentQuiz()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'studentQuizQuestions',
      params: {
        quizId: 'QZ0001'
      }
    })
  })
})
