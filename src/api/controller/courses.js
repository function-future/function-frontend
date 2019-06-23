import request from '../default-request'
import config from '@/config/index'

const getCourseList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.courses.get(data.batchCode, data.page, data.size), callback, errorHandler)
}

const createCourse = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.courses.post(data.batchCode), callback, data, errorHandler)
}

const getCourseDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.courses.detail.get(data.batchCode, data.id), callback, errorHandler)
}

const updateCourse = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.courses.detail.update(data.batchCode, data.id), callback, data, errorHandler)
}

const deleteCourse = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.courses.detail.delete(data.batchCode, data.id), callback, errorHandler)
}

export default {
  getCourseList,
  createCourse,
  getCourseDetail,
  updateCourse,
  deleteCourse
}
