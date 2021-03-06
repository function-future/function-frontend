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
      },
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    actions = {
      initialState: jest.fn(),
      fetchAnnouncementById: jest.fn(),
      toast: jest.fn()
    }
    getters = {
      announcement: state => state.announcement,
      accessList: state => state.accessList
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
      name: 'announcementDetail',
      params: {
        id: 'sample-id'
      }
    })
  })

  test('Is an instance', () => {
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      router
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('goToEditAnnouncement', () => {
    const push = jest.fn()
    const $route = {
      params: {
        id: 'sample-id'
      }
    }
    const $router = {
      push: jest.fn()
    }
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.$router.push = push
    wrapper.vm.goToEditAnnouncement()
    expect(push).toBeCalledWith({
      name: 'editAnnouncement',
      params: { id: 'sample-id' }
    })
  })

  test('openDeleteConfirmationModal', async () => {
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      router
    })
    wrapper.vm.openDeleteConfirmationModal()
    expect(wrapper.vm.showDeleteConfirmationModal).toBeTruthy()
  })

  test('deleteThisAnnouncement, deleteAnnouncementById is called', async () => {
    const spy = jest.spyOn(AnnouncementDetail.methods, 'deleteAnnouncementById')
    const $route = {
      params: {
        id: 'sample-id'
      }
    }
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      mocks: {
        $route
      }
    })
    wrapper.vm.deleteThisAnnouncement()
    expect(spy).toBeCalledTimes(1)
  })

  test('successGetAnnouncementDetail', () => {
    const localVue = createLocalVue()
    const $route = {
      params: {
        id: 'sample-id'
      }
    }
    localVue.use(Vuex)
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      mocks: {
        $route
      }
    })
    wrapper.vm.successGetAnnouncementDetail()
    expect(wrapper.vm.announcementDescriptionMarkdown).toEqual('Description goes here. Currently there is no limit to description length.')
  })

  test('failGetAnnouncementDetail', () => {
    const localVue = createLocalVue()
    const $route = {
      params: {
        id: 'sample-id'
      }
    }
    localVue.use(Vuex)
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      mocks: {
        $route
      }
    })
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failGetAnnouncementDetail()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to load announcement detail',
        type: 'is-danger'
      }
    })
  })

  test('successDeleteAnnouncementById', () => {
    const localVue = createLocalVue()
    const $route = {
      params: {
        id: 'sample-id'
      }
    }
    const $router = {
      push: jest.fn()
    }
    localVue.use(Vuex)
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      mocks: {
        $route,
        $router
      }
    })
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successDeleteAnnouncementById()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'announcements' })
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully delete announcement',
        type: 'is-success'
      }
    })
  })

  test('failDeleteAnnouncementById', () => {
    const localVue = createLocalVue()
    const $route = {
      params: {
        id: 'sample-id'
      }
    }
    localVue.use(Vuex)
    const wrapper = shallowMount(AnnouncementDetail, {
      store,
      localVue,
      stubs: [
        'b-button'
      ],
      mocks: {
        $route
      }
    })
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failDeleteAnnouncementById()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to delete announcement',
        type: 'is-danger'
      }
    })
  })
})
