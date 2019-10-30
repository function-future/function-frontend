import BatchForm from '@/views/Batches/BatchForm'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

describe('BatchForm', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(VeeValidate)
    return lv
  }

  function initStore () {
    const state = {
      batchList: [
        {
          'id': 'sample-id-1',
          'code': '1',
          'name': 'Batch 1'
        },
        {
          'id': 'sample-id-2',
          'code': '2',
          'name': 'Batch 2'
        },
        {
          'id': 'sample-id-3',
          'code': '3',
          'name': 'Batch 3'
        },
        {
          'id': 'sample-id-4',
          'code': '4',
          'name': 'Batch 3'
        }
      ]
    }
    const actions = {
      fetchBatches: jest.fn(),
      deleteBatch: jest.fn(),
      fetchBatchById: jest.fn()
    }
    const getters = {
      batchList: state => state.batchList
    }
    const store = new Vuex.Store({
      modules: {
        batches: {
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
    return shallowMount(BatchForm, {
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
        editMode: true
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
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage editMode', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchBatch')
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('initPage add new', () => {
    wrapper.vm.editMode = false
    wrapper.vm.initPage()
  })

  test('fetchBatch', () => {
    const spy = jest.spyOn(wrapper.vm, 'fetchBatchById')
    wrapper.vm.fetchBatch()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successFetchBatchById', () => {
    const res = {
      'id': 'sample-id',
      'name': 'Batch Name',
      'code': '3'
    }
    wrapper.vm.successFetchBatchById(res)
    expect(wrapper.vm.batch).toEqual(res)
  })

  test('failFetchBatchById', () => {
    wrapper.vm.failFetchBatchById()
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

  test('sabe', () => {
    const validateSpy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.save()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess editMode true', () => {
    wrapper.vm.editMode = true
    const spy = jest.spyOn(wrapper.vm, 'updateBatch')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess editMode false', () => {
    wrapper.vm.editMode = false
    const spy = jest.spyOn(wrapper.vm, 'createBatch')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successCreateOrEditBatch', () => {
    wrapper.vm.editMode = false
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreateOrEditBatch()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'batches' })
  })

  test('successCreateOrEditBatch editMode', () => {
    wrapper.vm.editMode = true
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successCreateOrEditBatch()
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'batches' })
  })

  test('failCreateOrEditBatch', () => {
    wrapper.vm.editMode = false
    wrapper.vm.failCreateOrEditBatch()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('failCreateOrEditBatch editMode', () => {
    wrapper.vm.editMode = true
    wrapper.vm.failCreateOrEditBatch()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('cancel', () => {
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'batches' })
  })
})
