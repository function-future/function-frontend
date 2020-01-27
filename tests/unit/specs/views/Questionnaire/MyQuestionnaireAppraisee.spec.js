import MyQuestionnaireAppraisee from '@/views/Questionnaire/MyQuestionnaireAppraisee'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import myQuestionnaireApi from '@/api/controller/my-questionnaire'
import moment from 'moment'

jest.mock('@/api/controller/my-questionnaire')

describe('MyQuestionnaireAppraisee', () => {
  let wrapper
  let store

  function initStore (initState) {
    let state = {
      myListAppraisees: [],
      currentQuestionnaire: {},
      currentQuestionnaireData: { appraisee: {} },
      currentQuestionsQuestionnaire: [],
      ...initState
    }
    let getters = {
      myListAppraisees: () => state.myListAppraisees,
      currentQuestionnaire: () => state.currentQuestionnaire,
      currentQuestionnaireData: () => state.currentQuestionnaireData,
      currentQuestionsQuestionnaire: () => state.currentQuestionsQuestionnaire
    }
    let actions = {
      fetchMyListApprisees: jest.fn(),
      fetchCurrentQuestionnaire: jest.fn(),
      fetchCurrentQuestionnaireData: jest.fn(),
      fetchCurrentQuestions: jest.fn(),
      saveAppraisee: jest.fn(),
      fetchCurrentQuestionsQuestionnaire: jest.fn(),
      resetQuestionnaireList: jest.fn()
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
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }

    const $route = {
      params: {},
      ...route
    }
    const $router = {}

    const localVue = createLocalVue()
    localVue.use(Vuex)

    store = initStore(initState)

    wrapper = shallowMount(MyQuestionnaireAppraisee, {
      store: store.store,
      localVue,
      propsData,
      stubs: [
        'BaseButton',
        'SearchBar',
        'font-awesome-icon',
        'BaseCard',
        'QuestionnaireCard',
        'QuestionnaireParticipantCard',
        'MyQuestionnaireForm',
        'myQuestionnaireApi'
      ],
      mocks: {
        $toasted,
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

  test('created params apraiseeId null', () => {
    const spy = jest.spyOn(MyQuestionnaireAppraisee.methods, 'fetchingQuestions')
      .mockImplementation(() => {})
    const spyData = jest.spyOn(MyQuestionnaireAppraisee.methods, 'fetchingQuestionnaireData')
      .mockImplementation(() => {})
    initWrapper()
    expect(store.actions.fetchCurrentQuestionnaire).toHaveBeenCalled()
    expect(store.actions.fetchMyListApprisees).toHaveBeenCalled()
    expect(spy).toHaveBeenCalled()
    expect(spyData).not.toHaveBeenCalled()
  })

  test('created params apraiseeId not null', () => {
    const spy = jest.spyOn(MyQuestionnaireAppraisee.methods, 'fetchingQuestions')
      .mockImplementation(() => {})
    const spyData = jest.spyOn(MyQuestionnaireAppraisee.methods, 'fetchingQuestionnaireData')
      .mockImplementation(() => {})
    initWrapper(undefined, {
      params: {
        appraiseeId: 'id'
      }
    })
    expect(store.actions.fetchCurrentQuestionnaire).toHaveBeenCalled()
    expect(store.actions.fetchMyListApprisees).toHaveBeenCalled()
    expect(spy).toHaveBeenCalled()
    expect(spyData).toHaveBeenCalled()
  })

  test('destroyed', () => {
    initWrapper()
    wrapper.destroy()
    expect(wrapper.vm.responses).toEqual([])
  })

  test('computedDate', () => {
    initWrapper()
    const date = Date.now()
    expect(wrapper.vm.computedDate(date)).toEqual(moment(date).format('DD MMM YYYY, h:mm a'))
  })

  test('goToInputQuestionnaireAnswer', () => {
    const appraisee = { id: 'id' }
    const spyData = jest.spyOn(MyQuestionnaireAppraisee.methods, 'fetchingQuestionnaireData')
    const spyQuestion = jest.spyOn(MyQuestionnaireAppraisee.methods, 'fetchingQuestions')
    initWrapper()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToInputQuestionnaireAnswer(appraisee)
    expect(spyData).toHaveBeenCalledWith(appraisee.id)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'myQuestionnaireForm',
      params: { appraiseeId: appraisee.id }
    })
    expect(spyQuestion).toHaveBeenCalled()
  })

  test('fetchingQuestions', () => {
    initWrapper()
    wrapper.vm.fetchingQuestions()
    expect(store.actions.fetchCurrentQuestionsQuestionnaire).toHaveBeenCalled()
  })

  test('fetchingQuestionsCallback', () => {
    const response = {
      data: [
        {
          score: 10,
          comment: 'test'
        }
      ]
    }
    initWrapper()
    wrapper.vm.fetchingQuestionsCallback(response)
    expect(response.data[0].score).toEqual(0)
    expect(response.data[0].comment).toEqual('')
  })

  test('fetchingQuestionnaireData', () => {
    initWrapper()
    wrapper.vm.fetchingQuestionnaireData()
    expect(store.actions.fetchCurrentQuestionnaireData).toHaveBeenCalled()
  })

  test('printScore submitScore = true', () => {
    const currentQuestionnaireForm = [
      {
        score: 1,
        id: 'id',
        comment: 'comment'
      }
    ]
    myQuestionnaireApi.addQuestionnaireResponse = success => {
      success()
    }
    const spyBackToAppraiseePage = jest.spyOn(MyQuestionnaireAppraisee.methods, 'backToAppraiseePage')
      .mockImplementation(() => {})

    initWrapper()
    wrapper.vm.currentQuestionnaireForm = currentQuestionnaireForm
    wrapper.vm.printScore()
    expect(wrapper.vm.responses).toEqual([{
      idQuestion: currentQuestionnaireForm[0].id,
      score: currentQuestionnaireForm[0].score,
      comment: currentQuestionnaireForm[0].comment
    }])
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
    expect(spyBackToAppraiseePage).toHaveBeenCalled()
    expect(store.actions.resetQuestionnaireList).toHaveBeenCalled()
  })

  test('printScore submitScore = false', () => {
    const currentQuestionnaireForm = [
      {
        score: 0,
        id: 'id',
        comment: 'comment'
      }
    ]

    initWrapper()
    wrapper.vm.currentQuestionnaireForm = currentQuestionnaireForm
    wrapper.vm.printScore()
    expect(wrapper.vm.responses).toEqual([{
      idQuestion: currentQuestionnaireForm[0].id,
      score: currentQuestionnaireForm[0].score,
      comment: currentQuestionnaireForm[0].comment
    }])
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('errorCallback', () => {
    initWrapper()
    wrapper.vm.errorCallback()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('errorCallbackCurrentQuestionnaire', () => {
    initWrapper()
    wrapper.vm.errorCallbackCurrentQuestionnaire()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('errorCallbackAppraisee', () => {
    initWrapper()
    wrapper.vm.errorCallbackAppraisee()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('backToAppraiseePage', () => {
    initWrapper()
    wrapper.vm.$router.replace = jest.fn()
    wrapper.vm.backToAppraiseePage()
    expect(wrapper.vm.$router.replace).toHaveBeenCalled()
  })

  test('updateCurrentQuestionanireForm case 1', () => {
    const currentQuestionnaireForm = [
      {
        score: 0,
        id: 'id',
        comment: 'comment'
      }
    ]
    const questionNewValue = {
      id: 'id',
      score: 10,
      comment: 'newComment'
    }

    initWrapper()
    wrapper.vm.currentQuestionnaireForm = currentQuestionnaireForm
    wrapper.vm.updateCurrentQuestionanireForm(questionNewValue)
    expect(currentQuestionnaireForm[0].score).toEqual(questionNewValue.score)
    expect(currentQuestionnaireForm[0].comment).toEqual(questionNewValue.comment)
  })

  test('updateCurrentQuestionanireForm case 2', () => {
    const currentQuestionnaireForm = [
      {
        score: 0,
        id: 'id',
        comment: 'comment'
      }
    ]
    const questionNewValue = {
      id: 'id2',
      score: 10,
      comment: 'newComment'
    }

    initWrapper()
    wrapper.vm.currentQuestionnaireForm = currentQuestionnaireForm
    wrapper.vm.updateCurrentQuestionanireForm(questionNewValue)
    expect(currentQuestionnaireForm[0].score).not.toEqual(questionNewValue.score)
    expect(currentQuestionnaireForm[0].comment).not.toEqual(questionNewValue.comment)
  })
})
