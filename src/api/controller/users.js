import request from '../default-request'
import config from '@/config/index'

const getUserList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.users.get(data.page, data.size, data.role), callback, errorHandler)
}

const getUserListWithRoleAndName = function (callback, data, errorHandler) {
  let path = config.api.core.users.getWithNameAndRole(data.name, data.page, data.size, data.role)
  if (data.batchCode !== '') {
    path = path + '&batch=' + data.batchCode
  }
  request.getRequest(path, callback, errorHandler)
}

const searchUser = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.users.search(data.params.page, data.params.size, data.params.name), callback, data, errorHandler)
}

const getUserDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.users.detail(data.id), callback, errorHandler)
}

const createUser = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.users.post, callback, data, errorHandler)
}

const updateUser = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.users.detail(data.id), callback, data, errorHandler)
}

const deleteUser = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.users.detail(data.id), callback, errorHandler)
}

export default {
  getUserList,
  getUserListWithRoleAndName,
  searchUser,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser
}
