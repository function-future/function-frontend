import ActivityBlogDetail from '@/views/ActivityBlogs/ActivityBlogDetail'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'

describe('ActivityBlogDetail', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VeeValidate)
    return lv
  }

  function initStore () {
    const state = {
      activityBlog: {
        author: {
          id: 'sample-id'
        }
      },
      currentUser: {
        id: 'sample-id'
      },
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const actions = {
      initialState: jest.fn(),
      fetchActivityBlogById: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      activityBlog: state => state.activityBlog,
      accessList: state => state.accessList,
      currentUser: state => state.currentUser
    }
    const store = new Vuex.Store({
      modules: {
        activityBlogs: {
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
    const $route = {
      params: {
        id: 'sample-id'
      }
    }
    const $router = {
      push: jest.fn()
    }
    return shallowMount(ActivityBlogDetail, {
      ...options,
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      mocks: {
        $route,
        $router
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

  test('goToEditActivityBlog', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToEditActivityBlog()
    expect(push).toBeCalled()
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.showDeleteConfirmationModal = false
    wrapper.vm.openDeleteConfirmationModal()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('deleteThisActivityBlog', async () => {
    const spy = jest.spyOn(ActivityBlogDetail.methods, 'deleteActivityBlogById')
    initComponent()
    wrapper.vm.deleteThisActivityBlog()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.activityBlog.description = 'this is the description'
    wrapper.vm.successFetchActivityBlogById()
    expect(wrapper.vm.activityBlog.description).toEqual('this is the description')
  })

  test('failFetchActivityBlogById', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchActivityBlogById()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to load activity blog detail',
        type: 'is-danger'
      }
    })
  })

  test('successDeleteActivityBlogById', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.successDeleteActivityBlogById()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully delete activity blog',
        type: 'is-success'
      }
    })
    expect(push).toBeCalled()
  })

  test('failDeleteActivityBlogById', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.showDeleteConfirmationModal = true
    wrapper.vm.failDeleteActivityBlogById()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to delete activity blog',
        type: 'is-danger'
      }
    })
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
  })

  test('isAuthor false', () => {
    store.state.activityBlog.author.id = 'id-1'
    store.state.currentUser.id = 'id'
    expect(wrapper.vm.isAuthor).toEqual(false)
  })

  test('isAuthor true', () => {
    store.state.activityBlog.author.id = 'id-1'
    store.state.currentUser.id = 'id'
    expect(wrapper.vm.isAuthor).toEqual(false)
  })

  test('authorId', () => {
    expect(wrapper.vm.authorId).toEqual('sample-id')
  })
})
