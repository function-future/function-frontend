import request from '../default-request'
import config from '@/config/index'

const getFileList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.files.list(data.parentId, data.page, data.size), callback, errorHandler)
}

const createFolder = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.files.create(data.parentId), callback, data.content, errorHandler)
}

const uploadFile = function (callback, data, errorHandler, configuration) {
  request.postRequest(config.api.core.files.create(data.parentId), callback, data.content, errorHandler, configuration)
}

const deleteFile = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.files.delete(data.parentId, data.id), callback, errorHandler)
}

export default {
  getFileList,
  createFolder,
  uploadFile,
  deleteFile
}
