import MembersPage from '@/views/LoggingRoom/MembersPage'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import loggingRoomApi from '@/api/controller/logging-room'
import VueRouter from 'vue-router'

jest.mock('@/api/controller/logging-room')

describe('LogggingRoomDetail', () => {
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
    const state = {
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const getters = {
      accessList: state => state.accessList
    }
    const actions = {
      toast: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        MembersPage: {
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

  function initWrapper (store, propsData, options) {
    const router = new VueRouter([])
    return shallowMount(MembersPage, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'b-loading',
        'b-field',
        'b-input',
        'b-select',
        'b-button',
        'LoggingRoomCard',
        'InfiniteLoading',
        'ModalDeleteConfirmation',
        'font-awesome-icon'
      ],
      sync: false
    })
  }

  function initComponent (propsData) {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = initWrapper(store.store, propsData)
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

  test('setLoggingRoom', () => {
    loggingRoomApi.getLoggingRoom = success => {
      success({
        data: []
      })
    }
    initComponent()
    wrapper.vm.setLoggingRoom()
    expect(wrapper.vm.loggingRoom.length).toEqual(0)
  })
})
