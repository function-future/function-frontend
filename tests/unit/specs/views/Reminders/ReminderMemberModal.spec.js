import ReminderMemberModal from '@/views/Reminders/ReminderMemberModal'
import { shallowMount } from '@vue/test-utils'
import usersApi from '@/api/controller/users'

jest.mock('@/api/controller/users')

describe('ReminderMemberModal', () => {
  let wrapper

  function initWrapper (propsData) {
    wrapper = shallowMount(ReminderMemberModal, {
      propsData,
      stubs: ['font-awesome-icon', 'SearchBar', 'UserListCard']
    })
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('close', () => {
    initWrapper()
    wrapper.vm.close()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('addMemberHandler', () => {
    initWrapper()
    wrapper.vm.addMemberHandler({})
    expect(wrapper.emitted('addMember')).toBeTruthy()
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  test('enterPressHandler success', () => {
    const spy = jest.spyOn(ReminderMemberModal.methods, 'addMemberHandler')
      .mockImplementation(() => Promise.resolve())
    initWrapper()
    wrapper.vm.users = [1,2,3]
    wrapper.vm.enterPressHandler({ keyCode: 13 })
    expect(spy).toBeCalledTimes(1)
  })

  test('enterPressHandler wrong key', () => {
    const spy = jest.spyOn(ReminderMemberModal.methods, 'addMemberHandler')
      .mockImplementation(() => Promise.resolve())
    initWrapper()
    wrapper.vm.users = [1,2,3]
    wrapper.vm.enterPressHandler({ keyCode: 12 })
    expect(spy).toBeCalledTimes(0)
  })

  test('enterPressHandler no users', () => {
    const spy = jest.spyOn(ReminderMemberModal.methods, 'addMemberHandler')
      .mockImplementation(() => Promise.resolve())
    initWrapper()
    wrapper.vm.users = []
    wrapper.vm.enterPressHandler({ keyCode: 13 })
    expect(spy).toBeCalledTimes(0)
  })

  test('enterPressHandler no users and wrong key', () => {
    const spy = jest.spyOn(ReminderMemberModal.methods, 'addMemberHandler')
      .mockImplementation(() => Promise.resolve())
    initWrapper()
    wrapper.vm.users = []
    wrapper.vm.enterPressHandler({ keyCode: 12 })
    expect(spy).toBeCalledTimes(0)
  })

  test('changeKeyword', () => {
    const spy = jest.spyOn(ReminderMemberModal.methods, 'callSearchUserApi')
      .mockImplementation(() => Promise.resolve())
    initWrapper()
    wrapper.vm.changeKeyword('test')
    expect(spy).toBeCalledTimes(2)
  })

  test('callSearchUserApi', () => {
    const data = []
    usersApi.searchUser = success => {
      success({
        data
      })
    }
    initWrapper()
    wrapper.vm.callSearchUserApi()
    expect(wrapper.vm.users).toEqual(data)
  })

  test('errorHandler', () => {
    global.console.log = jest.fn()
    initWrapper()
    wrapper.vm.errorHandler()
    expect(console.log).toBeCalled()
  })

  test('computed', () => {
    const user1 = {id: 'id1'}
    const user2 = {id: 'id2'}
    initWrapper()
    wrapper.vm.selectedUser = [user1]
    wrapper.vm.users = [user1, user2]
    expect(wrapper.vm.usersWithoutSelectedOne).toEqual([user1, user2])
  })
})
