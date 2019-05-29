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
  },
  fetchActivityBlogById ({ commit }, { data, callback, fail }) {
    activityBlogApi.getActivityBlogDetail(({ data: response }) => {
      commit('SET_ACTIVITY_BLOG_BY_ID', response)
      callback()
    }, data, fail)
  },
  createActivityBlog ({ commit }, { data, callback, fail }) {
    activityBlogApi.createActivityBlog(({ data: response }) => {
      commit('SET_ACTIVITY_BLOG_BY_ID', response)
      callback()
    }, data, fail)
  },
  updateActivityBlog ({ commit }, { data, callback, fail }) {
    activityBlogApi.updateActivityBlog(({ data: response }) => {
      commit('SET_ACTIVITY_BLOG_BY_ID', response)
      callback()
    }, data, fail)
  },
  deleteActivityBlogById ({ commit }, { data, callback, fail }) {
    activityBlogApi.deleteActivityBlog(({ data: response }) => {
      callback()
    }, data, fail)
  },
  uploadResource ({ commit }, { data, configuration, callback, fail }) {
    activityBlogApi.uploadResource(({ data: response }) => {
      callback(response)
    }, data, fail, configuration)
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
