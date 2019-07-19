import request from '../default-request'
import config from '@/config/index'

const getFileList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.files.list(data.parentId), callback, errorHandler)
}

export default {
  getFileList
}
