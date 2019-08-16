import reportCard from '@/components/users/ReportCard'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('ReportCard', () => {
  let store
  let localVue

  function generateLocalVue () {
    const lv = createLocalVue()
    lv.use(Vuex)
    lv.use(VueRouter)
    return lv
  }

  function initStore () {
    const state = {}
    const actions = {}
    const getters = {}
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

  beforeEach(() => {
    localVue = generateLocalVue()
    store = initStore()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly with batch returns student', () => {
    const user = {
      name: 'aaa',
      university: 'aaa',
      division: 'aaa',
      role: 'STUDENT',
      batch: {
        name: 'asasd'
      }
    }
    const wrapper = shallowMount(reportCard, {
      localVue,
      store,
      propsData: {
        user
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })
})
