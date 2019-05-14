import axios from 'axios'

require('@mock-api')

const getRequest = function (path, callback, errorHandler, configuration) {
  axios.get(path, configuration)
    .then(({ data }) => {
      callback(data.response)
    })
    .catch(error => {
      if (typeof errorHandler === 'function') {
        errorHandler(error)
      }
    })
}

const postRequest = function (path, callback, data, errorHandler, configuration) {
  axios.post(path, data, configuration)
    .then(({ data }) => {
      callback(data.response)
    })
    .catch(error => {
      if (typeof errorHandler === 'function') {
        errorHandler(error)
      }
    })
}

const putRequest = function (path, callback, data, errorHandler, configuration) {
  axios.put(path, data, configuration)
    .then(({ data }) => {
      callback(data.response)
    })
    .catch(error => {
      if (typeof errorHandler === 'function') {
        errorHandler(error)
      }
    })
}

const deleteRequest = function (path, callback, errorHandler, configuration) {
  axios.delete(path, configuration)
    .then(callback)
    .catch(errorHandler)
}

export default {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
}
