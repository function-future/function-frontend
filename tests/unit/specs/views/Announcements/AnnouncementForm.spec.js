import { shallowMount, createLocalVue } from '@vue/test-utils'
import AnnouncementForm from '@/views/Announcements/AnnouncementForm'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import config from '@/config/index'
import VeeValidate from 'vee-validate'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(VeeValidate)

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
      updateAnnouncement: jest.fn(),
      toast: jest.fn()
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
        'v-date-picker'
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
        'v-date-picker'
      ],
      sync: false
    })
    wrapper.vm.successFetchAnnouncementById()
    expect(spy).toHaveBeenCalled()
  })

  test('failFetchAnnouncementById', () => {
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
        'v-date-picker'
      ],
      sync: false
    })
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failFetchAnnouncementById()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to load announcement detail',
        type: 'is-danger'
      }
    })
  })

  test('sendAnnouncement', () => {
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
        'v-date-picker'
      ],
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'validateBeforeSubmit')
    wrapper.vm.sendAnnouncement()
    expect(spy).toHaveBeenCalledTimes(1)
  })

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
        'v-date-picker'
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
        'v-date-picker'
      ],
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'updateAnnouncement')
    wrapper.vm.sendUpdateAnnouncementData()
    expect(spy).toBeCalled()
  })

  test('successSendCreateAnnouncementData', () => {
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
        'v-date-picker'
      ],
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'initialState')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.successSendCreateAnnouncementData()
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'announcements' })
    expect(spy).toBeCalled()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully created new announcement',
        type: 'is-success'
      }
    })
  })

  test('failSendCreateAnnouncementData', () => {
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
        'v-date-picker'
      ],
      sync: false
    })
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failSendCreateAnnouncementData()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to create new announcement',
        type: 'is-danger'
      }
    })
  })

  test('successSendUpdateAnnouncementData', () => {
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
        'v-date-picker'
      ],
      sync: false
    })
    wrapper.vm.$router.push = jest.fn()
    const spy = jest.spyOn(wrapper.vm, 'initialState')
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.successSendUpdateAnnouncementData()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Successfully update announcement',
        type: 'is-success'
      }
    })
  })

  test('failSendUpdateAnnouncementData', () => {
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
        'v-date-picker'
      ],
      sync: false
    })
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failSendUpdateAnnouncementData()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to update announcement',
        type: 'is-danger'
      }
    })
  })

  test('cancel', () => {
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
        'v-date-picker'
      ],
      sync: false
    })
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.cancel()
    expect(wrapper.vm.$router.push).toHaveBeenCalledTimes(1)
  })

  test('validateBeforeSubmit is resolved', (done) => {
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
        'v-date-picker'
      ],
      sync: false
    })
    const callback = jest.fn()
    wrapper.vm.$validator.validateAll = jest.fn().mockResolvedValue(true)
    wrapper.vm.validateBeforeSubmit(callback)
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$validator.validateAll).toHaveBeenCalledTimes(1)
      done()
    })
  })

  test('validateBeforeSubmit is rejected', () => {
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
        'v-date-picker'
      ],
      sync: false
    })
    const callback = jest.fn()
    wrapper.vm.validateBeforeSubmit(() => {})
    expect(callback).toHaveBeenCalledTimes(0)
  })

  test('validationSuccess editMode false', () => {
    const wrapper = shallowMount(AnnouncementForm, {
      store,
      localVue,
      router,
      propsData: { editMode: false },
      stubs: [
        'BaseInput',
        'BaseTextArea',
        'BaseButton',
        'BaseSelect',
        'font-awesome-icon',
        'v-date-picker'
      ],
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'sendCreateAnnouncementData')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('validationSuccess editMode true', () => {
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
        'v-date-picker'
      ],
      propsData: { editMode: true },
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'sendUpdateAnnouncementData')
    wrapper.vm.validationSuccess()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('successUploadResource', () => {
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
        'v-date-picker'
      ],
      propsData: { editMode: true },
      sync: false
    })
    wrapper.vm.$refs = {
      editor: {
        addImage: jest.fn()
      }
    }
    const response = {
      id: 'id-1',
      file: {
        full: 'google.com/images'
      }
    }
    wrapper.vm.successUploadResource(response)
    expect(wrapper.vm.images).toEqual([ response ])
  })

  test('failUploadResource', () => {
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
        'v-date-picker'
      ],
      propsData: { editMode: true },
      sync: false
    })
    const toastSpy = jest.spyOn(wrapper.vm, 'toast')
    wrapper.vm.failUploadResource()
    expect(toastSpy).toHaveBeenCalledWith({
      data: {
        message: 'Fail to upload image, please delete the image and re-upload',
        type: 'is-danger'
      }
    })
  })

  test('$imgAdd', () => {
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
        'v-date-picker'
      ],
      propsData: { editMode: true },
      sync: false
    })
    const spy = jest.spyOn(wrapper.vm, 'uploadResource')
    wrapper.vm.$imgAdd()
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
