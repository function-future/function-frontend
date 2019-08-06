import QuestionnairesCreate from '@/views/Questionnaire/QuestionnairesCreate'
import { shallowMount } from '@vue/test-utils'
import questionnaireApi from '@/api/controller/questionnaire'

jest.mock('@/api/controller/questionnaire')

describe('QuestionnaireResults', () => {
  let wrapper

  function initWrapper () {
    const $router = {}

    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    wrapper = shallowMount(QuestionnairesCreate, {
      stubs: [
        'BaseButton',
        'QuestionnaireForm',
        'font-awesome-icon'
      ],
      mocks: {
        $router,
        $toasted
      }
    })
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('goToCreate case 1', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('goToCreate case 2', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.questionnaire.title = 'title'
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('goToCreate case 3', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.questionnaire.description = 'description'
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('goToCreate case 4', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.questionnaire.description = 'description'
    wrapper.vm.questionnaire.title = 'title'
    wrapper.vm.questionnaire.dueDate = Date.now()
    wrapper.vm.questionnaire.startDate = Date.now() + 10
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('goToCreate case 5', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.questionnaire.description = 'description'
    wrapper.vm.questionnaire.title = 'title'
    const date = Date.now()
    wrapper.vm.questionnaire.dueDate = date
    wrapper.vm.questionnaire.startDate = date
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('goToCreate case 6', () => {
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.questionnaire.description = 'description'
    wrapper.vm.questionnaire.title = 'title'
    const date = Date.now()
    wrapper.vm.questionnaire.dueDate = date
    wrapper.vm.questionnaire.startDate = 0
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('goToCreate case 7', () => {
    questionnaireApi.createQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.questionnaire.description = 'description'
    wrapper.vm.questionnaire.title = 'title'
    wrapper.vm.questionnaire.startDate = new Date()
    wrapper.vm.questionnaire.dueDate = new Date()
    wrapper.vm.questionnaire.dueDate.setDate(wrapper.vm.questionnaire.startDate.getDate() + 1)
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$toasted.error).not.toHaveBeenCalled()
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
    initWrapper()
    wrapper.vm.submitMessageErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('setCurrentQuestionnaire', () => {
    initWrapper()
    wrapper.vm.questionnaire = {}
    const newQuestionnaire = {title: 'title'}
    wrapper.vm.setCurrentQuestionnaire(newQuestionnaire)
    expect(wrapper.vm.questionnaire).toEqual(newQuestionnaire)
  })
})
