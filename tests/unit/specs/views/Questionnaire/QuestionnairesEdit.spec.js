import QuestionnairesEdit from '@/views/Questionnaire/QuestionnairesEdit'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import questionnaireApi from '@/api/controller/questionnaire'

jest.mock('@/api/controller/questionnaire')

describe('QuestionnairesEdit', () => {
  let wrapper
  let store

  function initStore (initState) {
    let state = {
      currentQuestionnaireAdmin: {},
      currentAppraisee: [],
      currentQuestions: [],
      currentAppraiser: [],
      ...initState
    }
    let getters = {
      currentQuestionnaireAdmin: () => state.currentQuestionnaireAdmin,
      currentQuestions: () => state.currentQuestions,
      currentAppraisee: () => state.currentAppraisee,
      currentAppraiser: () => state.currentAppraiser
    }
    let actions = {
      fetchCurrentQuestionnaireAdmin: jest.fn(),
      setCurrentQuestionnaireAdmin: jest.fn(),
      fetchCurrentQuestions: jest.fn(),
      fetchCurrentAppraisee: jest.fn(),
      fetchCurrentAppraiser: jest.fn(),
      toast: jest.fn()
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

  function initWrapper (propsData, route, initState) {

    const $route = {
      params: {}
    }
    const $router = {}

    const localVue = createLocalVue()
    localVue.use(Vuex)

    store = initStore(initState)

    wrapper = shallowMount(QuestionnairesEdit, {
      store: store.store,
      localVue,
      propsData,
      stubs: [
        'QuestionnaireForm',
        'QuestionCard',
        'font-awesome-icon',
        'QuestionnaireParticipantCard',
        'BaseButton',
        'ModalAddQuestion',
        'ModalDeleteConfirmation',
        'ModalChatroom',
        'ReminderMemberModal',
        'UserSimpleCard'
      ],
      mocks: {
        $route,
        $router
      }
    })
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('created', () => {
    const fetchingQuestions = jest.spyOn(QuestionnairesEdit.methods, 'fetchingQuestions')
    const fetchingAppraisee = jest.spyOn(QuestionnairesEdit.methods, 'fetchingAppraisee')
    const fetchingAppraiser = jest.spyOn(QuestionnairesEdit.methods, 'fetchingAppraiser')

    initWrapper()
    expect(store.actions.fetchCurrentQuestionnaireAdmin).toHaveBeenCalled()
    expect(fetchingQuestions).toHaveBeenCalled()
    expect(fetchingAppraisee).toHaveBeenCalled()
    expect(fetchingAppraiser).toHaveBeenCalled()
  })

  test('currentAppraiseeTemp watch', () => {
    const computedAppraisee = jest.spyOn(QuestionnairesEdit.methods, 'computedAppraisee')
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = 'test'
    expect(computedAppraisee).toHaveBeenCalled()
  })

  test('currentAppraiserTemp watch', () => {
    const computedAppraiser = jest.spyOn(QuestionnairesEdit.methods, 'computedAppraiser')
    initWrapper()
    wrapper.vm.currentAppraiserTemp = 'test'
    expect(computedAppraiser).toHaveBeenCalled()
  })

  test('computedAppraisee case 1', () => {
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = null
    expect(wrapper.vm.computedAppraisee()).toEqual([])
  })

  test('computedAppraisee case 2', () => {
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = 'test'
    expect(wrapper.vm.computedAppraisee()).toEqual(store.state.currentAppraisee)
  })

  test('computedAppraiser case 1', () => {
    initWrapper()
    wrapper.vm.currentAppraiserTemp = null
    expect(wrapper.vm.computedAppraisee()).toEqual([])
  })

  test('computedAppraiser case 2', () => {
    initWrapper()
    wrapper.vm.currentAppraiserTemp = 'test'
    expect(wrapper.vm.computedAppraisee()).toEqual(store.state.currentAppraiser)
  })

  test('setCurrentQuestionnaire', () => {
    initWrapper()
    const spyFunc = jest.spyOn(wrapper.vm, 'copyToCurrentQuestionnaireTemp')
    wrapper.vm.currentQuestionnaireAdmin.startDate = 0
    wrapper.vm.currentQuestionnaireAdmin.dueDate = 1
    wrapper.vm.setCurrentQuestionnaire({
      data: {
        id: 'id',
        title: 'title',
        description: 'description'
      }
    })
    expect(spyFunc).toHaveBeenCalled()
    expect(wrapper.vm.currentQuestionnaireTemp.id).toEqual('id')
    expect(wrapper.vm.currentQuestionnaireTemp.title).toEqual('title')
    expect(wrapper.vm.currentQuestionnaireTemp.description).toEqual('description')
    expect(wrapper.vm.currentQuestionnaireTemp.startDate).toEqual(new Date(0))
    expect(wrapper.vm.currentQuestionnaireTemp.dueDate).toEqual(new Date(1))
  })

  test('copyToCurrentQuestionnaire', () => {
    initWrapper()
    const spyFunc = jest.spyOn(wrapper.vm, 'copyToCurrentQuestionnaireTemp')
    wrapper.vm.currentQuestionnaireAdmin.startDate = 0
    wrapper.vm.currentQuestionnaireAdmin.dueDate = 1
    wrapper.vm.copyToCurrentQuestionnaireTemp({
      data: {
        id: 'id',
        title: 'title',
        description: 'description'
      }
    })
    expect(spyFunc).toHaveBeenCalled()
    expect(wrapper.vm.currentQuestionnaireTemp.id).toEqual('id')
    expect(wrapper.vm.currentQuestionnaireTemp.title).toEqual('title')
    expect(wrapper.vm.currentQuestionnaireTemp.description).toEqual('description')
    expect(wrapper.vm.currentQuestionnaireTemp.startDate).toEqual(new Date(0))
    expect(wrapper.vm.currentQuestionnaireTemp.dueDate).toEqual(new Date(1))
  })

  // initWrapper()
  // wrapper.vm.currentQuestionnaireTemp.title = 'title'
  // wrapper.vm.currentQuestionnaireTemp.description = 'description'
  // wrapper.vm.currentQuestionnaireTemp.startDate = new Date(new Date().getTime() + 60000)
  // wrapper.vm.currentQuestionnaireTemp.dueDate = new Date(new Date().getTime() + 62000)
  // wrapper.vm.currentAppraiseeTemp = [{}]
  // wrapper.vm.$router.replace = jest.fn()
  // const spyFunc = jest.spyOn(wrapper.vm, 'goToUpdateDescription')
  // wrapper.vm.goToUpdateDescription()
  // expect(wrapper.vm.$router.replace).toBeCalledWith({
  //   name: 'questionnaires'
  // })
  // expect(spyFunc).toHaveBeenCalled()

  test('goToUpdateDescription case 1', () => {
    questionnaireApi.updateQuestionnaire = success => {
      success({
        code: 201,
        data: {
          id: 'id'
        }
      })
    }
    initWrapper()
    wrapper.vm.isCreate = false
    const spy2 = jest.spyOn(wrapper.vm, 'toast')
    const spyFunc2 = jest.spyOn(wrapper.vm, 'updateQuestions')
    const spyFunc3 = jest.spyOn(wrapper.vm, 'updateAppraisee')
    const spyFunc4 = jest.spyOn(wrapper.vm, 'updateAppraiser')

    wrapper.vm.goToUpdateDescription()
    expect(spyFunc2).toBeCalled()
    expect(spyFunc3).toBeCalled()
    expect(spyFunc4).toBeCalled()
    expect(spy2).toBeCalledWith({
      data: {
        message: 'Success update questionnaire',
        type: 'is-success'
      }
    })
  })

  test('submitMessageErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.submitMessageErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
  })

  test('submitQuestionErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.submitQuestionErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
  })

  test('deleteErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.deleteErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
  })

  test('updateErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.updateErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(spy).toHaveBeenCalled()
  })

  test('addErrorCallback', () => {
    global.console.log = jest.fn()
    initWrapper()
    // const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.addErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    // expect(spy).toHaveBeenCalled()
  })

  test('errorHandler', () => {
    global.console.log = jest.fn()
    initWrapper()
    wrapper.vm.errorHandler('err')
    expect(console.log).toHaveBeenCalledWith('err')
  })

  test('resetDeleteConfirmationModalQuestion', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalQuestion.show = true
    wrapper.vm.resetDeleteConfirmationModalQuestion()
    expect(wrapper.vm.deleteConfirmationModalQuestion.show).toBe(false)
  })

  test('openDeleteConfirmationModalQuestion', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalQuestion.show = false
    wrapper.vm.openDeleteConfirmationModalQuestion(1, {})
    expect(wrapper.vm.deleteConfirmationModalQuestion.show).toBe(true)
  })

  test('submitAddQuestion', () => {
    initWrapper()
    let data = {}
    wrapper.vm.submitAddQuestion(data)
    expect(wrapper.vm.currentQuestionsTemp[0]).toEqual(data)
  })

  test('fetchingQuestions', () => {
    initWrapper()
    wrapper.vm.fetchingQuestions()
    expect(store.actions.fetchCurrentQuestions).toHaveBeenCalled()
  })

  test('fetchingQuestionsCallback', () => {
    initWrapper()
    const response = {
      data: []
    }
    wrapper.vm.fetchingQuestionsCallback(response)
    expect(wrapper.vm.currentQuestionsTemp.length).toEqual(0)
  })

  test('deleteTheQuestionQuestionnaire', () => {
    const spyFunc = jest.spyOn(wrapper.vm, 'resetDeleteConfirmationModalQuestion')
    wrapper.vm.currentQuestionsTemp = [ {}, {} ]
    wrapper.vm.deleteConfirmationModalQuestion.selectedIndex = 0
    wrapper.vm.deleteTheQuestionQuestionnaire()
    expect(spyFunc).toBeCalled()
    expect(wrapper.vm.currentQuestionsTemp.length).toEqual(1)
  })


  // test('deleteTheQuestionQuestionnaire', () => {
  //   questionnaireApi.deleteQuestionQuestionnaire = success => {
  //     success()
  //   }
  //   const spy = jest.spyOn(QuestionnairesEdit.methods, 'fetchingQuestions')
  //   const spyDeleteModal = jest.spyOn(QuestionnairesEdit.methods, 'resetDeleteConfirmationModalQuestion')
  //   initWrapper()
  //   const spy2 = jest.spyOn(wrapper.vm, 'toast')
  //   wrapper.vm.deleteTheQuestionQuestionnaire()
  //   expect(spy).toHaveBeenCalled()
  //   expect(spy2).toHaveBeenCalled()
  //   expect(spyDeleteModal).toHaveBeenCalled()
  // })

  test('openEditModal', () => {
    initWrapper()
    wrapper.vm.questionModal = false
    wrapper.vm.openEditModal({})
    expect(wrapper.vm.questionModal).toBe(true)
  })

  test('closeQuestionModal', () => {
    initWrapper()
    wrapper.vm.questionModal = true
    wrapper.vm.closeQuestionModal()
    expect(wrapper.vm.questionModal).toBe(false)
  })

  test('updateTheQuestionQuestionnaire', () => {
    // questionnaireApi.updateQuestionQuestionnaire = success => {
    //   success()
    // }
    // const spy = jest.spyOn(QuestionnairesEdit.methods, 'fetchingQuestions')
    const spyCloseModal = jest.spyOn(QuestionnairesEdit.methods, 'closeQuestionModal')
    initWrapper()
    wrapper.vm.question = {
      index: 0
    }
    wrapper.vm.questionTemp.index = 0
    wrapper.vm.currentQuestionsTemp = [{
      description: ''
    }]
    wrapper.vm.updateTheQuestionQuestionnaire({
      description: 'desc'
    })
    // expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.currentQuestionsTemp[0].description).toEqual('desc')
    expect(spyCloseModal).toHaveBeenCalled()
  })

  test('addAppraisee', () => {
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = [{id: 0}]
    wrapper.vm.removedAppraisee = [{id: 1}]
    const member = {id: 1}
    wrapper.vm.addAppraisee(member)
    expect(wrapper.vm.currentAppraiseeTemp.length).toEqual(2)
    expect(wrapper.vm.removedAppraisee.length).toEqual(0)
  })

  test('addAppraiser', () => {
    initWrapper()
    wrapper.vm.currentAppraiserTemp = [{id: 0}]
    wrapper.vm.removedAppraiser = [{id: 1}]
    const member = {id: 1}
    wrapper.vm.addAppraiser(member)
    expect(wrapper.vm.currentAppraiserTemp.length).toEqual(2)
    expect(wrapper.vm.removedAppraiser.length).toEqual(0)
  })

  test('fetchingAppraisee', () => {
    initWrapper()
    wrapper.vm.fetchingAppraisee()
    expect(store.actions.fetchCurrentAppraisee).toHaveBeenCalled()
  })

  test('fetchingAppraiseeCallback', () => {
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = ''
    wrapper.vm.fetchingAppraiseeCallback({ data: 'test' })
    expect(wrapper.vm.currentAppraiseeTemp).toEqual('test')
  })

  test('openDeleteConfirmationModalParticipantAppraisee', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.show = false
    wrapper.vm.deleteConfirmationModalParticipant.isAppraisee = false
    wrapper.vm.openDeleteConfirmationModalParticipantAppraisee({})
    expect(wrapper.vm.deleteConfirmationModalParticipant.show).toBe(true)
    expect(wrapper.vm.deleteConfirmationModalParticipant.isAppraisee).toBe(true)
  })

  test('openDeleteConfirmationModalParticipantAppraiser', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.show = false
    wrapper.vm.deleteConfirmationModalParticipant.isAppraisee = true
    wrapper.vm.openDeleteConfirmationModalParticipantAppraiser({})
    expect(wrapper.vm.deleteConfirmationModalParticipant.show).toBe(true)
    expect(wrapper.vm.deleteConfirmationModalParticipant.isAppraisee).toBe(false)
  })

  test('closeDeleteConfirmationModalParticipant', () => {
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.show = true
    wrapper.vm.closeDeleteConfirmationModalParticipant()
    expect(wrapper.vm.deleteConfirmationModalParticipant.show).toBe(false)
  })

  test('submitParticipant case 1', () => {
    questionnaireApi.deleteAppraiseeQuestionnaire = success => {
      success()
    }
    const spy = jest.spyOn(QuestionnairesEdit.methods, 'fetchingAppraisee')
    const spyCloseModal = jest.spyOn(QuestionnairesEdit.methods, 'closeDeleteConfirmationModalParticipant')
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.isAppraisee = true
    wrapper.vm.deleteTheParticipant()
    expect(spy).toHaveBeenCalled()
    expect(spyCloseModal).toHaveBeenCalled()
  })

  test('submitParticipant case 2', () => {
    questionnaireApi.deleteAppraiserQuestionnaire = success => {
      success()
    }
    const spy = jest.spyOn(QuestionnairesEdit.methods, 'fetchingAppraiser')
    const spyCloseModal = jest.spyOn(QuestionnairesEdit.methods, 'closeDeleteConfirmationModalParticipant')
    initWrapper()
    wrapper.vm.deleteConfirmationModalParticipant.isAppraisee = false
    wrapper.vm.deleteTheParticipant()
    expect(spy).toHaveBeenCalled()
    expect(spyCloseModal).toHaveBeenCalled()
  })

  test('fetchingAppraiser', () => {
    initWrapper()
    wrapper.vm.fetchingAppraiser()
    expect(store.actions.fetchCurrentAppraiser).toHaveBeenCalled()
  })

  test('fetchingAppraiserCallback', () => {
    initWrapper()
    wrapper.vm.currentAppraiserTemp = ''
    wrapper.vm.fetchingAppraiserCallback({ data: 'test' })
    expect(wrapper.vm.currentAppraiserTemp).toEqual('test')
  })

  test('updateQuestions', () => {
    initWrapper()
    wrapper.vm.currentQuestionsTemp = [{id: 1}, {id:null}]
    questionnaireApi.addQuestionQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    questionnaireApi.updateQuestionQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    wrapper.vm.updateQuestions()
  })

  test('updateAppraisee', () => {
    initWrapper()
    wrapper.vm.currentAppraiseeTemp = [{id: 1}, {id:null}]
    wrapper.vm.currentAppraisee = [{id: 1}]
    questionnaireApi.addAppraiseeQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    wrapper.vm.removedAppraisee = [{id: 2}]
    questionnaireApi.deleteAppraiseeQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    wrapper.vm.updateAppraisee()
  })

  test('updateAppraiser', () => {
    initWrapper()
    wrapper.vm.currentAppraiserTemp = [{id: 1}, {id:null}]
    wrapper.vm.currentAppraiser = [{id: 1}]
    questionnaireApi.addAppraiserQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    wrapper.vm.removedAppraiser = [{id: 2}]
    questionnaireApi.deleteAppraiserQuestionnaire = success => {
      success({
        data: {
        }
      })
    }
    wrapper.vm.updateAppraiser()
  })

  test('validateQuesionniare case 1', () => {
    initWrapper()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    let res = wrapper.vm.validateQuestionnaire()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Title and description must be filled',
        type: 'is-danger'
      }
    })
    expect(res).toEqual(false)
  })

  test('validateQuesionniare case 2', () => {
    initWrapper()
    wrapper.vm.currentQuestionnaireTemp.title = 'title'
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    let res =wrapper.vm.validateQuestionnaire()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Title and description must be filled',
        type: 'is-danger'
      }
    })
    expect(res).toEqual(false)
  })

  test('validateQuesionniare case 3', () => {
    initWrapper()
    wrapper.vm.currentQuestionnaireTemp.description = 'description'
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    let res = wrapper.vm.validateQuestionnaire()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Title and description must be filled',
        type: 'is-danger'
      }
    })
    expect(res).toEqual(false)
  })

  test('validateQuesionniare case 4', () => {
    initWrapper()
    wrapper.vm.currentQuestionnaireTemp.title = 'title'
    wrapper.vm.currentQuestionnaireTemp.description = 'description'
    wrapper.vm.currentQuestionnaireTemp.startDate = new Date(1)
    wrapper.vm.currentQuestionnaireTemp.dueDate = new Date(0)
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    let res = wrapper.vm.validateQuestionnaire()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Due date should greater than start date',
        type: 'is-danger'
      }
    })
    expect(res).toEqual(false)
  })

  test('validateQuesionniare case 5', () => {
    initWrapper()
    wrapper.vm.currentQuestionnaireTemp.title = 'title'
    wrapper.vm.currentQuestionnaireTemp.description = 'description'
    wrapper.vm.currentQuestionnaireTemp.startDate = new Date(0)
    wrapper.vm.currentQuestionnaireTemp.dueDate = new Date(1)
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    let res = wrapper.vm.validateQuestionnaire()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Start date should greater than now',
        type: 'is-danger'
      }
    })
    expect(res).toEqual(false)
  })

  test('validateQuesionniare case 6', () => {
    initWrapper()
    wrapper.vm.currentQuestionnaireTemp.title = 'title'
    wrapper.vm.currentQuestionnaireTemp.description = 'description'
    wrapper.vm.currentQuestionnaireTemp.startDate = new Date(new Date().getTime() + 60000)
    wrapper.vm.currentQuestionnaireTemp.dueDate = new Date(new Date().getTime() + 62000)
    wrapper.vm.currentAppraiseeTemp = []
    wrapper.vm.currentAppraiserTemp = []
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    let res = wrapper.vm.validateQuestionnaire()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Appraisee cannot be empty',
        type: 'is-danger'
      }
    })
    expect(res).toEqual(false)
  })

  test('validateQuesionniare case 7', () => {
    initWrapper()
    wrapper.vm.currentQuestionnaireTemp.title = 'title'
    wrapper.vm.currentQuestionnaireTemp.description = 'description'
    wrapper.vm.currentQuestionnaireTemp.startDate = new Date(new Date().getTime() + 60000)
    wrapper.vm.currentQuestionnaireTemp.dueDate = new Date(new Date().getTime() + 62000)
    wrapper.vm.currentAppraiseeTemp = [{}]
    wrapper.vm.currentAppraiserTemp = []
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    let res = wrapper.vm.validateQuestionnaire()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Appraiser cannot be empty',
        type: 'is-danger'
      }
    })
    expect(res).toEqual(false)
  })

  test('validateQuesionniare case 8', () => {
    initWrapper()
    wrapper.vm.currentQuestionnaireTemp.title = 'title'
    wrapper.vm.currentQuestionnaireTemp.description = 'description'
    wrapper.vm.currentQuestionnaireTemp.startDate = new Date(new Date().getTime() + 60000)
    wrapper.vm.currentQuestionnaireTemp.dueDate = new Date(new Date().getTime() + 62000)
    wrapper.vm.currentAppraiseeTemp = [{}]
    wrapper.vm.currentAppraiserTemp = [{}]
    let res = wrapper.vm.validateQuestionnaire()
    expect(res).toEqual(true)
  })

  test('updateQuestionnaire', () => {
    initWrapper()
    const spyFunc1 = jest.spyOn(wrapper.vm, 'goToUpdateDescription')
    wrapper.vm.currentQuestionnaireTemp.title = 'title'
    wrapper.vm.currentQuestionnaireTemp.description = 'description'
    wrapper.vm.currentQuestionnaireTemp.startDate = new Date(new Date().getTime() + 60000)
    wrapper.vm.currentQuestionnaireTemp.dueDate = new Date(new Date().getTime() + 62000)
    wrapper.vm.currentAppraiseeTemp = [{}]
    wrapper.vm.currentAppraiserTemp = [{}]
    wrapper.vm.$router.replace = jest.fn()
    wrapper.vm.updateQuestionnaire()
    expect(wrapper.vm.$router.replace).toBeCalledWith({
      name: 'questionnaires'
    })
    expect(spyFunc1).toBeCalled()
  })

  test('nextProgress case 1', () => {
    initWrapper()
    wrapper.vm.progressValue = 4
    // wrapper.vm.$router.replace = jest.fn()
    wrapper.vm.currentQuestionnaireTemp.title = 'title'
    wrapper.vm.currentQuestionnaireTemp.description = 'description'
    wrapper.vm.currentQuestionnaireTemp.startDate = new Date(new Date().getTime() + 60000)
    wrapper.vm.currentQuestionnaireTemp.dueDate = new Date(new Date().getTime() + 62000)
    wrapper.vm.currentAppraiseeTemp = [{}]
    wrapper.vm.currentAppraiserTemp = [{}]
    const spyFunc = jest.spyOn(wrapper.vm, 'goToUpdateDescription')
    // const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.replace = jest.fn()
    wrapper.vm.nextProgress()
    expect(wrapper.vm.$router.replace).toBeCalledWith({
      name: 'questionnaires'
    })
    expect(spyFunc).toBeCalled()
    // expect(wrapper.vm.$router.replace).toBeCalledWith({
    //   name: 'questionnaires'
    // })
    // expect(toastSpy).toBeCalledWith({
    //   data: {
    //     message: 'success update questionnaire',
    //     type: 'is-success'
    //   }
    // })
  })

  test('nextProgress case 2', () => {
    initWrapper()
    wrapper.vm.progressValue = 2
    wrapper.vm.nextProgress()
    expect(wrapper.vm.progressValue).toEqual(3)
  })

  test('prevProgress ', () => {
    initWrapper()
    wrapper.vm.progressValue = 2
    wrapper.vm.prevProgress()
    expect(wrapper.vm.progressValue).toEqual(1)
  })

  test('fetchingCurrentQuestionnarieAdmin', () => {
    initWrapper()
    wrapper.vm.currentQuestionnaireAdmin.startDate = 0
    wrapper.vm.currentQuestionnaireAdmin.dueDate = 1
    const spyOn = jest.spyOn(wrapper.vm, 'fetchCurrentQuestionnaireAdmin')
    wrapper.vm.fetchingCurrentQuestionnarieAdmin()
    expect(spyOn).toHaveBeenCalled()
    expect(wrapper.vm.currentQuestionnaireAdmin.startDate).toEqual(0)
    expect(wrapper.vm.currentQuestionnaireAdmin.dueDate).toEqual(1)
  })
})
