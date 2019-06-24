import QuestionBanks from '@/views/QuestionBank/QuestionBanks'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuestionBanks', () => {
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
      questionBanks: {}
    }
    const actions = {
      fetchQuestionBankList: jest.fn()
    }
    const getters = {
      questionBanks: state => state.questionBanks
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
    return shallowMount(QuestionBanks, {
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
    wrapper.vm.fetchQuestionBankList = jest.fn()
    wrapper.vm.initPage()
    expect(wrapper.vm.fetchQuestionBankList).toHaveBeenCalledTimes(1)
  })

  test('failFetchingQuestionBankQuestionList', () => {
    initComponent()
    wrapper.vm.failFetchingQuestionBankList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('addQuestionBank', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.addQuestionBank()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'addQuestionBank'
    })
  })

  test('goToQuestionBankQuestions', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToQuestionBankQuestions()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('goToQuestionBankDetail', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToQuestionBankDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })
})
