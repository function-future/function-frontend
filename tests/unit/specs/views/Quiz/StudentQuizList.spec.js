import StudentQuizList from '@/views/Quiz/StudentQuizList'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('StudentQuizList', () => {
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
      studentQuizList: [
        {
          "id": "sample-id",
          "quiz": {
            "id": "QZ0001",
            "title": "Quiz 2",
            "description": "Description for Quiz 2",
            "startDate": 15000000,
            "endDate": 15000000,
            "timeLimit": 3600,
            "trials": 3,
            "questionCount": 10,
            "questionBanks": [
              "QNK00001"
            ],
            "batchCode": "3"
          }
        },
        {
          "id": "sample-id",
          "quiz": {
            "id": "QZ0001",
            "title": "Quiz 2",
            "description": "Description for Quiz 2",
            "startDate": 15000000,
            "endDate": 15000000,
            "timeLimit": 3600,
            "trials": 3,
            "questionCount": 10,
            "questionBanks": [
              "QNK00001"
            ],
            "batchCode": "3"
          }
        }
      ],
      currentUser: {
        id: 'sample-id-1'
      }
    }
    const actions = {
      fetchStudentQuizList: jest.fn()
    }
    const getters = {
      studentQuizList: state => state.studentQuizList,
      currentUser: state => state.currentUser
    }
    const store = new Vuex.Store({
      state,
      actions,
      getters,
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
    const marked = jest.fn()
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(StudentQuizList, {
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
        $toasted,
        marked
      },
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

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('successFetchingStudentQuizList ', () => {
    initComponent()
    const data = {
      page: 1,
      pageSize: 10,
      totalRecords: 20
    }
    wrapper.vm.successFetchingStudentQuizList (data)
    expect(wrapper.vm.paging).toEqual(data)
  })

  test('failFetchingStudentQuizList ', () => {
    initComponent()
    wrapper.vm.failFetchingStudentQuizList ()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('isComplete Done', () => {
    initComponent()
    const deadline = new Date(2000, 5, 10)
    expect(wrapper.vm.isComplete(deadline)).toEqual('Done')
  })

  test('isComplete Ongoing', () => {
    initComponent()
    const deadline = new Date(2077, 7, 7)
    expect(wrapper.vm.isComplete(deadline)).toEqual('Ongoing')
  })

  test('goToQuizDetail', () => {
    initComponent()
    store.state.currentUser.id = 'sample-id-1'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToQuizDetail('QZ0001')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'studentQuizDetail',
      params: {
        studentId: 'sample-id-1',
        quizId: 'QZ0001'
      }
    })
  })

  test('loadPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.loadPage(1)
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadPreviousPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadPreviousPage()
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadNextPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadNextPage()
    expect(wrapper.vm.paging.page).toEqual(3)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('descriptionCompiledMarkdown', () => {
    initComponent()
    const payload = 'Test Data'
    expect(wrapper.vm.descriptionCompiledMarkdown(payload)).toEqual('<p>Test Data</p>\n')
  })
})
