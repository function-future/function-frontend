import AssignmentRooms from '@/views/Assignment/AssignmentRooms'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('AssignmentRoom', () => {
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
      roomList: [],
      accessList: {}
    }
    const actions = {
      fetchRoomList: jest.fn()
    }
    const getters = {
      roomList: state => state.roomList,
      accessLIst: state => state.accessList
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
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(AssignmentRooms, {
      ...options,
      store,
      localVue,
      router,
      mocks: {
        $toasted
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
    const spy = jest.spyOn(AssignmentRooms.methods, 'fetchRoomList')
    initComponent()
    expect(wrapper.isVueInstance()).toEqual(true)
    expect(spy).toBeCalledTimes(1)
  })

  test('initPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchRoomList')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingRoomList', () => {
    initComponent()
    const paging = {
      page: 1,
      pageSize: 10,
      totalRecords: 20
    }
    const response = []
    wrapper.vm.successFetchingRoomList(response, paging)
    expect(wrapper.vm.paging).toEqual(paging)
    expect(wrapper.vm.rooms).toEqual(response)
  })

  test('failFetchingRoomList', () => {
    initComponent()
    wrapper.vm.failFetchingRoomList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('goToRoomDetail', () => {
    initComponent()
    wrapper.vm.$route.params.batchCode = '1'
    wrapper.vm.$route.params.assignmentId = 'ASG0001'
    wrapper.vm.$router.push = jest.fn()
    const room = {
      "id": "ROM0001",
      "point": 80,
      "student": {
        "id": "sample-id",
        "role": "STUDENT",
        "email": "user@user.com",
        "name": "John Doe",
        "phone": "088888888888",
        "address": "Jl. Address 1 Address 2",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
        "batch": {
          "id": "sample-id",
          "name": "Batch Name",
          "code": "3"
        },
        "university": "Bina Nusantara University"
      },
      "assignment": {
        "id": "ASG0001",
        "title": "Assignment 1",
        "description": "Description Number 1",
        "deadline": 15000000,
        "file": "http://function-static.com/ASG0001/fileName.docx",
        "batch": 3
      }
    }
    wrapper.vm.goToRoomDetail(room)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'assignmentRoomDetail',
      params: {
        assignmentId: 'ASG0001',
        batchCode: '1',
        studentId: 'ROM0001'
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
})
