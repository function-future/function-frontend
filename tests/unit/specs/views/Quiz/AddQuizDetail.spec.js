import AddQuizDetail from '@/views/Quiz/AddQuizDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueMoment from 'vue-moment'
import VCalendar from 'v-calendar'

describe('Quiz', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue() {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(VueMoment)
    lv.use(VCalendar)
    return lv
  }

  function initStore() {
    const state = {
      selectedBank: []
    }
    const actions = {
      createQuiz: jest.fn()
    }
    const getters = {
      selectedBank: state => state.selectedBank
    }
    const store = new Vuex.Store({
      modules: {
        quizzes: {
          actions,
          state,
          getters
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
    return shallowMount(AddQuizDetail, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'font-awesome-icon',
        'v-date-picker'
      ],
      mocks: {
        $toasted: {
          error: jest.fn(),
          success: jest.fn()
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

  beforeAll(() => {
    window.matchMedia = window.matchMedia || (() => {
      return {
        matches : false,
        addListener : jest.fn(),
        removeListener: jest.fn()
      }
    })
  })

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

  test('actionButtonClicked', () => {
    initComponent()
    wrapper.vm.actionButtonClicked()
    expect(store.actions.createQuiz).toHaveBeenCalledTimes(1)
  })

  test('returnButtonClicked', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.returnButtonClicked()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({name: 'quizzes'})
  })

  test('successCreatingQuiz', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreatingQuiz()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({name: 'quizzes'})
  })

  test('failCreatingQuiz', () => {
    initComponent()
    wrapper.vm.failCreatingQuiz()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
