import request from '../default-request'
import config from '@/config/index'

const getFileList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.files.list(data.parentId, data.page, data.size), callback, errorHandler)
}

const createFolder = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.files.create(data.parentId), callback, data.content, errorHandler)
}

export default {
  getFileList,
  createFolder
}
