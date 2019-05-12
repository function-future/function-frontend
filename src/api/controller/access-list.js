import request from '../default-request'
import config from '@/config/index'

const getAccessList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.access.accessList(data.url), callback, errorHandler)
}

export default {
  getAccessList
}
