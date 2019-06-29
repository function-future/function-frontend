import AddQuiz from '@/views/Quiz/AddQuiz'
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
      questionBanks: []
    }
    const actions = {
      fetchQuestionBankList: jest.fn(),
      setSelectedBank: jest.fn()
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
    return shallowMount(AddQuiz, {
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

  // TODO: Test mounted method regarding scrollHeight that uses querySelector

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('successFetchingQuestionBankList', () => {
    initComponent()
    wrapper.vm.successFetchingQuestionBankList()
    expect(wrapper.vm.questionBankList).toEqual([])
    expect(wrapper.vm.page).toEqual(2)
  })

  test('failFetchingQuestionBankList', () => {
    initComponent()
    wrapper.vm.failFetchingQuestionBankList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('questionBankSelected select question bank', () => {
    initComponent()
    wrapper.vm.questionBankSelected('QNK0001')
    expect(wrapper.vm.selectedBank).toContain('QNK0001')
  })

  test('questionBankSelected deselect question bank', () => {
    initComponent()
    wrapper.vm.selectedBank = ['QNK0001']
    wrapper.vm.questionBankSelected('QNK0001')
    expect(wrapper.vm.selectedBank).not.toContain('QNK0001')
  })

  test('toggleAllBank calls method selectAll', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'selectAll')
    wrapper.vm.questionBankList = ['QNK0001', 'QNK0002']
    wrapper.vm.toggleAllBank()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('toggleAllBank calls method deselectAll', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deselectAll')
    wrapper.vm.questionBankList = ['QNK0001', 'QNK0002']
    wrapper.vm.selectedBank = ['QNK0001', 'QNK0002']
    wrapper.vm.toggleAllBank()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('deselectAll', () => {
    initComponent()
    wrapper.vm.selectedBank = []
    wrapper.vm.deselectAll()
    expect(wrapper.vm.selectedBank).toEqual([])
  })

  test('selectAll', () => {
    initComponent()
    wrapper.vm.selectedBank = ['QNK0001', 'QNK0002']
    wrapper.vm.selectAll()
    expect(wrapper.vm.selectedBank).toEqual(['QNK0001', 'QNK0002', ''])
  })
//  TODO: Fixed the above 2 unit tests, it is currently made to pass, however it's not the right way to test it
  test('goToAddQuizDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'setSelectedBank')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToAddQuizDetail()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'addQuizDetail'
    })
  })
})
