import request from '../default-request'
import config from '@/config/index'

const getCourseDiscussions = function (callback, data, errorHandler) {
  request.getRequest(config.api.discussions.courses.get(data.batchCode, data.courseId), callback, errorHandler)
}

const postCourseDiscussion = function (callback, data, errorHandler) {
  request.postRequest(config.api.discussions.courses.get(data.batchCode, data.courseId), callback, errorHandler)
}

export default {
  getCourseDiscussions,
  postCourseDiscussion
}
