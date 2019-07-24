import MyQuestionnaire from '@/views/Questionnaire/MyQuestionnaire'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ModalAddQuestion', () => {
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
        'font-awesome-icon'
      ],
      mocks: {
        $toasted
      }
    })
  }

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('created', () => {
    initWrapper()
    expect(store.actions.fetchMyQuestionnaires).toHaveBeenCalled()
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
})
