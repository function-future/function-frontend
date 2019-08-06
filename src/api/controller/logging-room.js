import config from '../../config/index'
import request from '../default-request.js'

const getLoggingRoomsByMember = function (callback, error, data) {
  request.getRequest(
    config.api.communication.loggingRoom.getLoggingRoomsByMember(data.params.keyword, data.params.page, data.params.size),
    callback,
    error
  )
}

const createLoggingRoom = function (callback, error, data) {
  request.postRequest(
    config.api.communication.loggingRoom.createLoggingRoom(),
    callback,
    data.body,
    error
  )
}

const getLoggingRoom = function (callback, error, data) {
  request.getRequest(
    config.api.communication.loggingRoom.getLoggingRoom(data.params.loggingRoomId),
    callback,
    error
  )
}

const updateLoggingRoom = function (callback, error, data) {
  request.putRequest(
    config.api.communication.loggingRoom.updateLoggingRoom(data.params.loggingRoomId),
    callback,
    data.body,
    error
  )
}

const deleteLoggingRoom = function (callback, error, data) {
  request.deleteRequest(
    config.api.communication.loggingRoom.deleteLoggingRoom(data.params.loggingRoomId),
    callback,
    error
  )
}

const getLoggingRoomTopic = function (callback, error, data) {
  request.getRequest(
    config.api.communication.loggingRoom.getLoggingRoomTopic(data.params.loggingRoomId, data.params.page, data.params.size),
    callback,
    error
  )
}

const createTopic = function (callback, error, data) {
  request.postRequest(
    config.api.communication.loggingRoom.createTopic(data.params.loggingRoomId),
    callback,
    data.body,
    error
  )
}

const getTopic = function (callback, error, data) {
  request.getRequest(
    config.api.communication.loggingRoom.getTopic(data.params.loggingRoomId, data.params.topicId),
    callback,
    error
  )
}

const updateTopic = function (callback, error, data) {
  request.putRequest(
    config.api.communication.loggingRoom.updateTopic(data.params.loggingRoomId, data.params.topicId),
    callback,
    data.body,
    error
  )
}

const deleteTopic = function (callback, error, data) {
  request.deleteRequest(
    config.api.communication.loggingRoom.deleteTopic(data.params.loggingRoomId, data.params.topicId),
    callback,
    error
  )
}

const getLogMessages = function (callback, error, data) {
  request.getRequest(
    config.api.communication.loggingRoom.getLogMessages(data.params.loggingRoomId, data.params.topicId, data.params.page, data.params.size),
    callback,
    error
  )
}

const createLogMessage = function (callback, error, data) {
  request.postRequest(
    config.api.communication.loggingRoom.createLogMessage(data.params.loggingRoomId, data.params.topicId),
    callback,
    data.body,
    error
  )
}

export default {
  getLoggingRoomsByMember,
  createLoggingRoom,
  getLoggingRoom,
  updateLoggingRoom,
  deleteLoggingRoom,
  getLoggingRoomTopic,
  createTopic,
  getTopic,
  updateTopic,
  deleteTopic,
  getLogMessages,
  createLogMessage
}
