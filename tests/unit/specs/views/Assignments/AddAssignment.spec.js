import addAssignment from '@/views/Assignment/AddAssignment'
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Assignment', () => {
  let wrapper
  let actions
  let state
  let store

  beforeEach(() => {
    state = {
      assignment: {}
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

  // test('Rendered correctly', () => {
  //   wrapper = shallowMount(addAssignment, {
  //     store,
  //     localVue,
  //     sync: false
  //   })
  //   expect(wrapper.isVueInstance()).toBe(true)
  // })
  //
  // test('cancel', () => {
  //   wrapper = mount(addAssignment, {
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
