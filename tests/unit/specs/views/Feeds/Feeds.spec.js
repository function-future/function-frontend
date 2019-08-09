import Feeds from '@/views/Feeds/Feeds'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('Feeds', () => {
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
      stickyNotes: [{
        title: 'Mock Note',
        description: 'Note for testing purpose',
        updatedAt: '123456789'
      }]
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
      error: jest.fn()
    }
    const marked = jest.fn()
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
      propsData: {
        stickyNote: {
          description: 'sticky note description'
        }
      },
      mocks: {
        $toasted,
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
    expect(wrapper.vm.stickyNote).toBe(wrapper.vm.stickyNotes[0])
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

  test('stickyNotesDescriptionPreview', () => {
    initComponent()
    expect(wrapper.vm.stickyNotesDescriptionPreview('Note for testing purpose')).toEqual('<p>Note for testing purpose</p>\n')
  })

  test('stickyNotesDescriptionPreview > max length', () => {
    const text = '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n</p>'
    const textPreview = text.substr(0, 200) + '...'
    initComponent()
    expect(wrapper.vm.stickyNotesDescriptionPreview(text)).toEqual(textPreview)
  })

  test('showLimitedPreviewText > max length', () => {
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n'
    const textPreview = text.substr(0, 175) + '...'
    initComponent()
    expect(wrapper.vm.showLimitedPreviewText(text)).toEqual(textPreview)
  })

  test('announcementPreview with summary', () => {
    const announcement = {
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
    }
    initComponent()
    expect(wrapper.vm.announcementPreview(announcement)).toEqual(announcement.summary)
  })

  test('announcementPreview without summary', () => {
    const announcement = {
      'id': 'sample-id-1',
      'title': 'Announcements 1',
      'summary': '',
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
    initComponent()
    expect(wrapper.vm.announcementPreview(announcement)).toEqual(announcement.description)
  })
})
