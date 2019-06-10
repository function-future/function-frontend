import request from '../default-request'
import config from '@/config/index'

const getActivityBlogList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.activityBlogs.get(data.page, data.size), callback, errorHandler)
}

const getActivityBlogDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.activityBlogs.detail.get(data.id), callback, errorHandler)
}

const createActivityBlog = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.activityBlogs.post, callback, data, errorHandler)
}

const updateActivityBlog = function (callback, data, errorHandler) {
  request.putRequest(config.api.core.activityBlogs.detail.update(data.id), callback, data, errorHandler)
}

const deleteActivityBlog = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.activityBlogs.detail.delete(data.id), callback, errorHandler)
}

const uploadResource = function (callback, data, errorHandler, configuration) {
  request.postRequest(config.api.core.resources.post('activity-blog'), callback, data, errorHandler, configuration)
}

export default {
  getActivityBlogList,
  getActivityBlogDetail,
  createActivityBlog,
  updateActivityBlog,
  deleteActivityBlog,
  uploadResource
}
