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
      roomList: []
    }
    const actions = {
      fetchRoomList: jest.fn()
    }
    const getters = {
      roomList: state => state.roomList
    }
    const store = new Vuex.Store({
      modules: {
        assignmentRooms: {
          state,
          actions,
          getters,
          namespaced: true
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

  test('failFetchingRoomList', () => {
    initComponent()
    wrapper.vm.failFetchingRoomList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('goToRoomDetail', () => {
    initComponent()
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
        id: 'ASG0001',
        roomId: 'ROM0001'
      }
    })
  })
})
