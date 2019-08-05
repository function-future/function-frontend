import LoggingRoomCard from '@/views/LoggingRoom/LoggingRoomCard'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

describe('LoggingRoomCard', () => {
  let wrapper
  let store
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    return lv
  }

  function initStore () {
    const state = {
      accessList: {
        add: true,
        delete: true,
        read: true,
        edit: true
      }
    }
    const getters = {
      accessList: state => state.accessList
    }
    const store = new Vuex.Store({
      state,
      getters
    })

    return {
      store,
      state,
      getters
    }
  }

  function initWrapper (store, propsData, options) {
    const $toasted = {
      error: jest.fn(),
      success: jest.fn()
    }
    const $route = {
      params: {}
    }

    return shallowMount(LoggingRoomCard, {
      ...options,
      store,
      localVue,
      stubs: [
        'BaseCard',
        'font-awesome-icon'
      ],
      propsData: {
        title: 'title',
        ...propsData
      },
      mocks: {
        $toasted,
        $route
      }
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

  test('sanity test', () => {
    expect(true).toBe(true)
  })

  test('computed Title 1', () => {
    const spy = jest.spyOn(LoggingRoomCard.computed, 'computedTitle')
    const title = 'Lorem ipsum dolor sit amet orci aliquam.'
    initComponent({
      title: title
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedTitle).toEqual((title.substring(0, 35).concat('...')))
  })

  test('computed Title 2', () => {
    const spy = jest.spyOn(LoggingRoomCard.computed, 'computedTitle')
    const title = 'Lorem ipsum'
    initComponent({
      title: title
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedTitle).toEqual(title)
  })

  test('computed Description 1', () => {
    const spy = jest.spyOn(LoggingRoomCard.computed, 'computedDescription')
    const description = 'Lorem ipsum'
    initComponent({
      description: description
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedDescription).toEqual(description)
  })

  test('computed Description 2', () => {
    const spy = jest.spyOn(LoggingRoomCard.computed, 'computedDescription')
    const description = 'Lorem ipsum dolor sit amet,' +
      ' consectetur adipiscing elit.' +
      ' Curabitur efficitur,' +
      ' velit in fringilla ultricies,' +
      ' nibh nulla dignissim leo,' +
      ' bibendum turpis duis'
    initComponent({
      description: description
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedDescription).toEqual(description.substring(0, 150).concat('...'))
  })

  test('computed Member Count', () => {
    const spy = jest.spyOn(LoggingRoomCard.computed, 'computedMemberCount')
    const memberCount = Number(10)
    initComponent({
      memberCount: memberCount
    })
    expect(spy).toHaveBeenCalled()
    expect(wrapper.vm.computedMemberCount).toEqual(memberCount.toString().concat(' Members'))
  })
})
