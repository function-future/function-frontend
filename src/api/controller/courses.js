import request from '../default-request'
import config from '@/config/index'

const getCourseList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.courses.get(data.code, data.page, data.size), callback, errorHandler)
}

const getMasterCourseList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.courses.master.get(data.page, data.size), callback, errorHandler)
}

const createCourse = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.courses.post(data.code), callback, data.content, errorHandler)
}

const createMasterCourse = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.courses.master.post, callback, data.content, errorHandler)
}

const getCourseDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.courses.detail.get(data.code, data.id), callback, errorHandler)
}

const getMasterCourseDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.courses.master.detail.get(data.id), callback, errorHandler)
}

const updateCourse = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.courses.detail.update(data.code, data.id), callback, data.content, errorHandler)
}

const updateMasterCourse = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.courses.master.detail.update(data.id), callback, data.content, errorHandler)
}

const deleteCourse = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.courses.detail.delete(data.code, data.id), callback, errorHandler)
}

const deleteMasterCourse = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.courses.master.detail.delete(data.id), callback, errorHandler)
}

export default {
  getCourseList,
  getMasterCourseList,
  createCourse,
  createMasterCourse,
  getCourseDetail,
  getMasterCourseDetail,
  updateCourse,
  updateMasterCourse,
  deleteCourse,
  deleteMasterCourse
}
