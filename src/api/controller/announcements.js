import request from '../default-request'
import config from '@/config/index'

const getAnnouncementList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.announcements.get(data.page, data.size), callback, errorHandler)
}

const createAnnouncement = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.announcements.post, callback, data, errorHandler)
}

const getAnnouncementDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.announcements.detail.get(data.id), callback, errorHandler)
}

const updateAnnouncement = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.announcements.detail.update(data.id), callback, errorHandler)
}

const deleteAnnouncement = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.announcements.detail.delete(data.id), callback, errorHandler)
}

export default {
  getAnnouncementList,
  createAnnouncement,
  getAnnouncementDetail,
  updateAnnouncement,
  deleteAnnouncement
}
