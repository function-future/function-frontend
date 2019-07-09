import ActivityBlogForm from '@/views/ActivityBlogs/ActivityBlogForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
import MavonEditor from 'mavon-editor'

describe('ActivityBlogForm', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VeeValidate)
    lv.use(MavonEditor)
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
      }
    }
    const actions = {
      initialState: jest.fn(),
      fetchActivityBlogById: jest.fn(),
      uploadResource: jest.fn()
    }
    const getters = {
      activityBlog: state => state.activityBlog
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
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
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
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon',
        'vue-toasted'
      ],
      mocks: {
        $toasted,
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

  test('failUploadResource', () => {
    wrapper.vm.failUploadResource()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
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
    wrapper.vm.failFetchActivityBlogById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('successCreateActivityBlog', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    const spy = jest.spyOn(wrapper.vm, 'initialState')
    wrapper.vm.successCreateActivityBlog()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failCreateActivityBlog', () => {
    wrapper.vm.failCreateActivityBlog()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('successUpdateActivityBlog', () => {
    const push = jest.fn()
    wrapper.vm.$router.push = push
    const spy = jest.spyOn(wrapper.vm, 'initialState')
    wrapper.vm.successUpdateActivityBlog()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(push).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failUpdateActivityBlog', () => {
    wrapper.vm.failUpdateActivityBlog()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
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
    wrapper.vm.setActivityBlogDetail()
    expect(wrapper.vm.activityBlogDetail.id).toEqual(wrapper.vm.activityBlog.id)
  })

  test('$imgAdd', () => {
    const spy = jest.spyOn(wrapper.vm, 'uploadResource')
    wrapper.vm.$imgAdd()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
