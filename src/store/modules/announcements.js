import announcementApi from '@/api/controller/announcements'

export const state = {
  announcementList: [],
  announcement: {}
}

export const mutations = {
  SET_ANNOUNCEMENTS (state, payload) {
    state.announcementList = [ ...payload ]
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
  fetchAnnouncements ({ commit }, { data, callback, fail }) {
    announcementApi.getAnnouncementList(({ data: response }) => {
      commit('SET_ANNOUNCEMENTS', response)
      callback()
    }, data, fail)
  },
  fetchAnnouncementById ({ commit }, { data, callback, fail }) {
    announcementApi.getAnnouncementDetail(({ data: response }) => {
      commit('SET_ANNOUNCEMENT_BY_ID', response)
      callback()
    }, data, fail)
  },
  createAnnouncement ({ commit }, { data, callback, fail }) {
    announcementApi.createAnnouncement(({ data: response }) => {
      commit('SET_ANNOUNCEMENT_BY_ID', response)
      callback()
    }, data, fail)
  },
  updateAnnouncement ({ commit }, { data, callback, fail }) {
    announcementApi.updateAnnouncement(({ data: response }) => {
      commit('SET_ANNOUNCEMENT_BY_ID', response)
      callback()
    }, data, fail)
  },
  deleteAnnouncementById ({ state }, { data, callback, fail }) {
    announcementApi.deleteAnnouncement(() => {
      callback()
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
