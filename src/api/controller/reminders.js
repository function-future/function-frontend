import request from '../default-request'
import config from '../../config/index'

const getReminders = function (callback, error, data) {
  request.getRequest(
    config.api.communication.reminders.list(data.params.page, config.dev.defaultPageSize, data.params.keyword),
    callback,
    error
  )
}

const createReminder = function (callback, error, data) {
  request.postRequest(
    config.api.communication.reminders.create,
    callback,
    data.body,
    error
  )
}

const getReminder = function (callback, error, data) {
  request.getRequest(
    config.api.communication.reminders.get(data.params.reminderId),
    callback,
    error
  )
}

const updateReminder = function (callback, error, data) {
  request.putRequest(
    config.api.communication.reminders.update(data.params.reminderId),
    callback,
    data.body,
    error
  )
}

const deleteReminder = function (callback, error, data) {
  request.deleteRequest(
    config.api.communication.reminders.delete(data.params.reminderId),
    callback,
    error
  )
}

export default {
  getReminder,
  getReminders,
  updateReminder,
  deleteReminder,
  createReminder
}
