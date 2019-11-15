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
    const state = {
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const actions = {
      fetchUsersByRole: jest.fn(),
      fetchUsersByRoleAndName: jest.fn(),
      setStudentList: jest.fn(),
      setAdminList: jest.fn(),
      setMentorList: jest.fn(),
      setJudgeList: jest.fn(),
      deleteUserById: jest.fn()
    }
    const getters = {
      accessList: state => state.accessList
    }
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
        'b-button',
        'b-input',
        'b-field',
        'b-pagination',
        'b-tab-item',
        'b-tabs',
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

  test('successGetUserList', () => {
    initComponent()
    const response = {
      data: [
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
      ],
      paging: {
        page: 1,
        totalRecords: 100,
        size: 10
      }
    }
    wrapper.vm.successGetUserList(response)
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.userList).toEqual(response.data)
  })

  test('failGetUserList', () => {
    initComponent()
    wrapper.vm.failGetUserList()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('goToAddUser student', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.activeTab = 0
    wrapper.vm.goToAddUser()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'addStudent' })
  })

  test('goToAddUser != student', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.activeTab = 3
    wrapper.vm.goToAddUser()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'addUser',
      query: { role: 'JUDGE' }
    })
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
    const closeDeleteConfirmationModalSpy = jest.spyOn(Users.methods, 'closeDeleteConfirmationModal')
    initComponent()
    wrapper.vm.deleteThisUser()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(closeDeleteConfirmationModalSpy).toHaveBeenCalledTimes(1)
  })

  test('successDeleteUserById', () => {
    initComponent()
    wrapper.vm.successDeleteUserById()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failDeleteUserById', () => {
    initComponent()
    wrapper.vm.failDeleteUserById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('loadPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.loadPage(1)
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('searchHandler current page = 1', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 1
    wrapper.vm.searchHandler()
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('searchHandler current page > 1', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.searchHandler()
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('batch user is student', () => {
    initComponent()
    const user = {
      role: 'STUDENT',
      batch: {
        name: 'Batch Name'
      }
    }
    expect(wrapper.vm.batch(user)).toEqual(user.batch.name)
  })

  test('batch user is not student', () => {
    initComponent()
    const user = {
      role: 'MENTOR'
    }
    expect(wrapper.vm.batch(user)).toEqual('')
  })

  test('currentTab', () => {
    initComponent()
    const tab = 1
    wrapper.vm.activeTab = tab
    expect(wrapper.vm.currentTab).toEqual(wrapper.vm.tabs[tab].value)
  })
})
