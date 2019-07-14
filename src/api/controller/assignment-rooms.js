import request from '../default-request'
import config from '@/config/index'

const getAssignmentRooms = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.rooms.list(data.batchCode, data.assignmentId, data.page, data.pageSize), callback, errorHandler)
}

const getAssignmentRoomById = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.rooms.detail(data.batchCode, data.assignmentId, data.roomId), callback, errorHandler)
}

const updateAssignmentRoomScore = function (callback, data, payload, errorHandler) {
  request.putRequest(config.api.scoring.assignments.rooms.update(data.batchCode, data.assignmentId, data.roomId), callback, payload, errorHandler)
}

const getAssignmentRoomComments = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.rooms.comments.list(data.batchCode, data.assignmentId, data.roomId, data.page, data.pageSize), callback, errorHandler)
}

const createAssignmentRoomComment = function (callback, data, payload, errorHandler) {
  request.postRequest(config.api.scoring.assignments.rooms.detail(data.batchCode, data.assignmentId, data.roomId, data.roomId), callback, payload, errorHandler)
}

export default {
  getAssignmentRooms,
  getAssignmentRoomById,
  updateAssignmentRoomScore,
  getAssignmentRoomComments,
  createAssignmentRoomComment
}
