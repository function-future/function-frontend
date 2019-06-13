import EditStickyNotes from '@/views/StickyNotes/EditStickyNote'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import MavonEditor from 'mavon-editor'

describe('EditStickyNotes', () => {
  let store
  let localVue
  let wrapper

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    lv.use(VeeValidate)
    lv.use(MavonEditor)
    return lv
  }

  function initStore () {
    const state = {
      stickyNotes: {
        noteTitle: 'Mock Note',
        noteDescription: 'Note for testing purpose',
        updatedAt: '123456789'
      }
    }
    const actions = {
      fetchStickyNotes: jest.fn(),
      postStickyNotes: jest.fn(),
      initialState: jest.fn()
    }
    const getters = {
      stickyNotes: state => state.stickyNote
    }
    const store = new Vuex.Store({
      modules: {
        stickyNotes: {
          state,
          actions,
          getters,
          namespaced: true
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
    return shallowMount(EditStickyNotes, {
      ...options,
      store,
      localVue,
      router,
      mocks: {
        $toasted
      },
      stubs: [
        'BaseInput',
        'BaseButton',
        'mavon-editor'
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
    wrapper.vm.failFetchingStickyNotes()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
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
    const setSpy = jest.spyOn(wrapper.vm, 'setStickyNote')
    const validateSpy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.postStickyNote()
    expect(setSpy).toHaveBeenCalledTimes(1)
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
    const spy = jest.spyOn(wrapper.vm, 'initialState')
    wrapper.vm.successPostStickyNotes()
    expect(spy).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
  })

  test('failPostStickyNotes', () => {
    initComponent()
    wrapper.vm.failPostStickyNotes()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('cancel', () => {
    initComponent()
    wrapper.vm.$router.go = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.go).toHaveBeenCalledTimes(1)
  })
})
