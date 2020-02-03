import ModalAddQuestion from '@/views/Questionnaire/ModalAddQuestion'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ModalAddQuestion', () => {
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
    wrapper = shallowMount(ModalAddQuestion, {
      ...options,
      store,
      localVue,
      propsData: {
        ...propsData
      },
      stubs: [
        'font-awesome-icon',
        'b-loading',
        'b-field',
        'b-input',
        'b-select',
        'b-button'
      ],
      sync: false
    })
    return wrapper
  }
  function initComponent (propsData) {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = initWrapper(store.store, propsData)
  }

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('created', () => {
    const props = { description: 'description' }
    initComponent(props)
    expect(wrapper.vm.descriptionTemp).toEqual('description')
  })

  test('destroyed', () => {
    initWrapper()
    wrapper.destroy()
    expect(wrapper.vm.descriptionTemp).toEqual('')
  })

  test('close', () => {
    initWrapper()
    wrapper.vm.close()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('submit success', () => {
    const props = { description: 'description' }
    initComponent(props)
    const spy = jest.spyOn(wrapper.vm, 'close')
    wrapper.vm.submit()
    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(spy).toHaveBeenCalled()
  })

  test('submit fail', () => {
    initComponent()
    wrapper.vm.descriptionTemp = null
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.submit()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'description cannot empty',
        type: 'is-danger'
      }
    })
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  test('update success', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'close')
    wrapper.vm.updateQuestion()
    expect(wrapper.emitted('update')).toBeTruthy()
    expect(spy).toHaveBeenCalled()
  })

  test('update fail', () => {
    initComponent()
    wrapper.vm.descriptionTemp = null
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.updateQuestion()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'description cannot empty',
        type: 'is-danger'
      }
    })
  })
})
