import request from '../default-request'
import config from '@/config/index'

const getAssignmentsList = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.list(data.batchCode, data.page, data.pageSize), callback, errorHandler)
}

const getAssignmentById = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.detail(data.batchCode, data.id), callback, errorHandler)
}

const createAssignment = function (callback, data, payload, errorHandler) {
  request.postRequest(config.api.scoring.assignments.create(data.batchCode), callback, payload, errorHandler)
}

const copyAssignment = function (callback, data, payload, errorHandler) {
  request.postRequest(config.api.scoring.assignments.copy(data.batchCode), callback, payload, errorHandler)
}

const updateAssignment = function (callback, data, payload, errorHandler) {
  request.putRequest(config.api.scoring.assignments.update(data.batchCode, data.id), callback, payload, errorHandler)
}

const deleteAssignment = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.scoring.assignments.delete(data.batchCode, data.id), callback, errorHandler)
}

export default {
  getAssignmentsList,
  getAssignmentById,
  createAssignment,
  copyAssignment,
  updateAssignment,
  deleteAssignment
}
