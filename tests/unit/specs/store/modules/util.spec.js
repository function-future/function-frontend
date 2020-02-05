import store from '@/store/modules/util'

describe('util store module', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  describe('util actions', () => {
    test('toast > 1023', () => {
      global.innerWidth = 1920
      const Toast = jest.fn()
      const commit = jest.fn()
      const data = {}
      store.actions.toast({ commit }, { data })
      expect(Toast).not.toHaveBeenCalled()
    })

    test('toast < 1023', () => {
      global.innerWidth = 600
      const Toast = jest.fn()
      const commit = jest.fn()
      const data = {}
      store.actions.toast({ commit }, { data })
      expect(Toast).not.toHaveBeenCalled()
    })

    test('showBottomNavBar', () => {
      const commit = jest.fn()
      store.actions.showBottomNavBar({ commit })
      expect(commit).toHaveBeenCalledWith('SHOW_BOTTOM_NAV_BAR')
    })

    test('hideBottomNavBar', () => {
      const commit = jest.fn()
      store.actions.hideBottomNavBar({ commit })
      expect(commit).toHaveBeenCalledWith('HIDE_BOTTOM_NAV_BAR')
    })
  })

  describe('util mutations', () => {
    const state = {
      bottomNavBarVisible: false
    }
    test('HIDE_BOTTOM_NAV_BAR', () => {
      state.bottomNavBarVisible = true
      store.mutations.HIDE_BOTTOM_NAV_BAR(state)
      expect(state.bottomNavBarVisible).toEqual(false)
    })
    test('SHOW_BOTTOM_NAV_BAR', () => {
      state.bottomNavBarVisible = false
      store.mutations.SHOW_BOTTOM_NAV_BAR(state)
      expect(state.bottomNavBarVisible).toEqual(true)
    })
  })

  describe('util getters', () => {
    const state = {
      bottomNavBarVisible: false
    }
    test('bottomNavBarVisible', () => {
      expect(store.getters.bottomNavBarVisible(state)).toEqual(state.bottomNavBarVisible)
    })
  })
})
