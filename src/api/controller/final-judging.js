import request from '../default-request'
import config from '@/config/index'

const getJudgingList = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.finalJudging.list(data.batchCode, data.page, data.pageSize), callback, errorHandler)
}

const createJudging = function (callback, data, payload, errorHandler) {
  request.postRequest(config.api.scoring.finalJudging.create(data.batchCode), callback, payload, errorHandler)
}

const getJudgingDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.finalJudging.detail(data.batchCode, data.judgingId), callback, errorHandler)
}

const getReportPage = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.finalJudging.getStudentsWithBatch(data.page, data.size, data.batchCode), callback, errorHandler)
}

const updateJudgingDetail = function (callback, data, payload, errorHandler) {
  request.putRequest(config.api.scoring.finalJudging.update(data.batchCode, data.judgingId), callback, payload, errorHandler)
}

const deleteJudging = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.scoring.finalJudging.delete(data.batchCode, data.judgingId), callback, errorHandler)
}

const getComparison = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.finalJudging.comparisons(data.batchCode, data.judgingId), callback, errorHandler)
}

const postFinalScore = function (callback, data, payload, errorHandler) {
  request.postRequest(config.api.scoring.finalJudging.score(), callback, payload, errorHandler)
}

export default {
  getJudgingList,
  createJudging,
  getJudgingDetail,
  getReportPage,
  updateJudgingDetail,
  deleteJudging,
  getComparison,
  postFinalScore
}
