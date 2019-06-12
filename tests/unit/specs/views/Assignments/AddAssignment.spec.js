import addAssignment from '@/views/Assignments/AddAssignment'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VCalendar from 'v-calendar'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VCalendar)

describe('AddAssignment', () => {
  let actions
  let state
  let store

  beforeAll(() => {
    window.matchMedia = window.matchMedia || (() => {
      return {
        matches : false,
        addListener : jest.fn(),
        removeListener: jest.fn()
      }
    })
  })

  beforeEach(() => {
    state = {
      assignment: {
        title: '',
        description: '',
        deadline: new Date(),
        batch: 'Batch 3'
      }
    }
    actions = {
      createAssignment: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        assignments: {
          state,
          actions
        }
      }
    })
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
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
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('cancel', () => {
    const go = jest.fn()
    const $router = {
      go: jest.fn()
    }
    const wrapper = mount(addAssignment, {
      store,
      localVue,
      mocks: {
        $router
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
    wrapper.vm.$router.go = go
    wrapper.vm.cancel()
    expect(go).toBeCalledTimes(1)
  })

  test('saveAssignment', () => {
    const createAssignment = jest.fn()
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
      methods: {
        createAssignment
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
    wrapper.vm.saveAssignment()
    expect(createAssignment).toBeCalledTimes(1)
  })

  test('failCreatingAssignment', () => {
    const error = jest.fn()
    const $toasted = {
      error: jest.fn()
    }
    const wrapper = shallowMount(addAssignment, {
      store,
      localVue,
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
    console.log(addAssignment.methods)
    wrapper.vm.failCreatingAssignment()
    expect(error).toBeCalledTimes(1)
  })
})
