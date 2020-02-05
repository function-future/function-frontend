import ActivityBlogForm from '@/views/ActivityBlogs/ActivityBlogForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'

describe('ActivityBlogForm', () => {
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
        'id': 'sample-id-1',
        'title': 'Activity Blog Title 5',
        'description': '**Description** in markdown format goes here',
        'files': [
          {
            'id': 'sample-id',
            'file': {
              'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'thumbnail': null
            }
          }
        ],
        'author': {
          'id': 'sample-id',
          'name': 'Student 1'
        }
      },
      currentUser: {
        id: 'sample-id'
      }
    }
    const actions = {
      initialState: jest.fn(),
      fetchActivityBlogById: jest.fn(),
      uploadResource: jest.fn(),
      createActivityBlog: jest.fn(),
      updateActivityBlog: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      activityBlog: state => state.activityBlog,
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
    const editMode = false
    return shallowMount(ActivityBlogForm, {
      ...options,
      store,
      localVue,
      stubs: [
        'b-button',
        'b-field',
        'b-input'
      ],
      mocks: {
        $route,
        $router
      },
      propsData: { editMode },
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
    jest.clearAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage', () => {
    const spy = jest.spyOn(wrapper.vm, 'initialState')
    const getActivityBlogDetailSpy = jest.spyOn(wrapper.vm, 'getActivityBlogDetail')
    wrapper.vm.editMode = true
    wrapper.vm.initPage()
    expect(spy).toBeCalledTimes(1)
    expect(getActivityBlogDetailSpy).toBeCalledTimes(1)
  })

  test('$imgAdd', () => {
    const spy = jest.spyOn(wrapper.vm, 'uploadResource')
    wrapper.vm.$imgAdd()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUploadResource', () => {
    wrapper.vm.$refs = {
      editor: {
        addImage: jest.fn()
      }
    }
    const response = {
      id: 'id-1',
      file: {
        full: 'google.com/images'
      }
    }
    wrapper.vm.successUploadResource(response)
    expect(wrapper.vm.imageIds).toEqual(['id-1'])
  })

  test('failUploadResource', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failUploadResource()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to upload image, please delete the image and re-upload',
        type: 'is-danger'
      }
    })
  })

  test('sendActivityBlog', () => {
    wrapper.vm.sendActivityBlog()
  })

  test('sendCreateActivityBlogData', async () => {
    const data = { ...wrapper.vm.activityBlogDetail }
    const spy = jest.spyOn(wrapper.vm, 'createActivityBlog')
    wrapper.vm.sendCreateActivityBlogData(data)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('sendUpdateActivityBlogData', async () => {
    const data = { ...wrapper.vm.activityBlogDetail }
    const spy = jest.spyOn(wrapper.vm, 'updateActivityBlog')
    wrapper.vm.sendUpdateActivityBlogData(data)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('cancel', async () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.cancel()
    expect(push).toHaveBeenCalledTimes(1)
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

  test('successCreateActivityBlog', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    const spy = jest.spyOn(wrapper.vm, 'initialState')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successCreateActivityBlog()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledTimes(1)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully created new activity blog',
        type: 'is-success'
      }
    })
  })

  test('failCreateActivityBlog', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failCreateActivityBlog()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to create new activity blog',
        type: 'is-danger'
      }
    })
  })

  test('successUpdateActivityBlog', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    const push = jest.fn()
    wrapper.vm.$router.push = push
    const spy = jest.spyOn(wrapper.vm, 'initialState')
    wrapper.vm.successUpdateActivityBlog()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledTimes(1)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully update activity blog',
        type: 'is-success'
      }
    })
  })

  test('failUpdateActivityBlog', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failUpdateActivityBlog()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to update activity blog',
        type: 'is-danger'
      }
    })
  })

  test('validateBeforeSubmit is resolved', (done) => {
    const callback = jest.fn()
    wrapper.vm.$validator.validateAll = jest.fn().mockResolvedValue(true)
    wrapper.vm.validateBeforeSubmit(callback)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$validator.validateAll).toHaveBeenCalledTimes(1)
      done()
    })
  })

  test('validateBeforeSubmit is rejected', () => {
    const callback = jest.fn()
    wrapper.vm.validateBeforeSubmit(() => {})
    expect(callback).toHaveBeenCalledTimes(0)
  })

  test('validationSuccess editMode false', () => {
    wrapper.vm.editMode = false
    const spy = jest.spyOn(wrapper.vm, 'sendCreateActivityBlogData')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess editMode true', () => {
    wrapper.vm.editMode = true
    const spy = jest.spyOn(wrapper.vm, 'sendUpdateActivityBlogData')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('setActivityBlogDetail', () => {
    const spy = jest.spyOn(wrapper.vm, 'checkCurrentUser')
    wrapper.vm.setActivityBlogDetail()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.activityBlogDetail.id).toEqual(wrapper.vm.activityBlog.id)
  })

  test('checkCurrentUser is author', () => {
    store.state.currentUser.id = 'sample-id'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.checkCurrentUser()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(0)
  })

  test('checkCurrentUser is not author', () => {
    store.state.currentUser.id = ''
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.checkCurrentUser()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('checkCurrentUser is admin', () => {
    store.state.currentUser.id = ''
    store.state.currentUser.role = 'ADMIN'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.checkCurrentUser()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(0)
  })

  test('$imgAdd', () => {
    const spy = jest.spyOn(wrapper.vm, 'uploadResource')
    wrapper.vm.$imgAdd()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
