import QuestionnairesCreate from '@/views/Questionnaire/QuestionnairesCreate'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import questionnaireApi from '@/api/controller/questionnaire'

jest.mock('@/api/controller/questionnaire')

describe('QuestionnaireCreate', () => {
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
    wrapper = shallowMount(QuestionnairesCreate, {
      ...options,
      store,
      localVue,
      router,
      propsData: {
        ...propsData
      },
      stubs: [
        'QuestionnaireForm',
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

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('goToCreate case 1', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.goToCreate()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'title and description must be filled',
        type: 'is-danger'
      }
    })
  })

  test('goToCreate case 2', () => {
    initComponent()
    wrapper.vm.questionnaire.title = 'title'
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.goToCreate()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'title and description must be filled',
        type: 'is-danger'
      }
    })
  })

  test('goToCreate case 3', () => {
    initComponent()
    wrapper.vm.questionnaire.description = 'description'
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.goToCreate()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'title and description must be filled',
        type: 'is-danger'
      }
    })
  })

  test('goToCreate case 4', () => {
    initComponent()
    wrapper.vm.questionnaire.description = 'description'
    wrapper.vm.questionnaire.title = 'title'
    wrapper.vm.questionnaire.dueDate = Date.now()
    wrapper.vm.questionnaire.startDate = Date.now() + 10
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.goToCreate()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'due date should greater than start date',
        type: 'is-danger'
      }
    })
  })

  test('goToCreate case 5', () => {
    initComponent()
    wrapper.vm.questionnaire.description = 'description'
    wrapper.vm.questionnaire.title = 'title'
    const date = Date.now()
    wrapper.vm.questionnaire.dueDate = date
    wrapper.vm.questionnaire.startDate = date
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.goToCreate()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'due date should greater than start date',
        type: 'is-danger'
      }
    })
  })

  test('goToCreate case 6', () => {
    initComponent()
    wrapper.vm.questionnaire.description = 'description'
    wrapper.vm.questionnaire.title = 'title'
    const date = Date.now()
    wrapper.vm.questionnaire.dueDate = date
    wrapper.vm.questionnaire.startDate = 0
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.goToCreate()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'due date should greater than start date',
        type: 'is-danger'
      }
    })
  })

  test('goToCreate case 7', () => {
    questionnaireApi.createQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.questionnaire.description = 'description'
    wrapper.vm.questionnaire.title = 'title'
    wrapper.vm.questionnaire.startDate = new Date()
    wrapper.vm.questionnaire.dueDate = new Date()
    wrapper.vm.questionnaire.dueDate.setDate(wrapper.vm.questionnaire.startDate.getDate() + 1)
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$router.push).toHaveBeenCalled()
  })

  test('resetProps', () => {
    initWrapper()
    wrapper.vm.questionnaire.title = 'title'
    wrapper.vm.resetProps()
    expect(wrapper.vm.questionnaire.title).toEqual('')
  })

  test('submitMessageErrorCallback', () => {
    global.console.log = jest.fn()
    const spy = jest.spyOn(QuestionnairesCreate.methods, 'resetProps')
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.submitMessageErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Fail to create questionnaire',
        type: 'is-danger'
      }
    })
  })

  test('setCurrentQuestionnaire', () => {
    initWrapper()
    wrapper.vm.questionnaire = {}
    const newQuestionnaire = {title: 'title'}
    wrapper.vm.setCurrentQuestionnaire(newQuestionnaire)
    expect(wrapper.vm.questionnaire).toEqual(newQuestionnaire)
  })
})
