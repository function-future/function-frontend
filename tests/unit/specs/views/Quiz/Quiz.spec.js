import Quiz from '@/views/Quiz/Quiz'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Quiz', () => {
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
      quizList: [
        {
          "id": "QZ00001",
          "title": "Quiz Number 1",
          "description": "Description Number 1",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batch": 3
        },
        {
          "id": "QZ00002",
          "title": "Quiz Number 2",
          "description": "Description Number 2",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batch": 3
        },
        {
          "id": "QZ00003",
          "title": "Quiz Number 3",
          "description": "Description Number 3",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batch": 3
        },
        {
          "id": "QZ00004",
          "title": "Quiz Number 4",
          "description": "Description Number 4",
          "startDate": 15000000,
          "endDate": 15000000,
          "timeLimit": 3600,
          "trials": 3,
          "questionCount": 10,
          "questionBanks": [
            "QNK00001"
          ],
          "batch": 3
        }
      ]
    }
    const actions = {
      fetchQuizList: jest.fn()
    }
    const getters = {
      quizList: state => state.quizList
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
      error: jest.fn()
    }
    return shallowMount(Quiz, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
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

  test('failFetchingQuizList', () => {
    initComponent()
    wrapper.vm.failFetchingQuizList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('addQuiz', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.addQuiz()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'addQuiz'
    })
  })

  test('isComplete Done', () => {
    initComponent()
    const deadline = new Date(2000, 5, 10)
    expect(wrapper.vm.isComplete(deadline)).toEqual('Done')
  })

  test('isComplete Ongoing', () => {
    initComponent()
    const deadline = new Date(2077, 7, 7)
    expect(wrapper.vm.isComplete(deadline)).toEqual('Ongoing')
  })
})
