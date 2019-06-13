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
      fetchAnnouncementById: jest.fn(),
      createAnnouncement: jest.fn(),
      updateAnnouncement: jest.fn()
    }
    getters = {
      announcement: state => state.announcement
    }
    store = new Vuex.Store({
      modules: {
        announcements: {
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

  test('initPage', () => {
    const spy = jest.spyOn(AnnouncementForm.methods, 'getAnnouncementDetail')
    const editMode = true
    const wrapper = shallowMount(AnnouncementForm, {
      store,
      localVue,
      router,
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false,
      propsData: { editMode }
    })
    wrapper.vm.initPage()
    expect(spy).toHaveBeenCalled()
  })

  test('successFetchAnnouncementById', () => {
    const spy = jest.spyOn(AnnouncementForm.methods, 'setAnnouncementDetail')
    const wrapper = shallowMount(AnnouncementForm, {
      store,
      localVue,
      router,
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    wrapper.vm.successFetchAnnouncementById()
    expect(spy).toHaveBeenCalled()
  })

  test('failFetchAnnouncementById', () => {
    const $toasted = {
      error: jest.fn()
    }
    const wrapper = shallowMount(AnnouncementForm, {
      store,
      localVue,
      router,
      mocks: {
        $toasted
      },
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    wrapper.vm.failFetchAnnouncementById()
    expect($toasted.error).toHaveBeenCalled()
  })

  // test('sendAnnouncement', () => {
  //   const wrapper = shallowMount(AnnouncementForm, {
  //     store,
  //     localVue,
  //     router,
  //     stubs: [
  //       'BaseInput',
  //       'BaseTextArea',
  //       'BaseButton',
  //       'BaseSelect',
  //       'font-awesome-icon',
  //       'v-date-picker',
  //       'v-calendar'
  //     ],
  //     sync: false
  //   })
  //   wrapper.vm.sendAnnouncement()
  // })

  test('sendCreateAnnouncementData', () => {
    const wrapper = shallowMount(AnnouncementForm, {
      store,
      localVue,
      router,
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'createAnnouncement')
    wrapper.vm.sendCreateAnnouncementData()
    expect(spy).toBeCalled()
  })

  test('sendUpdateAnnouncementData', () => {
    const wrapper = shallowMount(AnnouncementForm, {
      store,
      localVue,
      router,
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker',
        'v-calendar'
      ],
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'updateAnnouncement')
    wrapper.vm.sendUpdateAnnouncementData()
    expect(spy).toBeCalled()
  })

  // test('successSendCreateAnnouncementData', () => {
  //   const $toasted = {
  //     success: jest.fn()
  //   }
  //   const $router = {
  //     push: jest.fn()
  //   }
  //   const wrapper = shallowMount(AnnouncementForm, {
  //     store,
  //     localVue,
  //     mocks: {
  //       $toasted,
  //       $router
  //     },
  //     stubs: [
  //       'BaseInput',
  //       'BaseTextArea',
  //       'BaseButton',
  //       'BaseSelect',
  //       'font-awesome-icon',
  //       'v-date-picker',
  //       'v-calendar'
  //     ],
  //     sync: false
  //   })
  //   const spy = jest.spyOn(wrapper.vm, 'initialState')
  //   wrapper.vm.successSendCreateAnnouncementData()
  //   expect($toasted.success).toHaveBeenCalledWith('Successfully created new announcement')
  //   expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'announcements' })
  //   expect(spy).toBeCalled()
  // })

  // test('failSendCreateAnnouncementData', () => {
  //   const $toasted = {
  //     error: jest.fn()
  //   }
  //   const wrapper = shallowMount(AnnouncementForm, {
  //     store,
  //     localVue,
  //     router,
  //     mocks: {
  //       $toasted
  //     },
  //     stubs: [
  //       'BaseInput',
  //       'BaseTextArea',
  //       'BaseButton',
  //       'BaseSelect',
  //       'font-awesome-icon',
  //       'v-date-picker',
  //       'v-calendar'
  //     ],
  //     sync: false
  //   })
  //   wrapper.vm.failSendCreateAnnouncementData()
  //   expect($toasted.error).toHaveBeenCalled()
  // })
})
