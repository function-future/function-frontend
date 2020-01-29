import LoggingRoomEdit from '@/views/LoggingRoom/LoggingRoomEdit'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

jest.mock('@/api/controller/logging-room')

describe('LoggingRoomEdit', () => {
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
    const actions = {
      toast: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        LoggingRoomEdit: {
          actions
        }
      }
    })
    return {
      store,
      actions
    }
  }

  function initWrapper (store, propsData, options) {
    const router = new VueRouter([])
    wrapper = shallowMount(LoggingRoomEdit, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'loggingRoomCreate',
        'b-loading',
        'b-field',
        'b-input',
        'b-select',
        'b-button'
      ],
      propsData: {
        ...propsData
      },
      sync: false
    })
    return wrapper
  }

  function initComponent (propsData) {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = initWrapper(store.store, propsData)
  }

  test('errorCallBack', () => {
    initComponent()
    global.console.log = jest.fn()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.errorCallBack('err')
    expect(console.log).toHaveBeenCalledWith('err')
    expect(toastSpy).toBeCalledWith({
      data: {
        message: 'something error',
        type: 'is-danger'
      }
    })
  })
})
