import request from '../default-request'
import config from '@/config/index'

const getProfileData = function (callback, errorHandler) {
  request.getRequest(config.api.core.profile.get, callback, errorHandler)
}

const changePassword = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.profile.change_password, callback, data, errorHandler)
}

export default {
  getProfileData,
  changePassword
}
