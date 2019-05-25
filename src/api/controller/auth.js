import request from '../default-request'
import config from '@/config/index'

const getLoginStatus = function (callback, errorHandler) {
  request.getRequest(config.api.core.auth.status, callback, errorHandler)
}

const attemptLogin = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.auth.login, callback, data, errorHandler)
}

const attemptLogout = function (callback, errorHandler) {
  request.deleteRequest(config.api.core.auth.logout, callback, errorHandler)
}

export default {
  getLoginStatus,
  attemptLogin,
  attemptLogout
}
