import { shallowMount, createLocalVue } from '@vue/test-utils'
import AnnouncementDetail from '@/views/Announcements/AnnouncementDetail'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import config from '@/config/index'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const routes = [
  {
    path: config.app.pages.announcements.detail,
    component: AnnouncementDetail,
    name: 'announcementDetail'
  }
]
const router = new VueRouter({
  routes
})
router.push({
  name: 'announcementDetail',
  params: {
    id: 'sample-id'
  }
})

describe('AnnouncementDetail.vue', () => {
  let actions
  let getters
  let state
  let store
  beforeEach(() => {
    state = {
      announcementList: [],
      announcement: {
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
      }
    }
    actions = {
      initialState: jest.fn(),
      fetchAnnouncementById: jest.fn()
    }
    getters = {
      announcement: state => state.announcement
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
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      router
    })
    expect(wrapper.isVueInstance()).toBe(true)
    expect(wrapper.vm.$route.path).toBe('/announcements/sample-id/detail')
  })

  test('Render template correctly', () => {
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      router
    })
    expect(wrapper.find('.header').text()).toBe('Announcement 1')
    expect(wrapper.vm.$route.path).toBe('/announcements/sample-id/detail')
  })

  test('Render components correctly', () => {
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      router
    })
    expect(wrapper.html()).toContain('basecard')
    expect(wrapper.vm.$route.path).toBe('/announcements/sample-id/detail')
  })
})
