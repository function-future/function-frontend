import Chatroom from '@/views/Chatrooms/Chatroom'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('Chatroom', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  function generateLocalVue () {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    return localVue
  }

  function initComponent () {
    const localVue = generateLocalVue()
    const store = new Vuex.Store({
      modules: {
        chatrooms: {
          actions: {
            createChatroom: jest.fn(),
            toast: jest.fn()
          }
        }
      }
    })

    return shallowMount(Chatroom, {
      localVue,
      stubs: ['ChatroomList', 'ChatroomContent', 'ModalChatroom', 'EmptyState', 'Breakpoint'],
      store,
      mocks: {
        $router: {
          push: jest.fn()
        }
      }
    })
  }

  test('onSubmitNewChatroom', () => {
    let wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'createChatroom')
    wrapper.vm.onSubmitNewChatroom()
    expect(spy).toBeCalledTimes(1)
  })

  test('onError', () => {
    let wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.onError()
    expect(spy).toBeCalledTimes(1)
  })

  test('activateChatroom', () => {
    let wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm.$router, 'push')
    let chatroomId = 'chatroomId'
    wrapper.vm.isMobile = true
    wrapper.vm.activateChatroom(chatroomId)
    expect(spy).toBeCalledWith({ name: 'chatroomsMobile', params: { chatroomId } })
  })

  test('activateChatroom 2', () => {
    let wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm.$router, 'push')
    let chatroomId = 'chatroomId'
    wrapper.vm.isMobile = false
    wrapper.vm.activateChatroom(chatroomId)
    expect(spy).not.toHaveBeenCalled()
  })

  test('onSuccessCreateChatroom', () => {
    let wrapper = initComponent()
    let spy1 = jest.spyOn(wrapper.vm, 'activateChatroom').mockImplementation(() => Promise.resolve())
    let spy2 = jest.spyOn(wrapper.vm, 'toast')

    let response = {
      data: {
        id: 'id'
      }
    }
    wrapper.vm.onSuccessCreateChatroom(response)
    expect(spy1).toBeCalledWith(response.data.id)
    expect(spy2).toBeCalledWith({
      data: {
        message: 'Create chatroom success',
        type: 'is-success'
      }
    })
  })

  test('onClickChatroom', () => {
    let wrapper = initComponent()
    let spy = jest.spyOn(wrapper.vm, 'activateChatroom').mockImplementation(() => Promise.resolve())
    let chatroomId = 'chatroomId'
    wrapper.vm.onClickChatroom(chatroomId)
    expect(spy).toBeCalledWith(chatroomId)
  })
})
