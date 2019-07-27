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

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initComponent()
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
    initComponent()
    wrapper.vm.close()
    expect(wrapper.emitted().close.length).toBe(1)
  })

  test('downloadFileFromUrl', () => {
    const spy = jest.spyOn(wrapper.vm, 'downloadFile')
    const url = 'http://localhost:8080/file/function/image.jpg'
    wrapper.vm.downloadFileFromUrl(url)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successDownloadFile', () => {
    const spy = jest.spyOn(wrapper.vm, 'forceFileDownload')
    const res = {}
    global.URL.createObjectURL = jest.fn()
    wrapper.vm.successDownloadFile(res)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failDownloadFile', () => {
    wrapper.vm.failDownloadFile()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })
})
