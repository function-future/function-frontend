import request from '../default-request'
import config from '@/config/index'

const getMenuList = function (callback, errorHandler) {
  request.getRequest(config.api.core.access.menuList, callback, errorHandler)
}

export default {
  getMenuList
}
