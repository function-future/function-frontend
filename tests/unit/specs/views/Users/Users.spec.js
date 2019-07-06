import Users from '@/views/Users/Users'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Users', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore () {
    const state = {}
    const actions = {
      fetchUsersByRole: jest.fn()
    }
    const getters = {}
    const store = new Vuex.Store({
      modules: {
        users: {
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

  function createWrapper (store, options) {
    const router = new VueRouter([])
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(Users, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ],
      mocks: {
        $toasted
      },
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
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

  test('changeTab', () => {
    const spy = jest.spyOn(Users.methods, 'fetchTabList')
    initComponent()
    wrapper.vm.changeTab('student')
    expect(wrapper.vm.currentTab).toEqual('student')
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('successGetUserList student', () => {
    const spy = jest.spyOn(Users.methods, 'setStudentList')
    initComponent()
    const response = [
      {
        'id': 'sample-id-student',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      },
      {
        'id': 'sample-id-2',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      }
    ]
    wrapper.vm.currentTab = 'student'
    wrapper.vm.successGetUserList(response)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successGetUserList admin', () => {
    const spy = jest.spyOn(Users.methods, 'setAdminList')
    initComponent()
    const response = [
      {
        'id': 'sample-id-admin',
        'role': 'ADMIN',
        'email': 'user@user.com',
        'name': 'User ADMIN 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-2',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ]
    wrapper.vm.currentTab = 'admin'
    wrapper.vm.successGetUserList(response)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successGetUserList mentor', () => {
    const spy = jest.spyOn(Users.methods, 'setMentorList')
    initComponent()
    const response = [
      {
        'id': 'sample-id-mentor',
        'role': 'MENTOR',
        'email': 'user@user.com',
        'name': 'User ADMIN 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-2',
        'role': 'MENTOR',
        'email': 'user@user.com',
        'name': 'User Student 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ]
    wrapper.vm.currentTab = 'mentor'
    wrapper.vm.successGetUserList(response)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successGetUserList judge', () => {
    const spy = jest.spyOn(Users.methods, 'setJudgeList')
    initComponent()
    const response = [
      {
        'id': 'sample-id-judge',
        'role': 'JUDGE',
        'email': 'user@user.com',
        'name': 'User ADMIN 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-2',
        'role': 'MENTOR',
        'email': 'user@user.com',
        'name': 'User Student 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ]
    wrapper.vm.currentTab = 'judge'
    wrapper.vm.successGetUserList(response)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failGetUserList', () => {
    initComponent()
    wrapper.vm.failGetUserList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('goToAddUser student', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.currentTab = 'student'
    wrapper.vm.goToAddUser()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'addStudent' })
  })

  test('goToAddUser != student', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.currentTab = 'judge'
    wrapper.vm.goToAddUser()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'addUser' })
  })

  test('goToEditUser STUDENT', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    const id = 'sample-id'
    const role = 'STUDENT'
    wrapper.vm.goToEditUser(id, role)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editStudent',
      params: { id: 'sample-id' }
    })
  })

  test('goToEditUser role != STUDENT', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    const id = 'sample-id'
    const role = 'JUDGE'
    wrapper.vm.goToEditUser(id, role)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'editUser',
      params: { id: 'sample-id' }
    })
  })

  test('openDeleteConfirmationModal', () => {
    initComponent()
    const id = 'sample-id'
    wrapper.vm.openDeleteConfirmationModal(id)
    expect(wrapper.vm.selectedId).toEqual(id)
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('deleteThisUser', () => {
    const spy = jest.spyOn(Users.methods, 'deleteUserById')
    initComponent()
    wrapper.vm.deleteThisUser()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeleteUserById', () => {
    const spy = jest.spyOn(Users.methods, 'closeDeleteConfirmationModal')
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successDeleteUserById()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'users' })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failDeleteUserById', () => {
    const spy = jest.spyOn(Users.methods, 'closeDeleteConfirmationModal')
    initComponent()
    wrapper.vm.failDeleteUserById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.loadPage(1)
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadPreviousPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadPreviousPage()
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadNextPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadNextPage()
    expect(wrapper.vm.paging.page).toEqual(3)
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
