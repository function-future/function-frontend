import StudentQuizDetail from '@/views/Quiz/StudentQuizDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('StudentQuizDetail', () => {
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
      studentQuizDetail: {
        "id": "sample-id",
        "quiz": {
          "id": "QZ0001",
          "title": "Quiz 2",
          "description": "Description for Quiz 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batchCode": "3"
        }
      },
      currentUser: {}
    }
    const actions = {
      fetchStudentQuizDetail: jest.fn()
    }
    const getters = {
      studentQuizDetail: state => state.studentQuizDetail,
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
    return shallowMount(StudentQuizDetail, {
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

  test('failFetchingStudentQuizDetail', () => {
    initComponent()
    wrapper.vm.failFetchingStudentQuizDetail()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })

  test('actionButtonClicked', () => {
    initComponent()
    wrapper.vm.$route.params.quizId = 'QZ0001'
    store.state.currentUser.id = 'sample-id'
    const routeSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.actionButtonClicked()
    expect(routeSpy).toHaveBeenCalledWith({
      name: 'studentQuizQuestions',
      params: {
        studentId: 'sample-id-1',
        quizId: 'QZ0001'
      }
    })
  })

  test('returnButtonClicked', () => {
    initComponent()
    store.state.currentUser.id = 'sample-id-1'
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    wrapper.vm.returnButtonClicked()
    expect(routerSpy).toHaveBeenCalledWith({
      name: 'studentQuizzes',
      params: {
        studentId: 'sample-id-1'
      }
    })
  })
})
