import axios from 'axios'
axios.defaults.withCredentials = true

if (process.env.NODE_ENV === 'development') {
  require('@mock-api')
}

axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response.status === 403) {
    this.$toasted.error('You are unauthorized, redirecting you to homepage')
    this.$router.push({ name: 'feeds' })
  }
  return Promise.reject(error)
})

const getRequest = function (path, callback, errorHandler, configuration) {
  axios.get(path, configuration)
    .then(({ data }) => {
      callback(data)
    })
    .catch(error => {
      console.log(path)
      console.log(error)
      if (typeof errorHandler === 'function') {
        errorHandler(error)
      }
    })
}

const postRequest = function (path, callback, data, errorHandler, configuration) {
  axios.post(path, data, configuration)
    .then(({ data }) => {
      callback(data)
    })
    .catch(error => {
      console.log(path)
      if (typeof errorHandler === 'function') {
        errorHandler(error)
      }
    })
}

const putRequest = function (path, callback, data, errorHandler, configuration) {
  axios.put(path, data, configuration)
    .then(({ data }) => {
      callback(data)
    })
    .catch(error => {
      if (typeof errorHandler === 'function') {
        errorHandler(error)
      }
    })
}

const deleteRequest = function (path, callback, errorHandler, configuration) {
  axios.delete(path, configuration)
    .then(({ data }) => {
      callback(data)
    })
    .catch(error => {
      if (typeof errorHandler === 'function') {
        errorHandler(error)
      }
    })
}

export default {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest
}
