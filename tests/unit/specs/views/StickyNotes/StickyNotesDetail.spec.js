import { shallowMount, createLocalVue } from '@vue/test-utils'
import StickyNotesDetail from '@/views/StickyNotes/StickyNotesDetail'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('StickyNotesDetail.vue', () => {
  let wrapper
  let actions
  let getters
  let state
  let store
  const initPage = jest.fn()
  beforeEach(() => {
    state = {
      stickyNote: {
        title: 'Mock Note',
        description: 'Note for testing purpose',
        updatedAt: '123456789'
      }
    }
    actions = {
      fetchStickyNotes: jest.fn(() => true)
    }
    getters = {
      stickyNotes: state => state.stickyNote
    }
    store = new Vuex.Store({
      modules: {
        stickyNotes: {
          state,
          actions,
          getters
        }
      }
    })
    wrapper = shallowMount(StickyNotesDetail, {
      store,
      localVue,
      methods: {
        initPage
      },
      sync: false
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Is an instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Render template correctly', () => {
    expect(wrapper.find('.header').text()).toBe('Mock Note')
  })

  test('Render components correctly', () => {
    expect(wrapper.html()).toContain('basecard')
  })
})

describe('StickyNotesDetail.js', () => {
  let wrapper
  let actions
  let getters
  let state
  let store
  beforeEach(() => {
    state = {
      stickyNote: {
        title: 'Mock Note',
        description: 'Note for testing purpose',
        updatedAt: '123456789'
      }
    }
    actions = {
      fetchStickyNotes: jest.fn()
    }
    getters = {
      stickyNotes: state => state.stickyNote
    }
    store = new Vuex.Store({
      modules: {
        stickyNotes: {
          state,
          actions,
          getters
        }
      }
    })
  })

  test('initPage', () => {
    const initSpy = jest.spyOn(StickyNotesDetail.methods, 'initPage')
    wrapper = shallowMount(StickyNotesDetail, {
      store,
      localVue,
      sync: false
    })
    expect(initSpy).toHaveBeenCalled()
  })

  test('fetchStickyNoteFailed', () => {
    const $toasted = {
      error: jest.fn()
    }
    wrapper = shallowMount(StickyNotesDetail, {
      store,
      localVue,
      mocks: {
        $toasted
      },
      sync: false
    })
    wrapper.vm.fetchStickyNoteFailed()
    expect($toasted.error).toBeCalledTimes(1)
  })

  test('goToAddStickyNotes', async () => {
    const $route = {
      name: 'editStickyNote'
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(StickyNotesDetail, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.find('.add-btn').trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$route.name).toBe($route.name)
  })

  test('stickyNotesDescription computed', async () => {
    const $route = {
      name: 'editStickyNote'
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(StickyNotesDetail, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.stickyNotes.description = undefined
    expect(wrapper.vm.stickyNotesDescription).toEqual('Insert Sticky Notes Here...')
  })
})
