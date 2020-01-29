import LoggingRoom from '@/views/LoggingRoom/LoggingRoom'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import loggingRoomApi from '@/api/controller/logging-room'
import VueRouter from 'vue-router'

jest.mock('@/api/controller/logging-room')

describe('LoggingRoom', () => {
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
        loggingRoom: {
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
    return shallowMount(LoggingRoom, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'LoggingRoomCard',
        'InfiniteLoading',
        'ModalDeleteConfirmation',
        'font-awesome-icon',
        'b-loading',
        'b-field',
        'b-input',
        'b-select',
        'b-button'
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

  test('infiniteHandler case 1', () => {
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initComponent()
    wrapper.vm.page = 1
    wrapper.vm.keyword = 'something'
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 2', () => {
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    loggingRoomApi.getLoggingRoomsByMember = success => {
      success({
        data: []
      })
    }
    initComponent()
    wrapper.vm.page = 1
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 3', () => {
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    loggingRoomApi.getLoggingRoomsByMember = success => {
      success({
        data: []
      })
    }
    initComponent()
    wrapper.vm.page = 2
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 4', () => {
    loggingRoomApi.getLoggingRoomsByMember = success => {
      success({
        data: [{}, {}, {}]
      })
    }
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    initComponent()
    wrapper.vm.page = 1
    wrapper.vm.loggingRooms.members = [{}, {}, {}]
    wrapper.vm.infiniteHandler($state)
    expect($state.loaded).toHaveBeenCalled()
  })

  test('errorCallBack', () => {
    initComponent()
    global.console.log = jest.fn()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.getErrorCallback('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'Fail to get logging room',
        type: 'is-danger'
      }
    })
  })

  test('searchHandler', () => {
    loggingRoomApi.getLoggingRoomsByMember = success => {
      success({
        data: []
      })
    }
    initComponent()
    wrapper.vm.searchHandler('something')
    expect(wrapper.vm.keyword).toEqual('something')
  })

  test('goToLoggingRoom', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    const loggingRoomId = 'loggingRoomId'
    wrapper.vm.goToLoggingRoomDetail(loggingRoomId)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      { name: 'loggingRoomDetail',
        params: {
          loggingRoomId: loggingRoomId
        }
      })
  })

  test('goToCreate', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToCreate()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({name: 'loggingRoomCreate'})
  })

  test('editLoggingRoom', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    const loggingRoomId = 'loggingRoomId'
    wrapper.vm.editLoggingRoom(loggingRoomId)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      { name: 'loggingRoomEdit',
        params: {
          loggingRoomId: loggingRoomId
        }
      })
  })

  test('openDeleteModal', () => {
    initComponent()
    const loggingRoom = {
      id: 'loggingRoomId',
      title: 'title'
    }
    wrapper.vm.openDeleteModal(loggingRoom)
    expect(wrapper.vm.modalDeleteConfirmation.show).toBe(true)
    expect(wrapper.vm.modalDeleteConfirmation.id).toBe(loggingRoom.id)
    expect(wrapper.vm.modalDeleteConfirmation.title).toBe(loggingRoom.title)
  })

  test('resetDeleteModal', () => {
    initComponent()
    wrapper.vm.resetDeleteModal()
    expect(wrapper.vm.modalDeleteConfirmation.show).toBe(false)
    expect(wrapper.vm.modalDeleteConfirmation.id).toBe('')
    expect(wrapper.vm.modalDeleteConfirmation.title).toBe('')
  })

  test('deleteLoggingRoom', () => {
    const spy = jest.spyOn(LoggingRoom.methods, 'resetDeleteModal')
    loggingRoomApi.deleteLoggingRoom = success => {
      success({
        data: []
      })
    }
    initComponent()
    wrapper.vm.$refs.infiniteLoading = {
      stateChanger: {
        reset: jest.fn()
      }
    }
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.deleteLoggingRoom()
    expect(spy).toHaveBeenCalled()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'success delete logging room',
        type: 'is-success'
      }
    })
  })
})
