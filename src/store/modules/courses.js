import courseApi from '@/api/controller/courses'

export const state = {
  courseList: [],
  course: {}
}

export const mutations = {
  SET_COURSES (state, payload) {
    state.courseList = [...payload]
  },
  SET_COURSE_BY_ID (state, payload) {
    state.course = { ...payload }
  }
}

export const actions = {
  fetchCourses ({ commit }, { data, callback, fail }) {
    courseApi.getCourseList(({ data: response, paging }) => {
      commit('SET_COURSES', response)
      callback(paging)
    }, data, fail)
  },
  fetchCourseById ({ commit }, { data, callback, fail }) {
    courseApi.getCourseDetail(({ data: response }) => {
      commit('SET_COURSE_BY_ID', response)
      callback()
    }, data, fail)
  }
}

export const getters = {
  courseList (state) {
    return state.courseList
  },
  course (state) {
    return state.course
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
