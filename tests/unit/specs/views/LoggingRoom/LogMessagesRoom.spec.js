import LogMessagesRoom from '@/views/LoggingRoom/LogMessageRoom'
import { shallowMount } from '@vue/test-utils'
import loggingRoomApi from '@/api/controller/logging-room'
import moment from 'moment'

jest.mock('@/api/controller/logging-room')

describe('LogMessageRoom', () => {
  let wrapper

  function initWrapper (propsData) {
    wrapper = shallowMount(LogMessagesRoom, {
      stubs: [
        'BaseButton',
        'InfiniteLoading',
        'Base'
      ],
      propsData: {
        title: 'title',
        description: 'description',
        ...propsData
      },
      mocks: {
        $router
      }
    })

  }




})
