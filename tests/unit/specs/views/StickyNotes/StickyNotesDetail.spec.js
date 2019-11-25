import { shallowMount, createLocalVue } from '@vue/test-utils'
import StickyNotesDetail from '@/views/StickyNotes/StickyNotesDetail'
import Vuex from 'vuex'

describe('StickyNotesDetail.vue', () => {
  let localVue
  let wrapper
  let store

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    return lv
  }

  function initStore () {
    const state = {
      currentUser: {
        name: 'Karnando'
      },
      announcementList: [
        {
          'id': 'sample-id-1',
          'title': 'Announcements 1',
          'summary': 'Summary goes here. Maximum 70 characters?',
          'description': 'Description goes here. Currently there is no limit to description length.',
          'files': [
            {
              'id': 'sample-id',
              'file': {
                'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
                'thumbnail': null
              }
            }
          ],
          'updatedAt': 1555980050616
        },
        {
          'id': 'sample-id-2',
          'title': 'Announcements 2',
          'summary': 'Summary goes here. Maximum 70 characters?',
          'description': 'Description goes here. Currently there is no limit to description length.',
          'files': [
            {
              'id': 'sample-id',
              'file': {
                'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
                'thumbnail': null
              }
            }
          ],
          'updatedAt': 1555980050616
        }
      ],
      stickyNotes: [{
        title: 'Mock Note',
        description: 'Note for testing purpose',
        updatedAt: '123456789'
      }],
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const actions = {
      fetchAnnouncements: jest.fn(),
      fetchStickyNotes: jest.fn()
    }
    const getters = {
      currentUser: state => state.currentUser,
      accessList: state => state.accessList,
      stickyNotes: state => state.stickyNotes
    }
    const store = new Vuex.Store({
      modules: {
        feeds: {
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
    const $toasted = {
      error: jest.fn()
    }
    const $route = {
      name: 'editStickyNote'
    }
    const $router = {
      push: jest.fn()
    }
    const marked = jest.fn()
    return shallowMount(StickyNotesDetail, {
      ...options,
      store,
      localVue,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon',
        'vue-toasted'
      ],
      propsData: {
        stickyNote: {
          description: 'sticky note description'
        }
      },
      mocks: {
        $toasted,
        $route,
        $router,
        marked
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
    wrapper.destroy()
  })

  test('Sanity Test', () => {
    initComponent()
    expect(true).toBe(true)
  })

  test('Is an instance', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('initPage', () => {
    const initSpy = jest.spyOn(StickyNotesDetail.methods, 'initPage')
    initComponent()
    expect(initSpy).toHaveBeenCalled()
  })

  test('successFetchStickyNote', () => {
    initComponent()
    wrapper.vm.successFetchStickyNote()
    expect(wrapper.vm.stickyNote).toEqual(wrapper.vm.stickyNotes[0])
  })

  test('successFetchStickyNote no stickyNote', () => {
    initComponent()
    store.state.stickyNotes = []
    wrapper.vm.successFetchStickyNote()
    expect(wrapper.vm.stickyNote).toEqual('')
  })

  test('fetchStickyNoteFailed', () => {
    initComponent()
    wrapper.vm.fetchStickyNoteFailed()
    expect(wrapper.vm.$toasted.error).toBeCalledTimes(1)
  })

  test('goToEditStickyNote', () => {
    initComponent()
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToEditStickyNote()
    expect(push).toBeCalled()
  })

  test('stickyNotesDescription computed', async () => {
    initComponent()
    wrapper.vm.stickyNote.description = undefined
    expect(wrapper.vm.stickyNotesDescription).toEqual('Insert Sticky Notes Here...')
  })
})
