import announcementApi from '@/api/controller/announcements'

export const state = {
  announcementList: [],
  announcement: {}
}

export const mutations = {
  SET_ANNOUNCEMENTS (state, payload) {
    state.announcementList = { ...payload }
  },
  SET_ANNOUNCEMENT_BY_ID (state, payload) {
    state.announcement = { ...payload }
  }
}

export const actions = {
  initialState ({ commit }) {
    commit('SET_ANNOUNCEMENT_BY_ID', {})
    commit('SET_ANNOUNCEMENTS', [])
  },
  fetchAnnouncements ({ commit }, { data, fail }) {
    return new Promise((resolve, reject) => {
      announcementApi.getAnnouncementList(({ data: response }) => {
        commit('SET_ANNOUNCEMENTS', response)
        resolve()
      }, data, (fail) => { reject(fail) })
    })
  },
  fetchAnnouncementById ({ commit }, { data, fail }) {
    return new Promise((resolve, reject) => {
      announcementApi.getAnnouncementDetail(({ data: response }) => {
        commit('SET_ANNOUNCEMENT_BY_ID', response)
        resolve()
      }, data, (fail) => { reject(fail) })
    })
  },
  createAnnouncement ({ commit }, { data, fail }) {
    return new Promise((resolve, reject) => {
      announcementApi.createAnnouncement(({ data: response }) => {
        commit('SET_ANNOUNCEMENT_BY_ID', response)
        resolve()
      }, data, (fail) => { reject(fail) })
    })
  },
  updateAnnouncement ({ commit }, { data, fail }) {
    return new Promise((resolve, reject) => {
      announcementApi.updateAnnouncement(({ data: response }) => {
        commit('SET_ANNOUNCEMENT_BY_ID', response)
        resolve()
      }, data, (fail) => { reject(fail) })
    })
  }
}

export const getters = {
  announcementList (state) {
    return state.announcementList
  },
  announcement (state) {
    return state.announcement
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
