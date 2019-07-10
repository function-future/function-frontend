import headerComp from '@/components/skeletons/HeaderComp'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('HeaderComp', () => {
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
      menuList: {}
    }
    const actions = {
    }
    const getters = {
      menuList: state => state.menuList
    }
    const store = new Vuex.Store({
      modules: {
        auth: {
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
      error: jest.fn(),
      success: jest.fn()
    }
    return shallowMount(headerComp, {
      ...options,
      store,
      localVue,
      router,
      stubs: [
        'BaseCard',
        'BaseButton',
        'font-awesome-icon'
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

  beforeEach(() => {
    initComponent()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('showGrades computed works correctly', () => {
    expect(wrapper.vm.gradesSubmenuVisibility).toBe(false)
    expect(wrapper.vm.showGrades).toBe(false)
    wrapper.vm.gradesSubmenuVisibility = true
    expect(wrapper.vm.showGrades).toBe(true)
  })

  test('ToggleGradesMenu', () => {
    expect(wrapper.vm.gradesSubmenuVisibility).toBe(false)
    wrapper.vm.toggleGradesMenu()
    expect(wrapper.vm.gradesSubmenuVisibility).toBe(true)
  })
})
