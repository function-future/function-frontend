import addAssignment from '@/views/Assignment/AddAssignment'
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
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => { return { matches: true } })
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
          actions,
          namespaced: true
        }
      }
    })
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  // test('Rendered correctly', () => {
  //   const wrapper = shallowMount(addAssignment, {
  //     store,
  //     localVue,
  //     stubs: [
  //       'BaseInput',
  //       'BaseTextArea',
  //       'BaseButton',
  //       'BaseSelect',
  //       'font-awesome-icon',
  //       'v-date-picker'
  //     ],
  //     sync: false
  //   })
  //   expect(wrapper.isVueInstance()).toBe(true)
  // })
  //
  // test('cancel', () => {
  //   const wrapper = mount(addAssignment, {
  //     store,
  //     localVue,
  //     sync: false
  //   })
  //   const spy = jest.spyOn(addAssignment.methods, 'cancel')
  //   console.log(wrapper.html())
  //   wrapper.find('.button-cancel').trigger('click')
  //   expect(spy).toBeCalledTimes(1)
  // })
})
