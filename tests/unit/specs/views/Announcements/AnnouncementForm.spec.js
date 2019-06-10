import { shallowMount, createLocalVue } from '@vue/test-utils'
import AnnouncementForm from '@/views/Announcements/AnnouncementForm'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import config from '@/config/index'
import VeeValidate from 'vee-validate'
import mavonEditor from 'mavon-editor'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(VeeValidate)
localVue.use(mavonEditor)

const routes = [
  {
    path: config.app.pages.announcements.edit,
    component: AnnouncementForm,
    name: 'editAnnouncement',
    props: { editMode: true }
  },
  {
    path: config.app.pages.announcements.add,
    name: 'addAnnouncement',
    component: AnnouncementForm,
    meta: {
      title: 'Add Announcement'
    },
    props: { editMode: false }
  }
]
const router = new VueRouter({
  routes
})

describe('AnnouncementForm.vue on edit mode', () => {
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
    router.push({
      name: 'editAnnouncement',
      params: {
        id: 'sample-id'
      }
    })
  })

  test('route url is /edit', () => {
    const wrapper = shallowMount(AnnouncementForm, {
      store,
      localVue,
      router,
      sync: false
    })
    expect(wrapper.vm.$route.path).toBe('/announcements/sample-id/edit')
  })

  test('Is an instance', () => {
    const wrapper = shallowMount(AnnouncementForm, {
      store,
      localVue,
      router,
      sync: false
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('Render components correctly', () => {
    const wrapper = shallowMount(AnnouncementForm, {
      store,
      localVue,
      router,
      sync: false
    })
    expect(wrapper.html()).toContain('scrollable-container')
  })

  // test('Render data to input title box correctly', () => {
  //   const wrapper = shallowMount(AnnouncementForm, {
  //     store,
  //     localVue,
  //     router,
  //     sync: false
  //   })
  //   expect(wrapper.find('.input-title').text()).toBe('Announcement 1')
  // })
})
