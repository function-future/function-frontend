import announcementApi from '@/api/controller/announcements'

export const state = {
  announcementList: [],
  announcement: {}
}

export const mutations = {
  GET_ANNOUNCEMENTS (state, payload) {
    state.announcementList = {...payload}
  },
  GET_ANNOUNCEMENT_BY_ID (state, payload) {
    state.announcement = {...payload}
  }
}

export const actions = {
  fetchAnnouncements ({ commit }, { data, fail }) {
    announcementApi.getAnnouncementList(({data: response}) => {
      commit('GET_ANNOUNCEMENTS', response)
    }, fail)
  },
  fetchAnnouncementById ({ commit }, { data, fail }) {
    announcementApi.getAnnouncementDetail(({data: response}) => { //TODO: Learn how to pass announcement ID to API calls
      commit('GET_ANNOUNCEMENT_BY_ID', data)
    }, fail)
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
