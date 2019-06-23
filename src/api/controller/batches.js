import request from '../default-request'
import config from '@/config/index'

const getBatchList = function (callback, errorHandler) {
  request.getRequest(config.api.core.batches.get, callback, errorHandler)
}

export default {
  getBatchList
}
