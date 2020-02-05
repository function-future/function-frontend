import MyQuestionnaire from '@/views/Questionnaire/MyQuestionnaire'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import myQuestionnaireApi from '@/api/controller/my-questionnaire'

jest.mock('@/api/controller/my-questionnaire')

describe('MyQuestionnaire', () => {
  let wrapper
  let store

  function initStore () {
    let state = {}
    let getters = {
      myQuestionnaires: jest.fn()
    }
    let actions = {
      fetchMyQuestionnaires: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        myQuestionnaire: {
          state,
          actions,
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

  function initWrapper () {
    const $toasted = {
      error: jest.fn()
    }

    const localVue = createLocalVue()
    localVue.use(Vuex)
    localVue.use(VueRouter)

    const router = new VueRouter([])
    store = initStore()

    wrapper = shallowMount(MyQuestionnaire, {
      store: store.store,
      localVue,
      router,
      stubs: [
        'BaseButton',
        'BaseTextArea',
        'font-awesome-icon',
        'InfiniteLoading'
      ],
      mocks: {
        $toasted
      }
    })
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('goToListAppraisees enabled', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToListAppraisees('id', false)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'myQuestionnaireAppraisee',
      params: { questionnaireId: 'id' }
    })
  })

  test('goToListAppraisees disabled', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToListAppraisees('id', true)
    expect(wrapper.vm.$router.push).not.toHaveBeenCalled()
  })

  test('errorHandler', () => {
    global.console.log = jest.fn()
    initWrapper()
    wrapper.vm.errorHandler('err')
    expect(console.log).toHaveBeenCalledWith('err')
  })

  test('infiniteHandler case 1', () => {
    myQuestionnaireApi.getMyQuestionnaires = success => {
      success({
        data: []
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initWrapper()
    wrapper.vm.page = 1
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 2', () => {
    myQuestionnaireApi.getMyQuestionnaires = success => {
      success({
        data: [1, 2, 3]
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initWrapper()
    wrapper.vm.page = 2
    wrapper.vm.infiniteHandler($state)
    expect($state.loaded).toHaveBeenCalled()
  })

  test('searchHandler', () => {
    myQuestionnaireApi.getMyQuestionnaires = success => {
      success({
        data: []
      })
    }
    initWrapper()
    wrapper.vm.searchHandler('test')
    expect(wrapper.vm.myQuestionnaires).toEqual([])
  })
})
