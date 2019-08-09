import StudentAssignments from '@/views/Assignment/StudentAssignments'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('StudentAssignment', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore () {
    const state = {
      studentAssignments: [
        {
          "id" : "ROM0001",
          "point" : 80,
          "student" : {
            "id": "SDT00001",
            "name": "Oliver Sebastian",
            "phone": "+6285774263075",
            "role": "STUDENT",
            "address": "Tangerang",
            "email": "oliver@gmail.com",
            "avatar": "http://function-src.com/asdasd",
            "batch": "3",
            "university": "BINUS"
          },
          "assignment": {
            "id" : "ASG0001",
            "title" : "Assignment 1",
            "description" : "Description Number 1",
            "deadline" : 15000000,
            "file" : "http://function-static.com/ASG0001/fileName.docx",
            "batchCode" : "3"
          }
        },
        {
          "id" : "ROM0002",
          "point" : 90,
          "student" : {
            "id": "SDT00001",
            "name": "Oliver Sebastian",
            "phone": "+6285774263075",
            "role": "STUDENT",
            "address": "Tangerang",
            "email": "oliver@gmail.com",
            "avatar": "http://function-src.com/asdasd",
            "batch": "3",
            "university": "BINUS"
          },
          "assignment": {
            "id" : "ASG0001",
            "title" : "Assignment 1",
            "description" : "Description Number 1",
            "deadline" : 15000000,
            "file" : "http://function-static.com/ASG0001/fileName.docx",
            "batchCode" : "3"
          }
        }
      ],
      currentUser: {}
    }
    const actions = {
      fetchStudentAssignmentList: jest.fn()
    }
    const getters = {
      studentAssignments: state => state.studentAssignments,
      currentUser: state => state.currentUser
    }
    const store = new Vuex.Store({
      state,
      actions,
      getters
    })

    return {
      store,
      state,
      actions,
      getters
    }
  }

  function createWrapper (store, options) {
    const router = new VueRouter([])
    const marked = jest.fn()
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(StudentAssignments, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon',
        'vue-toasted'
      ],
      mocks: {
        $toasted,
        marked
      },
      sync: false
    })
  }

  function initComponent () {
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

  test('successFetchingAssignmentList', () => {
    initComponent()
    const payload = {
      "page": 1,
      "size": 10,
      "totalRecords": 13
    }
    wrapper.vm.successFetchingAssignmentList(payload)
    expect(wrapper.vm.paging).toEqual(payload)
  })

  test('failFetchingAssignmentList', () => {
    initComponent()
    const response = {
      'code': 500,
      'status': 'Internal server error',
      'data': []
    }
    wrapper.vm.$toasted.error = jest.fn()
    wrapper.vm.failFetchingAssignmentList({ response })
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('isComplete true', () => {
    initComponent()
    expect(wrapper.vm.isComplete(new Date(15000))).toBe('Done')
  })

  test('isComplete false', () => {
    initComponent()
    expect(wrapper.vm.isComplete(new Date(new Date().getTime() + 150000))).toBe('Ongoing')
  })

  test('goToRoomDetail', () => {
    initComponent()
    const room = {
      "id" : "ROM0001",
      "point" : 80,
      "student" : {
        "id": "SDT00001",
        "name": "Oliver Sebastian",
        "phone": "+6285774263075",
        "role": "STUDENT",
        "address": "Tangerang",
        "email": "oliver@gmail.com",
        "avatar": "http://function-src.com/asdasd",
        "batch": "3",
        "university": "BINUS"
      },
      "assignment": {
        "id" : "ASG0001",
        "title" : "Assignment 1",
        "description" : "Description Number 1",
        "deadline" : 15000000,
        "file" : "http://function-static.com/ASG0001/fileName.docx",
        "batchCode" : "3"
      }
    }
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToRoomDetail(room)
    expect(wrapper.vm.$router.push).toBeCalledWith({
      name: 'assignmentRoomDetail',
      params: {
        batchCode: '3',
        assignmentId: 'ASG0001',
        roomId: 'ROM0001'
      },
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
