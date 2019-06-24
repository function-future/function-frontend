import QuestionBankQuestionList from '@/views/QuestionBank/QuestionBankQuestionList'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuestionBankQuestionList', () => {
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
      questionList: {}
    }
    const actions = {
      fetchQuestionBankQuestionList: jest.fn()
    }
    const getters = {
      questionList: state => state.questionList
    }
    const store = new Vuex.Store({
      modules: {
        questionBanks: {
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
    return shallowMount(QuestionBankQuestionList, {
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
        $toasted: {
          error: jest.fn(),
          success: jest.fn()
        },
        $router: {
          push: jest.fn()
        }
      },
      attachToDocument: true,
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
    wrapper.vm.fetchQuestionBankQuestionList = jest.fn()
    wrapper.vm.initPage()
    expect(wrapper.vm.fetchQuestionBankQuestionList).toHaveBeenCalledTimes(1)
  })

  test('failFetchingQuestionBankQuestionList', () => {
    initComponent()
    wrapper.vm.failFetchingQuestionBankQuestionList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('redirectToAddQuestion', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.redirectToAddQuestion()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionBankAddQuestion'
    })
  })

  test('redirectToQuestionDetail', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.redirectToQuestionDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })
})
