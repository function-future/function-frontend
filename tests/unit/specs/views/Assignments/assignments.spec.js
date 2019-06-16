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
      asssignmentList: [
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
      ]
    }
    const actions = {
      fetchAssignmentList: jest.fn()
    }
    const getters = {
      assignmentList: state => state.assignment
    }
    const store = new Vuex.Store({
      modules: {
        assignments: {
          state,
          actions,
          getters,
          namespaced: true
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
      error: jest.fn()
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

  // test('initPage', () => {
  //   initComponent()
  //   const spy = jest.spyOn(store.actions, 'fetchAssignmentList')
  //   expect(spy).toHaveBeenCalledTimes(1)
  // })

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
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToAssignmentDetail(3, 3)
    expect(wrapper.vm.$router.push).toBeCalledWith({
      name: 'assignmentDetail',
      params: {
        id: 3
      },
      query: {
        batchCode: 3
      }
    })
  })
})
