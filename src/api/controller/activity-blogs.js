import request from '../default-request'
import config from '@/config/index'

const getActivityBlogList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.activityBlogs.get(data.page, data.size), callback, errorHandler)
}

const deleteActivityBlog = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.core.activityBlogs.detail.delete(data.id), callback, errorHandler)
}

export default {
  getActivityBlogList,
  deleteActivityBlog
}
