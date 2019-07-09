import request from '../default-request'
import config from '@/config/index'

const getCourseDiscussions = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.discussions.courses.get(data.code, data.id, data.page), callback, errorHandler)
}

const postCourseDiscussion = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.discussions.courses.post(data.code, data.id), callback, data.content, errorHandler)
}

export default {
  getCourseDiscussions,
  postCourseDiscussion
}
