import { shallowMount, createLocalVue } from '@vue/test-utils'
import StickyNotesDetail from '@/views/StickyNotes/StickyNotesDetail'
import Vuex from 'vuex'
import { stickyNotes }from '@/store/modules/stickyNotes'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('StickyNotesDetail.vue', () => {
  let actions
  let getters
  let state
  let store
  beforeEach(() => {
    state = {
      stickyNote: {
        noteTitle: 'Mock Note',
        noteDescription: 'Note for testing purpose',
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

  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('Is an instance', () => {
    const wrapper = shallowMount(StickyNotesDetail, {
      store,
      localVue
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Render template correctly', () => {
    const wrapper = shallowMount(StickyNotesDetail, {
      store,
      localVue
    })
    expect(wrapper.find('.header').text()).toBe('Mock Note')
  })

  test('Render components correctly', () => {
    const wrapper = shallowMount(StickyNotesDetail, {
      store,
      localVue
    })
    expect(wrapper.html()).toContain('basecard')
  })
})

