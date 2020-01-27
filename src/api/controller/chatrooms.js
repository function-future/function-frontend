import config from '../../config/index'
import request from '../default-request'

const getChatrooms = function (callback, error, data) {
  request.getRequest(
    config.api.communication.chatrooms.list(data.params.search, data.params.page, data.params.size),
    callback,
    error
  )
}

const getChatroomDetails = function (callback, error, data) {
  request.getRequest(
    config.api.communication.chatrooms.getDetails(data.params.chatroomId),
    callback,
    error
  )
}

const getMessages = function (callback, error, data) {
  request.getRequest(
    config.api.communication.chatrooms.getMessages(data.params.chatroomId, data.params.page, data.params.size),
    callback,
    error
  )
}

const getMessagesBeforePivot = function (callback, error, data) {
  request.getRequest(
    config.api.communication.chatrooms.getMessagesBeforePivot(data.params.messageId, data.params.chatroomId),
    callback,
    error
  )
}

const getMessagesAfterPivot = function (callback, error, data) {
  request.getRequest(
    config.api.communication.chatrooms.getMessagesAfterPivot(data.params.messageId, data.params.chatroomId),
    callback,
    error
  )
}

const getPublicMessages = function (callback, error, data) {
  request.getRequest(
    config.api.communication.chatrooms.getPublicMessages(data.params.page, config.dev.defaultPageSize),
    callback,
    error
  )
}

const createChatroom = function (callback, error, data) {
  request.postRequest(
    config.api.communication.chatrooms.create,
    callback,
    data.body,
    error
  )
}

const createMessage = function (callback, error, data) {
  request.postRequest(
    config.api.communication.chatrooms.createMessage(data.params.chatroomId),
    callback,
    data.body,
    error
  )
}

const updateChatroom = function (callback, error, data) {
  request.putRequest(
    config.api.communication.chatrooms.update(data.params.chatroomId),
    callback,
    data.body,
    error
  )
}

const updateSeenStatus = function (callback, error, data) {
  request.putRequest(
    config.api.communication.chatrooms.updateReadStatus(data.params.chatroomId, data.params.messageId),
    callback,
    null,
    error
  )
}

const enterChatroom = function (callback, error, data) {
  request.postRequest(
    config.api.communication.chatrooms.enterChatroom(data.params.chatroomId),
    callback,
    null,
    error
  )
}

const leaveChatroom = function (callback, error, data) {
  request.postRequest(
    config.api.communication.chatrooms.leaveChatroom(data.params.chatroomId),
    callback,
    null,
    error
  )
}

const setLimit = function (callback, error, data) {
  request.postRequest(
    config.api.communication.chatrooms.setLimit,
    callback,
    data.body,
    error
  )
}

const unsetLimit = function (callback, error) {
  request.postRequest(
    config.api.communication.chatrooms.unsetLimit,
    callback,
    null,
    error
  )
}

export default {
  getChatrooms,
  getChatroomDetails,
  getMessages,
  getMessagesBeforePivot,
  getMessagesAfterPivot,
  getPublicMessages,
  createChatroom,
  createMessage,
  updateChatroom,
  updateSeenStatus,
  enterChatroom,
  leaveChatroom,
  setLimit,
  unsetLimit
}
