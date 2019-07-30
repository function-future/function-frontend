import ModalFileDetail from '@/components/modals/ModalFileDetail'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ModalFileDetail', () => {
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
    const state = {}
    const actions = {
      getFileDetail: jest.fn()
    }
    const getters = {}
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
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(ModalFileDetail, {
      ...options,
      store,
      localVue,
      router,
      propsData: {
        isUploading: true,
        list: []
      },
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
    wrapper.vm.failGetFileDetail()
    expect(wrapper.vm.isLoading).toEqual(false)
    expect(wrapper.vm.fileDetail).toEqual({})
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
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
    wrapper.vm.successUpdateFile()
    expect(wrapper.vm.isUploading).toEqual(false)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failUpdateFile', () => {
    wrapper.vm.failUpdateFile()
    expect(wrapper.vm.isUploading).toEqual(false)
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('openRenameFileFolderModal', () => {
    const title = 'sampe title 1'
    wrapper.vm.openRenameFileFolderModal(title)
    expect(wrapper.vm.showRenameFileFolderModal).toEqual(true)
  })

  test('closeRenameFileFolderModal', () => {
    wrapper.vm.showRenameFileFolderModal = true
    wrapper.vm.closeRenameFileFolderModal()
    expect(wrapper.vm.showRenameFileFolderModal).toEqual(false)
  })

  test('renameFileFolderFromModal', () => {
    const title = 'new title 2'
    const spy = jest.spyOn(wrapper.vm, 'updateFile')
    wrapper.vm.renameFileFolderFromModal(title)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successRenameFile', () => {
    const spy = jest.spyOn(wrapper.vm, 'closeRenameFileFolderModal')
    wrapper.vm.successRenameFile()
    expect(wrapper.vm.showRenameFileFolderModal).toEqual(false)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failRenameFile', () => {
    const spy = jest.spyOn(wrapper.vm, 'closeRenameFileFolderModal')
    wrapper.vm.failRenameFile()
    expect(wrapper.vm.showRenameFileFolderModal).toEqual(false)
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
