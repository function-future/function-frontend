import request from '../default-request'
import config from '@/config/index'

const getStickyNotes = function (callback, errorHandler) {
  request.getRequest(config.api.core.stickyNotes.get, callback, errorHandler)
}

const createStickyNotes = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.stickyNotes.post, callback, data, errorHandler)
}

export default {
  getStickyNotes,
  createStickyNotes
}
