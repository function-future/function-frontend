import Timer from '@/components/quiz/Timer'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('Timer', () => {
  let store
  let wrapper
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    return lv
  }

  function initStore () {
    const state = {}
    const actions = {}
    const getters = {}
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
    return shallowMount(Timer, {
      ...options,
      store,
      localVue,
      propsData: {
        timeLimit: 10
      },
      mocks: {
        $timer: {
          pause: jest.fn(),
          stop: jest.fn()
        }
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

  test('computed minutes', () => {
    expect(wrapper.vm.minutes).toEqual('10')
  })

  test('computed seconds', () => {
    expect(wrapper.vm.seconds).toEqual('00')
  })

  test('computed remainingTime', () => {
    expect(wrapper.vm.remainingTime).toEqual(100)
  })

  test('padTime with time below 10', () => {
    expect(wrapper.vm.padTime(2)).toEqual('02')
  })

  test('padTime with time above 10', () => {
    expect(wrapper.vm.padTime(12)).toEqual('12')
  })

  test('countdown with time remaining', () => {
    wrapper.vm.countdown()
    expect(wrapper.vm.totalTime = 599)
  })

  test('countdown time up', () => {
    const spy =jest.spyOn(wrapper.vm, 'timeUp')
    wrapper.vm.totalTime = 0
    wrapper.vm.countdown()
    expect(spy).toHaveBeenCalledTimes(1)
  })


  test('pause with time remaining', () => {
    wrapper.vm.totalTime = 600
    wrapper.vm.pause()
    expect(wrapper.vm.$timer.stop).toHaveBeenCalledTimes(1)
  })

  test('timeUp', () => {
    wrapper.vm.timeUp()
    expect(wrapper.vm.$timer.stop).toHaveBeenCalledTimes(1)
    expect(wrapper.emitted().finish.length).toEqual(1)
  })
})
