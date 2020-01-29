import LoggingRoomDetail from '@/views/LoggingRoom/LoggingRoomDetail'
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
        loggingRoomDetail: {
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
    return shallowMount(LoggingRoomDetail, {
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

  test('infiniteHandler case 1', () => {
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    loggingRoomApi.getLoggingRoomTopic = success => {
      success({
        data: []
      })
    }
    initComponent()
    wrapper.vm.page = 1
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 2', () => {
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    loggingRoomApi.getLoggingRoomTopic = success => {
      success({
        data: []
      })
    }
    initComponent()
    wrapper.vm.page = 2
    wrapper.vm.infiniteHandler($state)
    expect($state.complete).toHaveBeenCalled()
  })

  test('infiniteHandler case 3', () => {
    loggingRoomApi.getLoggingRoomTopic = success => {
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
    wrapper.vm.topics = [{}, {}, {}]
    wrapper.vm.infiniteHandler($state)
    expect($state.loaded).toHaveBeenCalled()
  })

  test('errorCallBack', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    global.console.log = jest.fn()
    wrapper.vm.errorCallBack('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'something error',
        type: 'is-danger'
      }
    })
  })

  test('goToLoggingRoom', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    const topicId = 'topicId'
    wrapper.vm.goToLoggingRoom(topicId)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'logMessage',
      params: {
        topicId: topicId
      }
    })
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

  test('closeTopicModal', () => {
    initComponent()
    wrapper.vm.closeTopicModal()
    expect(wrapper.vm.topic.id).toEqual('')
    expect(wrapper.vm.topic.title).toEqual('')
    expect(wrapper.vm.topic.isUpdate).toEqual(false)
    expect(wrapper.vm.topicModal).toEqual(false)
  })

  test('createTopic', () => {
    loggingRoomApi.createTopic = success => {
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
    wrapper.vm.createTopic({})
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'success create topic',
        type: 'is-success'
      }
    })
    expect(wrapper.vm.page).toEqual(1)
    expect(wrapper.vm.topics.length).toEqual(0)
    expect(wrapper.vm.$refs.infiniteLoading.stateChanger.reset).toHaveBeenCalled()
  })

  test('openDeleteModal', () => {
    initComponent()
    const topic = {
      id: 'id',
      title: 'title'
    }
    wrapper.vm.openDeleteModal(topic)
    expect(wrapper.vm.modalDeleteConfirmation.show).toEqual(true)
    expect(wrapper.vm.modalDeleteConfirmation.id).toEqual(topic.id)
    expect(wrapper.vm.modalDeleteConfirmation.title).toEqual(topic.title)
  })

  test('resetDeleteModal', () => {
    initComponent()
    wrapper.vm.resetDeleteModal()
    expect(wrapper.vm.modalDeleteConfirmation.show).toEqual(false)
    expect(wrapper.vm.modalDeleteConfirmation.id).toEqual('')
    expect(wrapper.vm.modalDeleteConfirmation.title).toEqual('')
  })

  test('deleteTopic', () => {
    loggingRoomApi.deleteTopic = success => {
      success({
        data: []
      })
    }
    const spy = jest.spyOn(LoggingRoomDetail.methods, 'resetDeleteModal')
    initComponent()
    wrapper.vm.$refs.infiniteLoading = {
      stateChanger: {
        reset: jest.fn()
      }
    }
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.deleteTopic()
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'success delete the topic',
        type: 'is-danger'
      }
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.$refs.infiniteLoading.stateChanger.reset).toHaveBeenCalled()
    expect(wrapper.vm.page).toEqual(1)
    expect(wrapper.vm.topics.length).toEqual(0)
  })
})
