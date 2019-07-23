import request from '../default-request'
import config from '../../config/index'

const getNotifications = function (callback, error, data) {
  request.getRequest(
    config.api.communication.notifications.list(data.params.page, config.dev.defaultPageSize),
    callback,
    error
  )
}

const createNotification = function (callback, error, data) {
  request.postRequest(
    config.api.communication.notifications.create,
    callback,
    data.body,
    error
  )
}

const getTotalUnseen = function (callback, error) {
  request.getRequest(
    config.api.communication.notifications.getTotalUnseen,
    callback,
    error
  )
}

const readNotification = function (callback, error, data) {
  request.putRequest(
    config.api.communication.notifications.readNotification(data.params.notificationId),
    callback,
    null,
    error
  )
}

export default {
  getNotifications,
  createNotification,
  getTotalUnseen,
  readNotification
}
