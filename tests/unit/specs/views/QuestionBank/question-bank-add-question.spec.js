import QuestionBankAddQuestion from '@/views/QuestionBank/QuestionBankAddQuestion'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuestionBankAddQuestion', () => {
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
    const state = {}
    const actions = {
      createQuestion: jest.fn()
    }
    const getters = {}
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
    return shallowMount(QuestionBankAddQuestion, {
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

  test('saveButtonClicked', () => {
    initComponent()
    wrapper.vm.createQuestion = jest.fn()
    wrapper.vm.saveButtonClicked()
    expect(wrapper.vm.createQuestion).toHaveBeenCalledTimes(1)
  })

  test('cancelButtonClicked', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.cancelButtonClicked()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('successCreatingQuestion', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreatingQuestion()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('failCreatingQuestionBank', () => {
    initComponent()
    wrapper.vm.failCreatingQuestion()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
