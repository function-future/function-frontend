import ModalChatroom from '@/views/Chatrooms/ModalChatroom'
import { shallowMount } from '@vue/test-utils'
import chatroomApi from '@/api/controller/chatrooms'
import userApi from '@/api/controller/users'

jest.mock('@/api/controller/chatrooms')
jest.mock('@/api/controller/users')

describe('ModalChatroom', () => {
  const user1 = {
    id: 'id1',
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
    const wrapper = shallowMount(ModalChatroom, {
      propsData: {
        chatroomId: 'idChatroom'
      },
      stubs: ['font-awesome-icon']
    })

    expect(wrapper.vm.usersWithoutSelectedOne).toEqual([user2])
  })

  test('convertToListUserId', () => {
    const wrapper = shallowMount(ModalChatroom, { stubs: ['font-awesome-icon'] })
    const test = [user1.id, user2.id].every(val => wrapper.vm.convertToListUserId([user1, user2]).includes(val))
    expect(test).toBe(true)
  })

  test('close event', () => {
    const wrapper = shallowMount(ModalChatroom, { stubs: ['font-awesome-icon'] })
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

    const wrapper = shallowMount(ModalChatroom, {
      stubs: ['font-awesome-icon'],
      propsData: {
        chatroomId: 'idChatroom'
      }
    })
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

    const wrapper = shallowMount(ModalChatroom, {
      stubs: ['font-awesome-icon'],
      propsData: {
        chatroomId: 'idChatroom'
      }
    })
    wrapper.vm.create()
    expect(wrapper.emitted()).toBeTruthy()
  })

  test('changeKeyword', () => {
    const wrapper = shallowMount(ModalChatroom, { stubs: ['font-awesome-icon'] })
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

    const wrapper = shallowMount(ModalChatroom, {
      stubs: ['font-awesome-icon'],
      propsData: {
        chatroomId: 'idChatroom'
      }
    })

    wrapper.vm.enterPressed({ keyCode: 13 })
    expect(wrapper.emitted()).toBeTruthy()
  })
})
