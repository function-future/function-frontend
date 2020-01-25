import ModalChatroom from '@/views/Chatrooms/ModalChatroom'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import chatroomApi from '@/api/controller/chatrooms'
import userApi from '@/api/controller/users'
import Vuex from 'vuex'

jest.mock('@/api/controller/chatrooms')
jest.mock('@/api/controller/users')

describe('ModalChatroom', () => {
  let wrapper
  const user1 = {
    id: 'idUser',
    name: 'Priagung'
  }

  const user2 = {
    id: 'id2',
    name: 'Ricky'
  }

  const user3 = {
    id: 'id3',
    name: 'Dion'
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  function generateLocalVue () {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    return localVue
  }

  function initComponent (withoutChatroom) {
    const localVue = generateLocalVue()
    const store = new Vuex.Store({
      modules: {
        auth: {
          state: { currentUser: { id: 'idUser' } },
          getters: { currentUser: state => state.currentUser }
        },
        chatrooms: {
          actions: {
            uploadGroupImage: jest.fn(),
            fetchDetailChatroom: jest.fn(),
            toast: jest.fn()
          }
        }
      }
    })

    wrapper = shallowMount(ModalChatroom, {
      propsData: !withoutChatroom ? {
        chatroomId: 'idChatroom'
      } : {},
      localVue,
      stubs: ['font-awesome-icon'],
      store
    })
  }

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('usersWithoutSelectedOne computed', () => {
    chatroomApi.getChatroomDetails = (success) => {
      success({
        code: 200,
        status: 'OK',
        data: {
          type: 'GROUP',
          name: 'Group Name',
          members: [
            user1
          ]
        }
      })
    }

    userApi.searchUser = (success) => {
      success({
        code: 200,
        status: 'OK',
        data: [
          user1, user2
        ]
      })
    }

    initComponent({
      propsData: {
        chatroomId: 'idChatroom'
      }
    })

    expect(wrapper.vm.usersWithoutSelectedOne).toEqual([user2])
  })

  test('convertToListUserId', () => {
    initComponent()
    const test = [user1.id, user2.id].every(val => wrapper.vm.convertToListUserId([user1, user2]).includes(val))
    expect(test).toBe(true)
  })

  test('close event', () => {
    initComponent()
    wrapper.vm.close()
    expect(wrapper.emitted().close).toBeTruthy()
  })

  test('create wrong name', () => {
    chatroomApi.getChatroomDetails = (success) => {
      success({
        code: 200,
        status: 'OK',
        data: {
          type: 'GROUP',
          name: '',
          members: [
            user1,
            user3
          ]
        }
      })
    }

    userApi.searchUser = (success) => {
      success({
        code: 200,
        status: 'OK',
        data: [
          user1, user2, user3
        ]
      })
    }

    initComponent()
    wrapper.vm.selectedUsers = [1,2,3]

    wrapper.vm.create()
    expect(wrapper.vm.wrongName).toBe(true)
  })

  test('create success', () => {
    chatroomApi.getChatroomDetails = (success) => {
      success({
        code: 200,
        status: 'OK',
        data: {
          type: 'GROUP',
          name: 'Huyu',
          members: [
            user1,
            user3
          ]
        }
      })
    }

    userApi.searchUser = (success) => {
      success({
        code: 200,
        status: 'OK',
        data: [
          user1, user2, user3
        ]
      })
    }

    initComponent()

    wrapper.vm.create()
    expect(wrapper.emitted()).toBeTruthy()
  })

  test('changeKeyword', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'callSearchUserApi')
    wrapper.vm.changeKeyword('test')
    expect(spy).toHaveBeenCalled()
  })

  test('enterPressed', () => {
    chatroomApi.getChatroomDetails = (success) => {
      success({
        code: 200,
        status: 'OK',
        data: {
          type: 'GROUP',
          name: 'Huyu',
          members: [
            user1,
            user3
          ]
        }
      })
    }

    initComponent()

    wrapper.vm.enterPressed({ keyCode: 13 })
    expect(wrapper.emitted()).toBeTruthy()
  })

  test('enterSearchHandler', () => {
    const event = { keyCode: 13 }
    initComponent()
    wrapper.vm.nameMember = 'name'
    wrapper.vm.users = [user2]
    wrapper.vm.selectedUsers = []
    wrapper.vm.enterSearchHandler(event)
    expect(wrapper.vm.selectedUsers[0].id).toEqual(user2.id)
  })

  test('enterSearchHandler wrong keycode', () => {
    const event = { keyCode: 12 }
    initComponent()
    wrapper.vm.nameMember = 'name'
    wrapper.vm.users = [user2]
    wrapper.vm.selectedUsers = []
    wrapper.vm.enterSearchHandler(event)
    expect(wrapper.vm.selectedUsers.length).toEqual(0)
  })

  test('enterSearchHandler without name member', () => {
    const event = { keyCode: 13 }
    initComponent()
    wrapper.vm.nameMember = ''
    wrapper.vm.users = [user2]
    wrapper.vm.selectedUsers = []
    wrapper.vm.enterSearchHandler(event)
    expect(wrapper.vm.selectedUsers.length).toEqual(0)
  })

  test('enterSearchHandler without name member and wrong keycode', () => {
    const event = { keyCode: 12 }
    initComponent()
    wrapper.vm.nameMember = ''
    wrapper.vm.users = [user2]
    wrapper.vm.selectedUsers = []
    wrapper.vm.enterSearchHandler(event)
    expect(wrapper.vm.selectedUsers.length).toEqual(0)
  })

  test('error handler', () => {
    initComponent()
    global.console.error = jest.fn()
    wrapper.vm.errorHandler('test')
    expect(console.error).toBeCalledTimes(1)
  })

  test('created without chatroomId', () => {
    const spy = jest.spyOn(ModalChatroom.methods, 'callSearchUserApi')
    initComponent(true)
    expect(spy).toBeCalledTimes(1)
  })

  test('onFileChange', () => {
    const spy = jest.spyOn(ModalChatroom.methods, 'uploadGroupImage')
    initComponent(true)
    wrapper.vm.onFileChange({
      target: {
        files: ['asdfas']
      }
    })
    expect(spy).toBeCalledTimes(1)
  })

  test('successUploadGroupPicture', () => {
    const response = {
      id: 'id',
      file: {
        full: 'full'
      }
    }
    initComponent(true)
    wrapper.vm.successUploadGroupPicture(response)
    expect(wrapper.vm.picture).toEqual(response.file.full)
    expect(wrapper.vm.chatroom.picture).toEqual(response.id)
  })

  test('failUploadGroupPicture', () => {
    const spy = jest.spyOn(ModalChatroom.methods, 'toast')
    initComponent(true)
    wrapper.vm.failUploadGroupPicture()
    expect(spy).toBeCalledWith({
      data: {
        message: 'Fail to upload image, please try again',
        type: 'is-danger'
      }
    })
  })

  test('fetchDetailChatroomCallback 1', () => {
    const spy = jest.spyOn(ModalChatroom.methods, 'callSearchUserApi').mockImplementation(() => Promise.resolve())
    const response = {
      data: {
        picture: {
          id: 'id',
          file: {
            full: 'full'
          }
        },
        members: [{
          id: 'id'
        }]
      }
    }
    initComponent(true)
    wrapper.vm.fetchDetailChatroomCallback(response)
    expect(spy).toBeCalledWith('')
    expect(wrapper.vm.picture).toEqual('full')
    expect(wrapper.vm.chatroom.picture).toEqual('id')
  })

  test('fetchDetailChatroomCallback 2', () => {
    const spy = jest.spyOn(ModalChatroom.methods, 'callSearchUserApi').mockImplementation(() => Promise.resolve())
    const response = {
      data: {
        picture: null,
        members: [{
          id: 'id'
        }]
      }
    }
    initComponent(true)
    wrapper.vm.fetchDetailChatroomCallback(response)
    expect(spy).toBeCalledWith('')
    expect(wrapper.vm.picture).toEqual(null)
    expect(wrapper.vm.chatroom.picture).toEqual(null)
  })
})
