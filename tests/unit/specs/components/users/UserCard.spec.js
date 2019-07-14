import userCard from '@/components/users/UserCard'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

describe('UserCard', () => {
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

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Rendered correctly', () => {
    const user = {
      name: 'aaa',
      university: 'aaa',
      division: 'aaa',
      batch: {
        name: 'asasd'
      }
    }
    const wrapper = shallowMount(userCard, {
      localVue,
      store,
      propsData: {
        user
      }
    })
    expect(wrapper.isVueInstance()).toBe(true)
  })

  test('emit edit with data', () => {
    const user = {
      id: 'sample-id',
      name: 'aaa',
      university: 'aaa',
      role: 'STUDENT',
      division: 'aaa',
      batch: {
        name: 'asasd'
      }
    }
    const wrapper = shallowMount(userCard, {
      localVue,
      store,
      propsData: {
        user
      }
    })

    wrapper.vm.edit()
    expect(wrapper.emitted().edit[0]).toEqual(['sample-id', 'STUDENT'])
  })

  test('deleteUser emit delete', () => {
    const user = {
      id: 'sample-id',
      name: 'aaa',
      university: 'aaa',
      role: 'STUDENT',
      division: 'aaa',
      batch: {
        name: 'asasd'
      }
    }
    const wrapper = shallowMount(userCard, {
      localVue,
      store,
      propsData: {
        user
      }
    })
    wrapper.vm.deleteUser()
    expect(wrapper.emitted().delete[0]).toEqual(['sample-id'])
  })
})
