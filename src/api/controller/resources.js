import request from '../default-request'
import config from '@/config/index'

const uploadResource = function (callback, data, errorHandler, configuration) {
  request.postRequest(config.api.core.resources.post(data.source), callback, data.resources, errorHandler, configuration)
}

export default {
  uploadResource
}
