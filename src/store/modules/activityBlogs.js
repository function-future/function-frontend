import activityBlogApi from '@/api/controller/activity-blogs'

export const state = {
  activityBlogs: [],
  activityBlog: {}
}

export const mutations = {
  SET_ACTIVITY_BLOGS (state, payload) {
    state.activityBlogs = { ...payload }
  },
  SET_ACTIVITY_BLOG_BY_ID (state, payload) {
    state.activityBlog = { ...payload }
  }
}

export const actions = {
  initialState ({ commit }) {
    commit('SET_ACTIVITY_BLOG_BY_ID', {})
    commit('SET_ACTIVITY_BLOGS', [])
  },
  fetchActivityBlogs ({ commit }, { data, callback, fail }) {
    activityBlogApi.getActivityBlogList(({ data: response }) => {
      commit('SET_ACTIVITY_BLOGS', response)
      callback()
    }, data, fail)
  }
}

export const getters = {
  activityBlogs (state) {
    return state.activityBlogs
  },
  activityBlog (state) {
    return state.activityBlog
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
