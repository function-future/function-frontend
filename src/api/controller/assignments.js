import request from '../default-request'
import config from '@/config/index'

const getAssignmentsList = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.assignments.list(data.batchCode, data.page, data.pageSize), callback, errorHandler)
}

const createAssignment = function (callback, data, errorHandler) {
  request.postRequest(config.api.scoring.assignments.list(data.batchCode, data.page, data.pageSize), callback, errorHandler)
}

export default {
  getAssignmentsList,
  createAssignment
}
