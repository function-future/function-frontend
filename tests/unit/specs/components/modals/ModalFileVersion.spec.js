import ModalFileVersion from '@/components/modals/ModalFileVersion'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ModalFileVersion', () => {
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
      currentUser: { id: 'id' },
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const actions = {
      getFileDetail: jest.fn(),
      downloadFile: jest.fn(),
      updateFile: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      accessList: state => state.accessList,
      currentUser: state => state.currentUser
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
    return shallowMount(ModalFileVersion, {
      ...options,
      store,
      localVue,
      router,
      propsData: {
        isUploading: true,
        id: 'id'
      },
      stubs: [
        'b-icon',
        'b-button',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ],
      sync: false
    })
  }

  function initComponent () {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = createWrapper(store.store)
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    initComponent()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('successGetFileDetail', () => {
    const res = {
      'paths': ['root', 'parent-id'],
      'content': {
        'id': 'id',
        'type': 'FILE',
        'name': 'File Name',
        'file': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
        'versions': {
          '2': {
            'timestamp': 1555980050616,
            'url': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'
          },
          '1': {
            'timestamp': 1555980054000,
            'url': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'
          }
        },
        'parentId': 'parent-id',
        'author': {
          'id': 'sample-id',
          'name': 'Karnando Sepryan'
        }
      }
    }
    wrapper.vm.successGetFileDetail(res)
    expect(wrapper.vm.fileDetail).toEqual(res.content)
    expect(wrapper.vm.isLoading).toEqual(false)
  })

  test('failGetFileDetail', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failGetFileDetail()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.fileDetail).toEqual({})
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to get file detail, please try again',
        type: 'is-danger'
      }
    })
  })

  test('close', () => {
    wrapper.vm.close()
    expect(wrapper.emitted().close.length).toBe(1)
  })

  test('onFileChange', () => {
    const spy = jest.spyOn(wrapper.vm, 'upload')
    const e = {
      target: {
        files: [
          {
            name: 'test.png',
            size: 2000000,
            type: 'image/png'
          }
        ]
      }
    }
    wrapper.vm.onFileChange(e)
    expect(wrapper.vm.isUploading).toEqual(true)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('upload', () => {
    wrapper.vm.fileDetail.id = 'id-20'
    const file = {
      name: 'file name'
    }
    const spy = jest.spyOn(wrapper.vm, 'updateFile')
    wrapper.vm.upload(file)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUpdateFile', () => {
    const spy = jest.spyOn(wrapper.vm, 'initData')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successUpdateFile()
    expect(wrapper.vm.isUploading).toEqual(false)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully updated file',
        type: 'is-success'
      }
    })
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failUpdateFile', () => {
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failUpdateFile()
    expect(wrapper.vm.isUploading).toEqual(false)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to update file, please try again',
        type: 'is-danger'
      }
    })
  })
})
