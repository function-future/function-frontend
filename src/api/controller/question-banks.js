import request from '../default-request'
import config from '@/config/index'

const getQuestionBankList = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.questionBanks.list(data.page, data.pageSize), callback, errorHandler)
}

const getQuestionBankById = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.questionBanks.detail(data.bankId), callback, errorHandler)
}

const getQuestionList = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.questionBanks.question.list(data.bankId, data.page, data.size), callback, errorHandler)
}

const getQuestionById = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.questionBanks.question.detail(data.bankId, data.questionId), callback, errorHandler)
}

const createQuestionBank = function (callback, payload, errorHandler) {
  request.postRequest(config.api.scoring.questionBanks.create, callback, payload, errorHandler)
}

const createQuestion = function (callback, data, payload, errorHandler) {
  request.postRequest(config.api.scoring.questionBanks.question.create(data.bankId), callback, payload, errorHandler)
}

const updateQuestionBank = function (callback, data, payload, errorHandler) {
  request.putRequest(config.api.scoring.questionBanks.update(data.bankId), callback, payload, errorHandler)
}

const updateQuestion = function (callback, data, payload, errorHandler) {
  request.putRequest(config.api.scoring.questionBanks.question.update(data.bankId, data.questionId), callback, payload, errorHandler)
}

const deleteQuestionBank = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.scoring.questionBanks.delete(data.id), callback, errorHandler)
}

const deleteQuestion = function (callback, data, errorHandler) {
  request.deleteRequest(config.api.scoring.questionBanks.question.delete(data.bankId, data.id), callback, errorHandler)
}

export default {
  getQuestionBankList,
  getQuestionBankById,
  getQuestionList,
  getQuestionById,
  createQuestionBank,
  createQuestion,
  updateQuestionBank,
  updateQuestion,
  deleteQuestionBank,
  deleteQuestion
}
