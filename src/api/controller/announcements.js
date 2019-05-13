import request from '../default-request'
import config from '@/config/index'

const getAnnouncementList = function (callback, errorHandler) {
  request.getRequest(config.api.core.announcements.get, callback, errorHandler)
}

const createAnnouncement = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.announcements.post, callback, data, errorHandler)
}

const getAnnouncementDetail = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.announcements.detail.get(data.announcementId), callback, errorHandler)
}

const updateAnnouncement = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.announcements.detail.update(data.announcementId), callback, errorHandler)
}

const deleteAnnouncement = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.announcements.detail.delete(data.announcementId), callback, errorHandler)
}

export default {
  getAnnouncementList,
  createAnnouncement,
  getAnnouncementDetail,
  updateAnnouncement,
  deleteAnnouncement
}
