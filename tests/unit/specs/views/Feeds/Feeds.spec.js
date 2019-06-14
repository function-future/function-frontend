import Feeds from '@/views/Feeds/Feeds'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Assignment', () => {
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
      stickyNotes: {
        noteTitle: 'Mock Note',
        noteDescription: 'Note for testing purpose',
        updatedAt: '123456789'
      }
    }
    const actions = {
      fetchAnnouncements: jest.fn(),
      fetchStickyNotes: jest.fn()
    }
    const getters = {
      announcementList: state => state.announcementList,
      stickyNotes: state => state.stickyNotes
    }
    const store = new Vuex.Store({
      modules: {
        feeds: {
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
      error: jest.fn()
    }
    return shallowMount(Feeds, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'BaseInput',
        'BaseSelect',
        'font-awesome-icon',
        'vue-toasted'
      ],
      mocks: {
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
    jest.restoreAllMocks()
  })

  test('Rendered correctly', () => {
    initComponent()
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('goToStickyNotesDetail', () => {
    initComponent()
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToStickyNotesDetail()
    expect(push).toBeCalled()
  })

  test('goToAnnouncementPage', () => {
    initComponent()
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToAnnouncementPage()
    expect(push).toBeCalled()
  })

  test('goToAnnouncementDetail', () => {
    initComponent()
    const push = jest.fn()
    wrapper.vm.$router.push = push
    wrapper.vm.goToAnnouncementDetail()
    expect(push).toBeCalled()
  })

  test('successLoadStickyNote', () => {
    initComponent()
    wrapper.vm.successLoadStickyNote()
    expect(wrapper.vm.stickyNote).toBe(wrapper.vm.stickyNotes)
  })

  test('failLoadStickyNote', () => {
    initComponent()
    wrapper.vm.failLoadStickyNote()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('successLoadAnnouncementList', () => {
    initComponent()
    wrapper.vm.successLoadAnnouncementList()
    expect(wrapper.vm.announcements).toBe(wrapper.vm.announcementList)
  })

  test('failLoadAnnouncementList', () => {
    initComponent()
    wrapper.vm.failLoadAnnouncementList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
