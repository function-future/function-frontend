import BatchCard from '@/components/batches/BatchCard'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('UserCard', () => {
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
      accessList: {}
    }
    const actions = {
    }
    const getters = {
      accessList: state => state.accessList
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

  beforeEach(() => {
    localVue = generateLocalVue()
    store = initStore()
  })

  beforeEach(() => {
    const batch = {
      'id': 'sample-id',
      'name': 'Batch Name',
      'code': '3'
    }
    wrapper = shallowMount(BatchCard, {
      localVue,
      store,
      propsData: {
        batch,
        showAction: true
      }
    })
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('emit edit', () => {
    wrapper.vm.edit()
    expect(wrapper.emitted().edit.length).toEqual(1)
  })

  test('emit deleteBatch', () => {
    wrapper.vm.deleteBatch()
    expect(wrapper.emitted().delete.length).toEqual(1)
  })
})
