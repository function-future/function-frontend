import Files from '@/views/Files/Files'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Files', () => {
  let store
  let wrapper
  let localVue
  let $route = {
    params: {
      id: 'sample-id'
    }
  }

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
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
    const $router = {
      push: jest.fn()
    }
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(Files, {
      ...options,
      store,
      localVue,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon'
      ],
      mocks: {
        $route,
        $router,
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

  test('initPage', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchFiles')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchFiles with data', () => {
    initComponent()
    const res = {
      'paths': [
        {
          'id': 'root',
          'name': 'root'
        },
        {
          'id': 'parent-id',
          'name': 'Parent ID'
        }
      ],
      'content': [
        {
          'id': 'parent-id-1',
          'type': 'FOLDER',
          'name': 'Parent Id 1',
          'parentId': 'parent-id',
          'author': {
            'id': 'sample-id',
            'name': 'name'
          }
        },
        {
          'id': 'id-5',
          'type': 'FILE',
          'name': 'File Name This',
          'file': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
          'versions': {
            '2': {
              'timestamp': 1555980050616,
              'url': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'
            },
            '1': {
              'timestamp': 1555980050616,
              'url': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png'
            }
          },
          'parentId': 'parent-id',
          'author': {
            'id': 'sample-id',
            'name': 'name'
          }
        }
      ]
    }
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    const spy = jest.spyOn(wrapper.vm.state, 'loaded')
    wrapper.vm.successFetchFiles(res)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchFiles with empty data', () => {
    initComponent()
    const res = {
      'paths': [
        {
          'id': 'root',
          'name': 'root'
        },
        {
          'id': 'parent-id',
          'name': 'Parent ID'
        }
      ],
      'content': []
    }
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    const spy = jest.spyOn(wrapper.vm.state, 'complete')
    wrapper.vm.successFetchFiles(res)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failFetchFiles', () => {
    initComponent()
    wrapper.vm.failFetchFiles()
    expect(wrapper.vm.fileList).toEqual([])
    expect(wrapper.vm.folderList).toEqual([])
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('resetPage', () => {
    initComponent()
    wrapper.vm.resetPage()
    expect(wrapper.vm.paging.page).toEqual(1)
    expect(wrapper.vm.fileList).toEqual([])
    expect(wrapper.vm.folderList).toEqual([])
  })

  test('showLimitedPreviewText > 15 characters', () => {
    initComponent()
    const text = 'This text length is more than 15 characters'
    expect(wrapper.vm.showLimitedPreviewText(text)).toEqual(text.slice(0, 15) + '...')
  })

  test('showLimitedPreviewText < 15 characters', () => {
    initComponent()
    const text = 'less 15 chars'
    expect(wrapper.vm.showLimitedPreviewText(text)).toEqual(text)
  })

  test('goToFolder', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToFolder('sample-id')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'folder',
      params: { parentId: 'sample-id' }
    })
  })

  test('goToFolder no id', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToFolder('')
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(0)
  })

  test('openFileDetail', () => {
    initComponent()
    const id = 'sample-id'
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.openFileDetail(id)
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('closeFileDetail', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.closeFileDetail()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('openDeleteConfirmationModal', () => {
    initComponent()
    const id = 'sample-id'
    const type = 'FILE'
    wrapper.vm.openDeleteConfirmationModal(id, type)
    expect(wrapper.vm.selectedId).toEqual(id)
    expect(wrapper.vm.selectedFileType).toEqual(type.toLowerCase())
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(true)
  })

  test('onFileChange', () => {
    initComponent()
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
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('upload', () => {
    initComponent()
    const file = {
      name: 'file name'
    }
    const spy = jest.spyOn(wrapper.vm, 'uploadFile')
    wrapper.vm.upload(file)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUploadFile', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'resetPage')
    wrapper.vm.fileUploadList = [
      {
        name: 'file name 1',
        progress: 0
      }
    ]
    wrapper.vm.successUploadFile()
    expect(wrapper.vm.fileUploadList[0].progress).toEqual(101)
    expect(wrapper.vm.isUploading).toEqual(false)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failUploadFile file < 200 MB', () => {
    initComponent()
    wrapper.vm.fileUploadList = [
      {
        name: '',
        progress: 0
      }
    ]
    wrapper.vm.file = {
      size: 20000000
    }
    wrapper.vm.failUploadFile()
    expect(wrapper.vm.fileUploadList[0].progress).toEqual(102)
    expect(wrapper.vm.isUploading).toEqual(false)
  })

  test('failUploadFile show alert if exceed 200 MB', () => {
    initComponent()
    wrapper.vm.fileUploadList = [
      {
        name: '',
        progress: 0
      }
    ]
    wrapper.vm.file = {
      size: 200000001
    }
    wrapper.vm.failUploadFile()
    expect(wrapper.vm.fileUploadList[0].progress).toEqual(103)
    expect(wrapper.vm.isUploading).toEqual(false)
  })

  test('closeFileUploadModal', () => {
    initComponent()
    wrapper.vm.closeFileUploadModal()
    expect(wrapper.vm.fileUploadList).toEqual([])
    expect(wrapper.vm.showFileUploadModal).toEqual(false)
  })

  test('createFolderFromModal', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'createFolder')
    wrapper.vm.createFolderFromModal('Folder Name')
    expect(wrapper.vm.showCreateModal).toEqual(false)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCreateFolder', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'resetPage')
    wrapper.vm.successCreateFolder()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failCreateFolder', () => {
    initComponent()
    wrapper.vm.failCreateFolder()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('deleteThisFile', () => {
    initComponent()
    const closeDeleteConfirmationModalSpy = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    const spy = jest.spyOn(wrapper.vm, 'deleteFile')
    wrapper.vm.deleteThisFile()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(closeDeleteConfirmationModalSpy).toHaveBeenCalledTimes(1)
  })

  test('successDeleteFile', () => {
    initComponent()
    wrapper.vm.successDeleteFile()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
  })

  test('failDeleteFile', () => {
    initComponent()
    wrapper.vm.failDeleteFile()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
  })

  test('closeDeleteConfirmationModal', () => {
    initComponent()
    wrapper.vm.closeDeleteConfirmationModal()
    expect(wrapper.vm.showDeleteConfirmationModal).toEqual(false)
    expect(wrapper.vm.selectedId).toEqual('')
  })

  test('openRenameFileFolderModal', () => {
    initComponent()
    const id = 'sample-id'
    const title = 'sampe title 1'
    const type = 'FOLDER'
    wrapper.vm.openRenameFileFolderModal(id, title, type)
    expect(wrapper.vm.showRenameFileFolderModal).toEqual(true)
    expect(wrapper.vm.selectedId).toEqual(id)
    expect(wrapper.vm.currentTitle).toEqual(title)
    expect(wrapper.vm.selectedType).toEqual(type)
  })

  test('closeRenameFileFolderModal', () => {
    initComponent()
    wrapper.vm.showRenameFileFolderModal = true
    wrapper.vm.selectedId = 'sample-id'
    wrapper.vm.currentTitle = 'sampe title 1'
    wrapper.vm.selectedType = 'FOLDER'
    wrapper.vm.closeRenameFileFolderModal()
    expect(wrapper.vm.showRenameFileFolderModal).toEqual(false)
    expect(wrapper.vm.selectedId).toEqual('')
    expect(wrapper.vm.currentTitle).toEqual('')
    expect(wrapper.vm.selectedType).toEqual('')
  })

  test('renameFileFolderFromModal', () => {
    initComponent()
    const title = 'new title 2'
    const spy = jest.spyOn(wrapper.vm, 'updateFile')
    wrapper.vm.renameFileFolderFromModal(title)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUpdateFile', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'closeRenameFileFolderModal')
    wrapper.vm.successUpdateFile()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failUpdateFile', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'closeRenameFileFolderModal')
    wrapper.vm.failUpdateFile()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('computed breadcrumbs length < 4', () => {
    initComponent()
    wrapper.vm.paths = [
      {
        'id': 'root',
        'name': 'root'
      },
      {
        'id': 'parent-id',
        'name': 'Parent ID'
      },
      {
        'id': 'parent-id-1',
        'name': 'Parent ID 1'
      }
    ]
    expect(wrapper.vm.breadcrumbs).toEqual(wrapper.vm.paths)
  })

  test('computed breadcrumbs length > 4', () => {
    initComponent()
    wrapper.vm.paths = [
      {
        'id': 'root',
        'name': 'root'
      },
      {
        'id': 'parent-id',
        'name': 'Parent ID'
      },
      {
        'id': 'parent-id-1',
        'name': 'Parent ID 1'
      },
      {
        'id': 'parent-id-2',
        'name': 'Parent ID 2'
      },
      {
        'id': 'parent-id-3',
        'name': 'Parent ID 3'
      },
      {
        'id': 'parent-id-4',
        'name': 'Parent ID 4'
      }
    ]
    const expectedResult = [
      {
        'id': 'root',
        'name': 'root'
      },
      {
        'id': 'parent-id',
        'name': 'Parent ID'
      },
      {
        'name': '...'
      },
      {
        'id': 'parent-id-3',
        'name': 'Parent ID 3'
      },
      {
        'id': 'parent-id-4',
        'name': 'Parent ID 4'
      }
    ]
    expect(wrapper.vm.breadcrumbs).toEqual(expectedResult)
  })

  test('computed FileDetail have params id', () => {
    initComponent()
    expect(wrapper.vm.FileDetail).toEqual('ModalFileDetail')
  })

  test('computed FileDetail no params id', () => {
    $route = {
      params: {}
    }
    initComponent()
    expect(wrapper.vm.FileDetail).toEqual('')
  })
})
