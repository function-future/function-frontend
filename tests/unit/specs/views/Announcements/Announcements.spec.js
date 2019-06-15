import announcements from '@/views/Announcements/Announcements'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BaseCard from '@/components/BaseCard'

 const localVue = createLocalVue()
localVue.use(Vuex)

describe('Announcements', () => {
  let wrapper
  let actions
  let getters
  let state
  let store

  beforeEach(() => {
    state = {
      announcementList: [
        {
        "id": "sample-id-1",
        "title": "Announcements 1",
        "summary": "Summary goes here. Maximum 70 characters?",
        "description": "Description goes here. Currently there is no limit to description length.",
        "files": [
          {
            "id": "sample-id",
            "file": {
              "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
              "thumbnail": null
            }
          }
        ],
        "updatedAt": 1555980050616
      },
        {
          "id": "sample-id-2",
          "title": "Announcements 2",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        },
        {
          "id": "sample-id-3",
          "title": "Announcements 3",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        },
        {
          "id": "sample-id-4",
          "title": "Announcements 4",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        },
        {
          "id": "sample-id-5",
          "title": "Announcements 5",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        }
      ]
    }
    actions = {
      fetchAnnouncements: jest.fn(),
      deleteAnnouncementById: jest.fn()
    }
    getters = {
      announcementList: state => state.announcementList
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
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const spy = jest.spyOn(announcements.methods, 'loadAnnouncementList')
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      sync: false
    })
    expect(spy).toBeCalledTimes(1)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('goToAnnouncementDetail is called @click', () => {
    const spy = jest.spyOn(announcements.methods, 'goToAnnouncementDetail')
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.find('.announcement-card').trigger('click')
    expect(spy).toBeCalledTimes(1)
  })

  test('goToAnnouncementDetail $route.push to announcementDetail', () => {
    const push = jest.fn()
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.$router.push = push
    wrapper.vm.goToAnnouncementDetail('sample-id-1')
    expect(push).toBeCalledWith({
      name: 'announcementDetail',
      params: {
        id: 'sample-id-1'
      }
    })
  })

  test('goToAddAnnouncement is called @click', () => {
    const spy = jest.spyOn(announcements.methods, 'goToAddAnnouncement')
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = mount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.find('.button-save').trigger('click')
    expect(spy).toBeCalledTimes(1)
  })

  test('goToAddAnnouncement $route.push to addAnnouncement', () => {
    const push = jest.fn()
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.$router.push = push
    wrapper.vm.goToAddAnnouncement()
    expect(push).toBeCalledWith({name: 'addAnnouncement'})
  })

  test('goToEditAnnouncement is called @click', () => {
    const spy = jest.spyOn(announcements.methods, 'goToEditAnnouncement')
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = mount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.find('.blue').trigger('click')
    expect(spy).toBeCalledTimes(1)
  })

  test('goToEditAnnouncement $route.push to editAnnouncement', () => {
    const push = jest.fn()
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.$router.push = push
    wrapper.vm.goToEditAnnouncement('sample-id-1')
    expect(push).toBeCalledWith({
      name: 'editAnnouncement',
      params: {
        id: 'sample-id-1'
      }
    })
  })

  test('textPreview with summary', () => {
    const spy = jest.spyOn(announcements.methods, 'showLimitedPreviewText')
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    console.log(wrapper.vm.$store.getters.announcementList)
    expect(spy).toBeCalledWith('Summary goes here. Maximum 70 characters?')
    expect(spy).toBeCalledTimes(5)
  })

  test('textPreview without summary', () => {
    const spy = jest.spyOn(announcements.methods, 'showLimitedPreviewText')
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    expect(spy).toBeCalledWith('Description goes here. Currently there is no limit to description length.')
    expect(spy).toBeCalledTimes(5)
  })

  test('openDeleteConfirmationModal', () => {
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    expect(wrapper.vm.selectedId).toBe('')
    expect(wrapper.vm.showDeleteConfirmationModal).toBe(false)
    wrapper.vm.openDeleteConfirmationModal('sample-id-1')
    expect(wrapper.vm.selectedId).toBe('sample-id-1')
    expect(wrapper.vm.showDeleteConfirmationModal).toBe(true)
  })

  test('closeDeleteConfirmationModal', () => {
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.openDeleteConfirmationModal('sample-id-1')
    expect(wrapper.vm.selectedId).toBe('sample-id-1')
    expect(wrapper.vm.showDeleteConfirmationModal).toBe(true)
    wrapper.vm.closeDeleteConfirmationModal()
    expect(wrapper.vm.selectedId).toBe('')
    expect(wrapper.vm.showDeleteConfirmationModal).toBe(false)
  })

  test('deleteThisAnnouncement', () => {
    const spy = jest.spyOn(announcements.methods, 'deleteAnnouncementById')
    const $route = {
      path: '/announcements',
      name: 'announcements',
      meta: {
        title: 'Announcements'
      }
    }
    const $router = {
      push: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $route,
        $router
      },
      sync: false
    })
    wrapper.vm.selectedId = 'sample-id-1'
    wrapper.vm.deleteThisAnnouncement()
    expect(spy).toBeCalledTimes(1)
  })

  test('failLoadingAnnouncementList', () => {
    const $toasted = {
      error: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $toasted
      },
      sync: false
    })
    wrapper.vm.failLoadingAnnouncementList()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })

  test('successDeleteAnnouncementById', () => {
    const $router = {
      push: jest.fn()
    }
    const $toasted = {
      success: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $toasted,
        $router
      },
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'closeDeleteConfirmationModal')
    wrapper.vm.successDeleteAnnouncementById()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({name : 'announcements'})
    expect(wrapper.vm.$toasted.success).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('failDeleteAnnouncementById', () => {
    const $toasted = {
      error: jest.fn()
    }
    wrapper = shallowMount(announcements, {
      store,
      localVue,
      mocks: {
        $toasted
      },
      sync: false
    })
    wrapper.vm.failDeleteAnnouncementById()
    expect(wrapper.vm.$toasted.error).toHaveBeenCalledTimes(1)
  })
})
