import { ToastProgrammatic as Toast } from 'buefy'

export const state = {
  bottomNavBarVisible: true
}

export const mutations = {
  HIDE_BOTTOM_NAV_BAR (state) {
    state.bottomNavBarVisible = false
  },
  SHOW_BOTTOM_NAV_BAR (state) {
    state.bottomNavBarVisible = true
  }
}

export const actions = {
  toast ({ state }, { data }) {
    let windowWidth = window.innerWidth
    let position = windowWidth > 1023 ? 'is-bottom' : 'is-top'
    Toast.open({
      position: position,
      duration: 3500,
      ...data
    })
  },
  showBottomNavBar ({ commit }) {
    commit('SHOW_BOTTOM_NAV_BAR')
  },
  hideBottomNavBar ({ commit }) {
    commit('HIDE_BOTTOM_NAV_BAR')
  }
}

export const getters = {
  bottomNavBarVisible (state) {
    return state.bottomNavBarVisible
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
