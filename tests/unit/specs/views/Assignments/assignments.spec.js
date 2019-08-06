import assignment from '@/views/Assignment/Assignments'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Assignment', () => {
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
      assignmentList: [
        {
          'id': 'ASG0001',
          'title': 'Assignment 1',
          'description': 'Description Number 1',
          'deadline': 15000000,
          'batch': 3,
          'uploadedDate': 15000000000
        },
        {
          'id': 'ASG0002',
          'title': 'Assignment 2',
          'description': 'Description Number 2',
          'deadline': 30000000,
          'batch': 3,
          'uploadedDate': 30000000000
        }
      ],
      accessLIst: {}
    }
    const actions = {
      fetchAssignmentList: jest.fn(),
      deleteAssignmentById: jest.fn(),
      copyAssignment: jest.fn()
    }
    const getters = {
      assignmentList: state => state.assignmentList,
      accessList: state => state.accessLIst
    }
    const store = new Vuex.Store({
      state,
      actions,
      getters
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
    return shallowMount(assignment, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon',
        'vue-toasted'
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
    const spy = jest.spyOn(assignment.methods, 'initPage')
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingAssignmentList', () => {
    initComponent()
    const payload = {
      "page": 1,
      "size": 10,
      "totalRecords": 13
    }
    wrapper.vm.successFetchingAssignmentList(payload)
    expect(wrapper.vm.paging).toEqual(payload)
  })

  test('addAssignment', () => {
    const push = jest.fn()
    initComponent()
    wrapper.vm.$router.push = push
    wrapper.vm.addAssignment()
    expect(push).toHaveBeenLastCalledWith({ name: 'addAssignment' })
  })

  test('failFetchingAssignmentList', () => {
    initComponent()
    const response = {
      'code': 500,
      'status': 'Internal server error',
      'data': []
    }
    wrapper.vm.$toasted.error = jest.fn()
    wrapper.vm.failFetchingAssignmentList({ response })
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('isComplete true', () => {
    initComponent()
    expect(wrapper.vm.isComplete(new Date(15000))).toBe('Done')
  })

  test('isComplete false', () => {
    initComponent()
    expect(wrapper.vm.isComplete(new Date())).toBe('Ongoing')
  })

  test('goToAssignmentDetail', () => {
    initComponent()
    wrapper.vm.$route.params.batchCode = '1'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToAssignmentDetail(3, 3)
    expect(wrapper.vm.$router.push).toBeCalledWith({
      name: 'assignmentDetail',
      params: {
        assignmentId: 3,
        batchCode: '1'
      },
    })
  })

  test('openDeleteConfirmationModal', () => {
    initComponent()
    wrapper.vm.openDeleteConfirmationModal('sample-id')
    expect(wrapper.vm.selectedId).toEqual('sample-id')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('closeDeleteConfirmationModal', () => {
    initComponent()
    wrapper.vm.closeDeleteConfirmationModal()
    expect(wrapper.vm.selectedId).toEqual('')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('deleteThisAssignment', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'deleteAssignmentById')
    wrapper.vm.deleteThisAssignment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDeletingAssignment', () => {
    initComponent()
    const routerSpy = jest.spyOn(wrapper.vm.$router, 'push')
    const closeDeleteConfirmationModal = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    wrapper.vm.successDeletingAssignment()
    expect(routerSpy).toHaveBeenCalledWith({ name: 'assignments' })
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(closeDeleteConfirmationModal).toHaveBeenCalledTimes(1)
  })

  test('failedDeletingAssignment', () => {
    initComponent()
    wrapper.vm.failDeletingAssignment()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('loadPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.loadPage(1)
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadPreviousPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadPreviousPage()
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadNextPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.paging.page = 2
    wrapper.vm.loadNextPage()
    expect(wrapper.vm.paging.page).toEqual(3)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('openCopyModal', () => {
    initComponent()
    wrapper.vm.openCopyModal('sample-id')
    expect(wrapper.vm.selectedId).toEqual('sample-id')
    expect(wrapper.vm.showCopyModal).toEqual(true)
  })

  test('closeCopyModal', () => {
    initComponent()
    wrapper.vm.closeCopyModal()
    expect(wrapper.vm.selectedId).toEqual('')
    expect(wrapper.vm.showCopyModal).toEqual(false)
  })

  test('submitCopyModal batchDestination not yet selected', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'copyAssignment')
    wrapper.vm.submitCopyModal('')
    expect(spy).not.toHaveBeenCalled()
  })

  // test('submitCopyModal have selected batchDestination', () => {
  //   initComponent()
  //   console.log(wrapper.vm.AssignmentList)
  //   const spy = jest.spyOn(wrapper.vm, 'copyAssignment')
  //   wrapper.vm.submitCopyModal('sample-id')
  //   expect(spy).toHaveBeenCalledTimes(1)
  // })
//  TODO: UNIT TEST THIS

  test('successSubmitCopyAssignment', () => {
    initComponent()
    wrapper.vm.successSubmitCopyAssignment()
    expect(wrapper.vm.selectedId).toEqual('')
    expect(wrapper.vm.showCopyModal).toEqual(false)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failSubmitCopyAssignment', () => {
    initComponent()
    wrapper.vm.failSubmitCopyAssignment()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
