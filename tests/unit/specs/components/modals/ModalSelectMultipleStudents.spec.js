import ModalSelectMultipleStudents from '@/components/modals/ModalSelectMultipleStudents'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ModalSelectMultipleStudents', () => {
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
      students: []
    }
    const actions = {
      getBatchReport: jest.fn(),
      setStudentList: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      students: state => state.students
    }
    const store = new Vuex.Store({
      state,
      actions,
      getters
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
    return shallowMount(ModalSelectMultipleStudents, {
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
      propsData: {
        currentlySelected: []
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
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('close', () => {
    initComponent()
    wrapper.vm.close()
    expect(wrapper.emitted().close.length).toEqual(1)
  })

  test('select an already selected ID with 3 IDs already selected', () => {
    initComponent()
    wrapper.vm.selectedId = ['1', '2', '3']
    wrapper.vm.select('3')
    expect(wrapper.vm.selectedId).toEqual(['1', '2'])
  })

  test('select another ID with 3 IDs already selected', () => {
    initComponent()
    wrapper.vm.selectedId = ['1', '2', '3']
    wrapper.vm.select('4')
    expect(wrapper.vm.selectedId).toEqual(['1', '2', '3'])
  })

  test('select with only 2 IDs already selected', () => {
    initComponent()
    wrapper.vm.selectedId = ['1', '2']
    wrapper.vm.select('3')
    expect(wrapper.vm.selectedId).toEqual(['1', '2', '3'])
  })

  test('selectStudents', () => {
    initComponent()
    wrapper.vm.selectedId = ['1', '2', '3']
    wrapper.vm.studentList = [
      {
        id: '1',
        name: 'John'
      },
      {
        id: '2',
        name: 'Jane'
      },
      {
        id: '3',
        name: 'Doe'
      },
      {
        id: '4',
        name: 'Appleseed'
      }
    ]
    wrapper.vm.selectStudents()
    expect(wrapper.vm.selectedStudents).toEqual([
      {
        id: '1',
        name: 'John'
      },
      {
        id: '2',
        name: 'Jane'
      },
      {
        id: '3',
        name: 'Doe'
      }
    ])
    expect(wrapper.emitted().selected[0].length).toEqual(1)
  })

  test('initStudents', () => {
    initComponent()
    const spy = jest.spyOn(store.actions, 'getBatchReport')
    wrapper.vm.initStudents()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingStudentList', () => {
    initComponent()
    const response = {
      "code": 200,
      "status": "OK",
      "data": [
        {
          'id': 'sample-id-student',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 1',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        },
        {
          'id': 'sample-id-2',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 2',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        },
        {
          'id': 'sample-id-3',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 3',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        },
        {
          'id': 'sample-id-4',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 4',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        },
        {
          'id': 'sample-id-5',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 5',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        },
        {
          'id': 'sample-id-6',
          'role': 'STUDENT',
          'email': 'user@user.com',
          'name': 'User Student 6',
          'phone': '088888888888',
          'address': 'Jl. Address 1 Address 2',
          'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          'batch': {
            'id': 'sample-id',
            'name': 'Batch Name',
            'code': '3'
          },
          'university': 'Bina Nusantara University'
        }
      ],
      'paging': {
        'page': 1,
        'size': 10,
        'totalRecords': 20
      }
    }
    store.state.students = response.data
    wrapper.vm.state = {
      loaded: jest.fn()
    }
    wrapper.vm.successFetchingStudentList(response)
    expect(wrapper.vm.paging).toEqual(response.paging)
  })

  test('successFetchingStudentList maximum page', () => {
    initComponent()
    const response = {
      "code": 200,
      "status": "OK",
      "data": [],
      'paging': {
        'page': 3,
        'size': 10,
        'totalRecords': 20
      }
    }
    store.state.students = response.data
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchingStudentList(response)
    expect(wrapper.vm.studentList).toEqual(response.data)
  })

  test('failedFetchingStudentList', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedFetchingStudentList()
    expect(toastSpy).toHaveBeenCalledTimes(1)
  })
})
