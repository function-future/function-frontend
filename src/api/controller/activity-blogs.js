import request from '../default-request'
import config from '@/config/index'

const getActivityBlogList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.activityBlogs.get(data.page, data.size), callback, errorHandler)
}

const getActivityBlogDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.activityBlogs.detail.get(data.id), callback, errorHandler)
}

const createActivityBlog = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.activityBlogs.post, callback, errorHandler)
}

const updateActivityBlog = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.activityBlogs.detail.update(data.id), callback, errorHandler)
}

const deleteActivityBlog = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.activityBlogs.detail.delete(data.id), callback, errorHandler)
}

export default {
  getActivityBlogList,
  getActivityBlogDetail,
  createActivityBlog,
  updateActivityBlog,
  deleteActivityBlog
}
