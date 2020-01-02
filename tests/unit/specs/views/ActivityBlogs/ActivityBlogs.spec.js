import activityBlogs from '@/views/ActivityBlogs/ActivityBlogs'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('ActivityBlogs', () => {
  let store
  let wrapper
  let localVue
  let $route = {
    params: {
      id: 'sample-id'
    },
    query: {
      userId: ''
    }
  }

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    return lv
  }

  function initStore () {
    const state = {
      activityBlog: {},
      activityBlogs: [],
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
      fetchActivityBlogs: jest.fn(),
      fetchUserActivityBlogs: jest.fn(),
      uploadResource: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      activityBlog: state => state.activityBlog,
      activityBlogs: state => state.activityBlogs,
      accessList: state => state.accessList
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
    const $router = {
      push: jest.fn()
    }
    const marked = jest.fn()
    return shallowMount(activityBlogs, {
      ...options,
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      mocks: {
        $route,
        $router,
        marked
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

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage all blogs', () => {
    $route.query.userId = undefined
    const spy = jest.spyOn(wrapper.vm, 'loadActivityBlogList')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initPage user blogs', () => {
    $route.query.userId = 'id-1'
    const spy = jest.spyOn(wrapper.vm, 'loadUserActivityBlogList')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('loadUserActivityBlogList', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchUserActivityBlogs')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('compileToMarkdown', () => {
    expect(wrapper.vm.compileToMarkdown('hello')).toEqual('<p>hello</p>\n')
  })

  test('showLimitedPreviewText > 350 characters', () => {
    const text = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
    expect(wrapper.vm.showLimitedPreviewText(text)).toEqual(text.slice(0, 350) + '...')
  })

  test('goToActivityBlogDetail', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToActivityBlogDetail('sample-id')
    expect(push).toHaveBeenCalledWith({
      name: 'activityBlogDetail',
      params: { id: 'sample-id' }
    })
  })

  test('goToAddActivityBlog', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToAddActivityBlog()
    expect(push).toHaveBeenCalledWith({
      name: 'addActivityBlog'
    })
  })

  test('goToEditActivityBlog', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToEditActivityBlog('sample-id')
    expect(push).toHaveBeenCalledWith({
      name: 'editActivityBlog',
      params: { id: 'sample-id' }
    })
  })

  test('openDeleteConfirmationModal', () => {
    wrapper.vm.openDeleteConfirmationModal('sample-id')
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
    expect(wrapper.vm.selectedId).toEqual('sample-id')
  })

  test('closeDeleteConfirmationModal', () => {
    wrapper.vm.closeDeleteConfirmationModal()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
    expect(wrapper.vm.selectedId).toEqual('')
  })

  test('failLoadActivityBlogList', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failLoadActivityBlogList()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.failLoadActivityBlog).toEqual(true)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to load activity blogs list',
        type: 'is-danger'
      }
    })
  })

  test('deleteThisActivityBlog', () => {
    const closeDeleteConfirmationModalSpy = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    const spy = jest.spyOn(wrapper.vm, 'deleteActivityBlogById')
    wrapper.vm.deleteThisActivityBlog()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(closeDeleteConfirmationModalSpy).toHaveBeenCalledTimes(1)
  })

  test('successDeleteActivityBlogById', () => {
    const loadActivityBlogListSpy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.successDeleteActivityBlogById()
    expect(loadActivityBlogListSpy).toHaveBeenCalledTimes(1)
  })

  test('failDeleteActivityBlogById', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failDeleteActivityBlogById()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to delete activity blog',
        type: 'is-danger'
      }
    })
  })

  test('successLoadActivityBlogList', () => {
    const paging = {
      page: 1,
      size: 10,
      totalRecords: 20
    }
    wrapper.vm.successLoadActivityBlogList(paging)
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.failLoadActivityBlog).toEqual(false)
    expect(wrapper.vm.paging).toEqual(paging)
  })

  test('loadPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    wrapper.vm.loadPage(1)
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('goToUserBlog', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToUserBlog(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('goToActivityBlogs', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToActivityBlogs()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('watch userId', () => {
    const spy = jest.spyOn(wrapper.vm, 'initPage')
    $route.query.userId = 'id-1'
    $route.query.userId = 'id-2'
    wrapper.vm.$nextTick(() => {
      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  test('activityBlogEmpty empty', () => {
    store.state.activityBlogs = []
    expect(wrapper.vm.activityBlogEmpty).toEqual(true)
  })

  test('activityBlogEmpty not empty', () => {
    store.state.activityBlogs = [
      {
        title: 'title'
      }
    ]
    expect(wrapper.vm.activityBlogEmpty).toEqual(false)
  })
})
