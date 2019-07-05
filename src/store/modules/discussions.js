import discussionApi from '@/api/controller/discussions'

export const state = {
  courseDiscussions: []
}

export const mutations = {
  SET_COURSE_DISCUSSIONS (state, payload) {
    state.courseDiscussions = [ ...payload ]
  }
}

export const actions = {
  fetchCourseDiscussions ({ commit }, { data, callback, fail }) {
    discussionApi.getCourseDiscussions(({ data: response, paging }) => {
      commit('SET_COURSE_DISCUSSIONS', response)
      callback(response, paging)
    }, data, fail)
  },
  submitCourseDiscussion ({ commit }, { data, callback, fail }) {
    discussionApi.postCourseDiscussion(({ data: response }) => {
      callback()
    }, data, fail)
  }
}

export const getters = {
  courseDiscussions (state) {
    return state.courseDiscussions
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
