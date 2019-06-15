import request from '../default-request'
import config from '@/config/index'

const getAssignmentsList = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.list(data.batchCode, data.page, data.pageSize), callback, errorHandler)
}

const getAssignmentById = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.detail(data.batchCode, data.id), callback, errorHandler)
}

const createAssignment = function (callback, data, payload, errorHandler) {
  request.postRequest(config.api.scoring.assignments.create(data.batchCode, data.page, data.pageSize), callback, payload, errorHandler)
}

export default {
  getAssignmentsList,
  getAssignmentById,
  createAssignment
}
