import request from '../default-request'
import config from '@/config/index'

const getBatchList = function (callback, errorHandler) {
  request.getRequest(config.api.core.batches.get, callback, errorHandler)
}

const getBatchDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.batches.detail.get(data.id), callback, errorHandler)
}

const createBatch = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.batches.post, callback, data.content, errorHandler)
}

const updateBatch = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.batches.detail.update(data.id), callback, data.content, errorHandler)
}

const deleteBatch = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.batches.detail.delete(data.id), callback, errorHandler)
}

export default {
  getBatchList,
  getBatchDetail,
  createBatch,
  updateBatch,
  deleteBatch
}
