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
  fetchAnnouncements ({ commit }, { data, fail }) {
    announcementApi.getAnnouncementList(({ data: response }) => {
      commit('SET_ANNOUNCEMENTS', response)
    }, data, fail)
  },
  fetchAnnouncementById ({ commit }, { data, fail }) {
    announcementApi.getAnnouncementDetail(({ data: response }) => {
      commit('SET_ANNOUNCEMENT_BY_ID', response)
    }, data, fail)
  },
  createAnnouncement ({ commit }, { data, fail }) {
    announcementApi.createAnnouncement(({ data: response }) => {
      commit('SET_ANNOUNCEMENT_BY_ID', response)
    }, data, fail)
  },
  updateAnnouncement ({ commit }, { data, fail }) {
    announcementApi.updateAnnouncement(({ data: response }) => {
      commit('SET_ANNOUNCEMENT_BY_ID', response)
    }, data, fail)
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
