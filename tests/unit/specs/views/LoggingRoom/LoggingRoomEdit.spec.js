import LoggingRoomEdit from '@/views/LoggingRoom/LoggingRoomEdit'
import {shallowMount} from '@vue/test-utils'
import loggingRoomApi from '@/api/controller/logging-room'

jest.mock('@/api/controller/logging-room')

describe('LoggingRoomEdit', () => {
  let wrapper

  function initWrapper (propsData) {
    const $toasted = {
      error: jest.fn()
    }

    const $route = {
      params: {}
    }

    wrapper = shallowMount(LoggingRoomEdit, {
      stubs: [
        'loggingRoomCreate'
      ],
      propsData: {
        ...propsData
      },
      mocks: {
        $toasted,
        $route
      }
    })
  }

  test('errorCallBack', () => {
    loggingRoomApi.getLoggingRoom = success => {
      success({
        data: []
      })
    }
    global.console.log = jest.fn()
    initWrapper()
    wrapper.vm.errorCallBack('err')
    expect(console.log).toHaveBeenCalledTimes(2)
  })

})
