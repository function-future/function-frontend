import MenuMobileQuestionnaire from '@/views/Questionnaire/MenuMobileQuestionnaire'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('MenuMobileQuestionnaire', () => {
  let wrapper
  let store
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }
  function initStore () {
    const state = {
      menuList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const getters = {
      menuList: state => state.menuList
    }
    const actions = {
      toast: jest.fn()
    }
    const store = new Vuex.Store({
      modules: {
        menuMobileQuestionnaire: {
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

  function initWrapper (store, propsData, options) {
    const router = new VueRouter([])
    return shallowMount(MenuMobileQuestionnaire, {
      ...options,
      store,
      localVue,
      router,
      sync: false
    })
  }
  function initComponent (propsData) {
    localVue = generateLocalVue()
    store = initStore()
    wrapper = initWrapper(store.store, propsData)
  }

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('goToPage', () => {
    initComponent()
    wrapper.vm.$router.push = jest.fn()
    wrapper.vm.goToPage('page')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'page'
    })
  })
})
