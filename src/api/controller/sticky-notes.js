import request from '../default-request'
import config from '@/config/index'

const getStickyNote = function (callback, errorHandler) {
  request.getRequest(config.api.core.stickyNotes.get, callback, errorHandler)
}

const createStickyNote = function (callback, data, errorHandler) {
  request.postRequest(config.api.core.stickyNotes.post, callback, data, errorHandler)
  console.log(data)
}

export default {
  getStickyNote,
  createStickyNote
}
