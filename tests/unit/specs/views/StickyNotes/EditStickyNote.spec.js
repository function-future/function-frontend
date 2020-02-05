import EditStickyNotes from '@/views/StickyNotes/EditStickyNote'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

describe('EditStickyNotes', () => {
  let store
  let localVue
  let wrapper

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(VeeValidate)
    return lv
  }

  function initStore () {
    const state = {
      stickyNotes: [{
        title: 'Mock Note',
        description: 'Note for testing purpose',
        updatedAt: '123456789'
      }]
    }
    const actions = {
      fetchStickyNotes: jest.fn(),
      postStickyNotes: jest.fn(),
      initialState: jest.fn(),
      toast: jest.fn()
    }
    const getters = {
      stickyNotes: state => state.stickyNotes
    }
    const store = new Vuex.Store({
      modules: {
        stickyNotes: {
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
    return shallowMount(EditStickyNotes, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'b-field',
        'b-input',
        'b-button'
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
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const spy = jest.spyOn(EditStickyNotes.methods, 'initPage')
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('getStickyNoteDetail', () => {
    initComponent()
    const spy = jest.spyOn(wrapper.vm, 'getStickyNoteDetail')
    wrapper.vm.getStickyNoteDetail()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failFetchingStickyNotes', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchingStickyNotes()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to load sticky note detail, , please refresh the page',
        type: 'is-danger'
      }
    })
  })

  test('setStickyNote', () => {
    initComponent()
    wrapper.vm.setStickyNote()
    expect(wrapper.vm.stickyNote).toEqual(store.state.stickyNotes[0])
  })

  test('validateBeforeSubmit is resolved', (done) => {
    initComponent()
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
    initComponent()
    wrapper.vm.validateBeforeSubmit(() => {})
    expect(callback).toHaveBeenCalledTimes(0)
  })

  test('postStickyNote', () => {
    initComponent()
    const validateSpy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.postStickyNote()
    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess', () => {
    initComponent()
    const data = {}
    const spy = jest.spyOn(wrapper.vm, 'postStickyNotes')
    wrapper.vm.validationSuccess(data)
  })

  test('successPostStickyNote', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    const spy = jest.spyOn(wrapper.vm, 'initialState')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successPostStickyNotes()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully created new sticky note',
        type: 'is-success'
      }
    })
  })

  test('failPostStickyNotes', () => {
    initComponent()
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failPostStickyNotes()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to create new sticky note',
        type: 'is-danger'
      }
    })
  })

  test('cancel', () => {
    initComponent()
    wrapper.vm.$router.go = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1)
  })
})
