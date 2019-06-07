import { shallowMount, createLocalVue } from '@vue/test-utils'
import Announcements from '@/views/Announcements/Announcements'
import Vuex from 'vuex'
import config from '@/config/index'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AnnouncementDetail.vue', () => {
  let actions
  let getters
  let state
  let store
  beforeEach(() => {
    state = {
      announcementList: [
        {
          'id': 'sample-id-1',
          'title': 'Announcement 1',
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
          'title': 'Announcement 2',
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
          'id': 'sample-id-3',
          'title': 'Announcement 3',
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
          'id': 'sample-id-4',
          'title': 'Announcement 4',
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
      announcement: {}
    }
    actions = {
      initialState: jest.fn(),
      fetchAnnouncements: jest.fn()
    }
    getters = {
      announcementList: state => state.announcementList
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

  test('Is an instance', () => {
    const wrapper = shallowMount(Announcements, {
      store,
      localVue
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Render template correctly', () => {
    const wrapper = shallowMount(Announcements, {
      store,
      localVue
    })
    expect(wrapper.find('.announcement-header').text()).toBe('Announcement 1')
  })

  test('Render components correctly', () => {
    const wrapper = shallowMount(Announcements, {
      store,
      localVue
    })
    expect(wrapper.html()).toContain('basecard')
  })

  test('Render all data in list correctly', () => {
    const wrapper = shallowMount(Announcements, {
      store,
      localVue
    })
    expect(wrapper.findAll('.announcement-card').length).toBe(4)
  })
})
