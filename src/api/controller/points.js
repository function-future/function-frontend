import request from '../default-request'
import config from '@/config/index'

const getPoints = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.points.list(data.studentId, data.type, data.page, data.size), callback, errorHandler)
}

export default {
  getPoints
}
