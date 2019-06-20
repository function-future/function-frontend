import request from '../default-request'
import config from '@/config/index'

const getAssignmentRooms = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.rooms.list(data.batchCode, data.assignmentId, data.page, data.pageSize), callback, errorHandler)
}

const getAssignmentRoomById = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.rooms.detail(data.batchCode, data.assignmentId, data.roomId), callback, errorHandler)
}


export default {
  getAssignmentRooms,
  getAssignmentRoomById
}
