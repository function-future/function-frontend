import request from '../default-request'
import config from '@/config/index'

const getMenuList = function (callback, errorHandler) {
  request.getRequest(config.api.core.access.menuList, callback, errorHandler)
}

const getAccessList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.access.accessList(data), callback, errorHandler)
}

export default {
  getMenuList,
  getAccessList
}
