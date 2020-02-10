import AssignmentRoomDetail from '@/views/Assignment/AssignmentRoomDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import InfiniteLoading from 'vue-infinite-loading'

describe('AssignmentRoomDetail', () => {
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
      room: {
        assignment: {
          'id': 'ASG0001',
          'title': 'Assignment 1',
          'description': 'Description Number 1',
          'deadline': 15000,
          'file': 'http://function-static.com/ASG0001/fileName.docx',
          'fileId': 'fileId',
          'batch': 3
        }
      },
      comments: [],
      accessList: {},
      currentUser: {}
    }
    const actions = {
      fetchRoomDetail: jest.fn(),
      fetchComments: jest.fn(),
      postComment: jest.fn(),
      postAssignmentScore: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      room: state => state.room,
      comments: state => state.comments,
      accessList: state => state.accessList,
      currentUser: state => state.currentUser
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
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchRoomById()
    expect(spy).toHaveBeenCalledTimes(1)
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
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchComments()
    expect(spy).toHaveBeenCalledTimes(1)
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
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successSubmitComment(response)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.discussion.comment).toEqual('')
    expect(wrapper.vm.discussions).toContain(response)
  })

  test('failSubmitComment', () => {
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failSubmitComment()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('updateScore', () => {
    wrapper.vm.updateScore()
    expect(store.actions.postAssignmentScore).toHaveBeenCalledTimes(1)
  })

  test('successUpdatingScore', () => {
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successUpdatingScore()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failedUpdatingScore', () => {
    const spy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedUpdatingScore()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('isDeadlineHasPassed true computed', () => {
    wrapper.vm.roomDetail.assignment.deadline = new Date().setFullYear(2018, 1, 1)
    expect(wrapper.vm.isDeadlineHasPassed).toEqual(true)
  })

  test('isDeadlineHasPassed false computed', () => {
    wrapper.vm.roomDetail.assignment.deadline = new Date().setFullYear(3000, 1, 1)
    expect(wrapper.vm.isDeadlineHasPassed).toEqual(false)
  })

  test('disableCommentBox is true', () => {
    initComponent()
    store.state.currentUser.role = 'ADMIN'
    expect(wrapper.vm.disableCommentBox).toEqual(true)
  })

  test('disableCommentBox is false', () => {
    initComponent()
    store.state.currentUser.role = 'STUDENT'
    expect(wrapper.vm.disableCommentBox).toEqual(false)
  })

  test('commentBoxPlaceholder with admin logged in', () => {
    initComponent()
    store.state.currentUser.role = 'ADMIN'
    expect(wrapper.vm.commentBoxPlaceholder).toEqual('I\'m sorry, but you can\'t participate in this discussion')
  })

  test('commentBoxPlaceholder with user not an admin', () => {
    initComponent()
    store.state.currentUser.role = 'STUDENT'
    expect(wrapper.vm.commentBoxPlaceholder).toEqual('Ask a question...')
  })
})
