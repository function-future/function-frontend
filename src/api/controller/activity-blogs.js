import request from '../default-request'
import config from '@/config/index'

const getActivityBlogList = function (callback, data, errorHandler) {
  request.getRequest(config.api.core.activityBlogs.get(data.page, data.size), callback, errorHandler)
}

export default {
  getActivityBlogList
}
