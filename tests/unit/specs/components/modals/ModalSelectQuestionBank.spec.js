import ModalSelectQuestionBank from '@/components/modals/ModalSelectQuestionBank'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ModalSelectQuestionBank', () => {
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
      questionBanks: [
        {
          id: 'BNK001',
          name: 'BANK1'
        },
        {
          id: 'BNK002',
          name: 'BANK2'
        },
        {
          id: 'BNK003',
          name: 'BANK3'
        }
      ]
    }
    const actions = {
      fetchQuestionBankList: jest.fn(),
      setSelectedBank: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      questionBanks: state => state.questionBanks
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
    return shallowMount(ModalSelectQuestionBank, {
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
        currentlySelected: [
          {
            name: 'BANK1',
            id: 'BNK001'
          },
          {
            name: 'BANK2',
            id: 'BNK002'
          }
        ]
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

  test('initialState', () => {
    initComponent()
    expect(wrapper.vm.selectedBank).toEqual(wrapper.vm.currentlySelected)
    expect(wrapper.vm.selectedId).toEqual(['BNK001', 'BNK002'])
  })

  test('close', () => {
    initComponent()
    wrapper.vm.close()
    expect(wrapper.emitted().close.length).toEqual(1)
  })

  test('select an existing bank', () => {
    initComponent()
    wrapper.vm.selectedId = ['BNK001', 'BNK002']
    wrapper.vm.select('BNK001')
    expect(wrapper.vm.selectedId).toEqual(['BNK002'])
  })

  test('select a non existing bank', () => {
    initComponent()
    wrapper.vm.selectedId = ['BNK001']
    wrapper.vm.select('BNK002')
    expect(wrapper.vm.selectedId).toEqual(['BNK001', 'BNK002'])
  })

  test('selectBanks', () => {
    initComponent()
    wrapper.vm.selectedId = ['BNK001', 'BNK002']
    wrapper.vm.questionBankList = [
      {
        id: 'BNK001',
        name: 'BANK1'
      },
      {
        id: 'BNK002',
        name: 'BANK2'
      },
      {
        id: 'BNK003',
        name: 'BANK3'
      }
    ]
    wrapper.vm.selectBanks()
    expect(wrapper.vm.selectedBank).toEqual([
      {
        id: 'BNK001',
        name: 'BANK1'
      },
      {
        id: 'BNK002',
        name: 'BANK2'
      }
    ])
    expect(wrapper.emitted().selected.length).toEqual(1)
  })

  test('initQuestionBanks', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'fetchQuestionBankList')
    wrapper.vm.initQuestionBanks()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchingBankList', () => {
    initComponent()
    const response = [
      {
        'id': 'BNK001',
      },
      {
        'id': 'BNK002',
      }
    ]
    const paging = {
      page: 1,
      size: 10
    }
    wrapper.vm.state = {
      loaded: jest.fn()
    }
    wrapper.vm.successFetchingBankList(response, paging)
    expect(wrapper.vm.paging).toEqual({
      page: 2,
      pageSize: 10
    })
    expect(wrapper.vm.isLoading).toEqual(false)
  })

  test('successFetchingBankList maximum page', () => {
    initComponent()
    wrapper.vm.questionBankList = []
    const response = []
    const paging = {
      page: 3,
      size: 10
    }
    wrapper.vm.state = {
      loaded: jest.fn(),
      complete: jest.fn()
    }
    wrapper.vm.successFetchingBankList(response, paging)
    expect(wrapper.vm.questionBankList).toEqual(response)
    expect(wrapper.vm.isLoading).toEqual(false)
  })

  test('failedFetchingBankList', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failedFetchingBankList()
    expect(toastSpy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.isLoading).toEqual(false)
  })
})
