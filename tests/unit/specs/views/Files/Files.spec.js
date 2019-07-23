import Files from '@/views/Files/Files'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Files', () => {
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
      files: [],
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      },
      currentUser: {
        role: 'ADMIN'
      }
    }
    const actions = {
      fetchFiles: jest.fn(),
      createFolder: jest.fn(),
      uploadFile: jest.fn(),
      deleteFile: jest.fn(),
      downloadFile: jest.fn()
    }
    const getters = {
      files: state => state.files,
      accessList: state => state.accessList,
      currentUser: state => state.currentUser
    }
    const store = new Vuex.Store({
      modules: {
        files: {
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
    return shallowMount(Files, {
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

  beforeEach(() => {
    initComponent()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
