import MenuBar from '@/components/skeletons/MenuBar'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('MenuBar', () => {
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
      menuList: {},
      currentUser: {}
    }
    const actions = {
    }
    const getters = {
      menuList: state => state.menuList,
      currentUser: state => state.currentUser
    }
    const store = new Vuex.Store({
      state,
      actions,
      getters
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
    return shallowMount(MenuBar, {
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

  test('ToggleGradesMenu questionnaireSubmenuVisibility true', () => {
    wrapper.vm.questionnaireSubmenuVisibility = true
    expect(wrapper.vm.gradesSubmenuVisibility).toBe(false)
    wrapper.vm.toggleGradesMenu()
    expect(wrapper.vm.gradesSubmenuVisibility).toBe(true)
    expect(wrapper.vm.questionnaireSubmenuVisibility).toBe(false)
  })

  test('toggleQuestionnaireMenu', () => {
    expect(wrapper.vm.questionnaireSubmenuVisibility).toBe(false)
    wrapper.vm.toggleQuestionnaireMenu()
    expect(wrapper.vm.questionnaireSubmenuVisibility).toBe(true)
  })

  test('toggleQuestionnaireMenu gradesSubmenuVisibility true', () => {
    wrapper.vm.gradesSubmenuVisibility = true
    expect(wrapper.vm.questionnaireSubmenuVisibility).toBe(false)
    wrapper.vm.toggleQuestionnaireMenu()
    expect(wrapper.vm.questionnaireSubmenuVisibility).toBe(true)
    expect(wrapper.vm.gradesSubmenuVisibility).toBe(false)
  })

  test('quizRoute for student', () => {
    wrapper.vm.$store.state.currentUser = {
      role: 'STUDENT'
    }
    expect(wrapper.vm.quizRoute).toEqual('studentQuizzes')
  })

  test('quizRoute default', () => {
    wrapper.vm.$store.state.currentUser = {
      role: 'ADMIN'
    }
    expect(wrapper.vm.quizRoute).toEqual('quizBatch')
  })

  test('assignmentRoute for student', () => {
    wrapper.vm.$store.state.currentUser = {
      role: 'STUDENT'
    }
    expect(wrapper.vm.assignmentRoute).toEqual('studentAssignments')
  })

  test('assignmentRoute default', () => {
    wrapper.vm.$store.state.currentUser = {
      role: 'ADMIN'
    }
    expect(wrapper.vm.assignmentRoute).toEqual('assignmentBatch')
  })

  test('isActive', () => {
    expect(wrapper.vm.isActive('feeds')).toEqual(false)
  })
})
