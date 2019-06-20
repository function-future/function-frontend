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
})
