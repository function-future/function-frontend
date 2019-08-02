import addAssignment from '@/views/Assignment/AddAssignment'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VCalendar from 'v-calendar'
import VeeValidate from 'vee-validate'
import mavonEditor from 'mavon-editor'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VCalendar)
localVue.use(VeeValidate)
localVue.use(mavonEditor)

describe('AddAssignment', () => {
  let actions
  let state
  let store

  beforeAll(() => {
    window.matchMedia = window.matchMedia || (() => {
      return {
        matches : false,
        addListener : jest.fn(),
        removeListener: jest.fn()
      }
    })
  })

  beforeEach(() => {
    state = {
      assignment: {
        title: '',
        description: '',
        deadline: new Date(),
        batch: 'Batch 3'
      }
    }
    actions = {
      createAssignment: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        assignments: {
          state,
          actions
        }
      }
    })
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('cancel', () => {
    const go = jest.fn()
    const $router = {
      go: jest.fn()
    }
    const wrapper = mount(addAssignment, {
      store,
      localVue,
      mocks: {
        $router
      },
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    wrapper.vm.$router.go = go
    wrapper.vm.cancel()
    expect(go).toBeCalledTimes(1)
  })

  test('saveAssignment', () => {
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
      mocks: {
        $route: {
          params: {
            batchCode: '1'
          }
        }
      },
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar',
        'vee-validate'
      ],
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'createAssignment')
    wrapper.vm.saveAssignment()
    expect(actions.createAssignment.mock.calls).toHaveLength(1)
    expect(spy).toHaveBeenCalled()
  })

  test('failCreatingAssignment', () => {
    const response = {
      'code': '500',
      'status': 'Internal server error'
    }
    const $toasted = {
      error: jest.fn()
    }
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
      mocks: {
        $toasted
      },
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    wrapper.vm.failCreatingAssignment({response})
    expect($toasted.error).toBeCalledTimes(1)
  })

  test('successCreatingAssignment', () => {
    const response = {
      'code': '200',
      'status': 'Success'
    }
    const $toasted = {
      success: jest.fn()
    }
    const $router = {
      push: jest.fn()
    }
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
      mocks: {
        $router,
        $toasted
      },
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    wrapper.vm.successCreateAssignment({response})
    expect($toasted.success).toHaveBeenCalledTimes(1)
    expect($router.push).toHaveBeenCalledTimes(1)
  })

  test('onFileChange', () => {
    const spy = jest.spyOn(wrapper.vm, 'materialUpload')
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

  test('materialUpload', () => {
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'uploadMaterial')
    const file = {
      name: 'test.png',
      size: 2000000,
      type: 'image/png'
    }
    wrapper.vm.materialUpload(file)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUploadMaterial', () => {
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    const response = {
      'id': 'sample-id',
      'name': 'File Name',
      'file': {
        'full': 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
        'thumbnail': null
      }
    }
    wrapper.vm.file.name = 'sample-file-name'
    wrapper.vm.successUploadMaterial(response)
    expect(wrapper.vm.uploadingFile).toEqual(false)
    expect(wrapper.vm.assignment.file).toEqual(response.id)
    expect(wrapper.vm.filePreviewName).toEqual('sample-file-name')
  })

  test('failUploadMaterial', () => {
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
      mocks: {
        $toasted: {
          error: jest.fn()
        }
      },
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    wrapper.vm.failUploadMaterial()
    expect(wrapper.vm.uploadingFile).toEqual(false)
    expect(wrapper.vm.filePreviewName).toEqual('Fail to upload material, please try again')
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
