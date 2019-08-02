import AssignmentRoomDetail from '@/views/Assignment/AssignmentRoomDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import InfiniteLoading from 'vue-infinite-loading'

describe('CourseDetail', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(InfiniteLoading)
    return lv
  }

  function initStore () {
    const state = {
      room: {},
      comments: [],
      accessList: {}
    }
    const actions = {
      fetchRoomDetail: jest.fn(),
      fetchComments: jest.fn(),
      postComment: jest.fn(),
      postAssignmentScore: jest.fn()
    }
    const getters = {
      room: state => state.room,
      comments: state => state.comments,
      accessList: state => state.accessList
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
    const $state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    return shallowMount(AssignmentRoomDetail, {
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
        $toasted,
        $state
      },
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  beforeEach(() => {
    initComponent()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchRoomDetail')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchRoomById', () => {
    wrapper.vm.successFetchRoomById()
    expect(wrapper.vm.roomDetail).toEqual(wrapper.vm.room)
  })

  test('failFetchRoomById', () => {
    wrapper.vm.failFetchRoomById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('initDiscussion', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchComments')
    wrapper.vm.initDiscussion()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchComments', () => {
    const response = []
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchComments(response, paging)
    expect(wrapper.vm.discussions).toEqual(response)
  })

  test('successFetchComments maximum page', () => {
    const response = [
      {
        'id': 'sample-id-1',
        'author': {
          'id': 'sample-id',
          'name': 'Oliver Sebastian'
        },
        'comment': 'Comment Example 12',
        'createdAt': 1580000000
      },
      {
        'id': 'sample-id-2',
        'author': {
          'id': 'sample-id',
          'name': 'David William Kurnia'
        },
        'comment': 'Comment Example 11',
        'createdAt': 1570000000
      }
    ]
    const paging = {
      page: 2,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchComments(response, paging)
    expect(wrapper.vm.discussions).toEqual(response)
  })

  test('failFetchComments', () => {
    wrapper.vm.failFetchComments()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('submitComment', () => {
    const spy = jest.spyOn(wrapper.vm, 'postComment')
    wrapper.vm.submitComment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successSubmitComment', () => {
    const response = {
      'id': 'sample-id-2',
      'author': {
        'id': 'sample-id',
        'name': 'David William Kurnia'
      },
      'comment': 'Comment Example 11',
      'createdAt': 1570000000
    }
    wrapper.vm.successSubmitComment(response)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.discussion.comment).toEqual('')
    expect(wrapper.vm.discussions).toContain(response)
  })

  test('failSubmitComment', () => {
    wrapper.vm.failSubmitComment()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('updateScore', () => {
    wrapper.vm.updateScore()
    expect(store.actions.postAssignmentScore).toHaveBeenCalledTimes(1)
  })

  test('successUpdatingScore', () => {
    wrapper.vm.successUpdatingScore()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failedUpdatingScore', () => {
    wrapper.vm.failedUpdatingScore()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
