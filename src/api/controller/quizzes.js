import request from '../default-request'
import config from '@/config/index'

const getQuizList = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.quiz.list(data.batchCode, data.page, data.pageSize), callback, errorHandler)
}

const getQuizById = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.quiz.detail(data.batchCode, data.id), callback, errorHandler)
}

const createQuiz = function (callback, data, payload, errorHandler) {
  request.postRequest(config.api.scoring.quiz.create(data.batchCode), callback, payload, errorHandler)
}

const updateQuiz = function (callback, data, payload, errorHandler) {
  request.putRequest(config.api.scoring.quiz.update(data.batchCode, data.id), callback, payload, errorHandler)
}

const deleteQuiz = function (callback, data, payload, errorHandler) {
  request.deleteRequest(config.api.scoring.quiz.delete(data.batchCode, data.id), callback, payload, errorHandler)
}

export default {
  getQuizList,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz
}
