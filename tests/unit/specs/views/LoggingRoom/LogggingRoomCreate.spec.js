import LoggingRoomCreate from '@/views/LoggingRoom/LoggingRoomCreate'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import loggingRoomApi from '@/api/controller/logging-room'
import VueRouter from 'vue-router'

jest.mock('@/api/controller/logging-room')

describe('LoggingRoomCreate', () => {

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
    const store = new Vuex.Store({
      state,
      getters
    })

    return {
      store,
      state,
      getters
    }
  }

  function initWrapper (store, propsData, options) {
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }

    const router = new VueRouter([])
    return shallowMount(LoggingRoomCreate, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseInput',
        'BaseTextArea',
        'UserSimpleCard',
        'ReminderMemberModal',
        'BaseButton',
        'loggingRoomApi',
        'font-awesome-icon'
      ],
      propsData: {
        ...propsData
      },
      mocks: {
        $toasted
      },
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

  test('remove participant', () => {
    initComponent({
      members: [{}, {}]
    })
    const index = 1
    wrapper.vm.removeParticipant(index)
    expect(wrapper.vm.membersTemp.length).toEqual(1)
  })

  test('add participant', () => {
    initComponent({
      members: [{}, {}]
    })
    wrapper.vm.addParticipant({})
    expect(wrapper.vm.membersTemp.length).toEqual(3)
  })

  test('saveLoggingRoom case 1', () => {
    initComponent({
      title: '',
      description: '',
      members: []
    })
    wrapper.vm.saveLoggingRoom()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('saveLoggingRoom case 2', () => {
    initComponent({
      title: 'a',
      description: '',
      members: []
    })
    wrapper.vm.saveLoggingRoom()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('saveLoggingRoom case 3', () => {
    initComponent({
      title: '',
      description: 'a',
      members: []
    })
    wrapper.vm.saveLoggingRoom()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('saveLoggingRoom case 4', () => {
    initComponent({
      title: '',
      description: '',
      members: [{}]
    })
    wrapper.vm.saveLoggingRoom()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('saveLoggingRoom case 5', () => {
    initComponent({
      title: 'a',
      description: 'a',
      members: []
    })
    wrapper.vm.saveLoggingRoom()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('saveLoggingRoom case 6', () => {
    initComponent({
      title: 'a',
      description: '',
      members: [{}]
    })
    wrapper.vm.saveLoggingRoom()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('saveLoggingRoom case 7', () => {
    initComponent({
      title: '',
      description: 'a',
      members: [{}]
    })
    wrapper.vm.saveLoggingRoom()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('saveLoggingRoom case 8', () => {
    loggingRoomApi.createLoggingRoom = success => {
      success({
        data: []
      })
    }
    initComponent({
      title: 'a',
      description: 'a',
      members: [{}],
      isEdit: false
    })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.saveLoggingRoom()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'loggingRoom' })
  })

  test('saveLoggingRoom case 9', () => {
    loggingRoomApi.updateLoggingRoom = success => {
      success({
        data: []
      })
    }
    initComponent({
      title: 'a',
      description: 'a',
      members: [{}],
      isEdit: true
    })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.saveLoggingRoom()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'loggingRoom' })
  })

  test('errorCallBack', () => {
    initComponent()
    global.console.log = jest.fn()
    wrapper.vm.errorCallBack('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('computedMember', () => {
    initComponent({
      members: [{ id: '1' }, { id: '2' }]
    })
    expect(wrapper.vm.computedMembers().length).toEqual(2)
  })
})

