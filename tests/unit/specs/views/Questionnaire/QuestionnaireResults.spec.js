import QuestionnaireResults from '@/views/Questionnaire/QuestionnaireResults'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('QuestionnaireResults', () => {
  let wrapper
  let store
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore () {
    const actions = {
      toast: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        QuestionnaireResults: {
          actions
        }
      }
    })
    return {
      store,
      actions
    }
  }

  function initWrapper (store, propsData, options) {
    const router = new VueRouter([])

    wrapper = shallowMount(QuestionnaireResults, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'ModalSelectBatch',
        'font-awesome-icon',
        'b-loading',
        'b-field',
        'b-input',
        'b-select',
        'b-button'
      ],
      propsData: {
        ...propsData
      },
      sync: false,
    })
    return wrapper
  }

  function initComponent (propsData) {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = initWrapper(store.store, propsData)
  }

  test('goToMembers error', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.goToMembers()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'please select batch',
        type: 'is-danger'
      }
    })
  })

  test('goToMembers success', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.batch = 2
    wrapper.vm.goToMembers()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'questionnaireResultsMembers',
      params: {
        batchCode: 2
      }
    })
  })

  test('selectBatch', () => {
    initWrapper()
    wrapper.vm.selectBatch(12)
    expect(wrapper.vm.batch).toEqual(12)
    expect(wrapper.vm.showSelectBatchModal).toBe(false)
  })

  test('closeModal', () => {
    initWrapper()
    wrapper.vm.closeModal()
    expect(wrapper.vm.showSelectBatchModal).toBe(false)
  })
})
