import config from '../../config/index'
import request from '../default-request'

const getUserSummary = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaireResults.getUserSummary(data.params.batchCode, data.params.page, data.params.size),
    callback,
    error
  )
}
const getUserSummaryById = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaireResults.getUserSummaryById(data.params.batchCode, data.params.userSummaryId),
    callback,
    error
  )
}

const getQuestionnairesSimpleSummary = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaireResponse.getQuestionnaireSimpleSummary(data.params.userSummaryId, data.params.page, data.params.size),
    callback,
    error
  )
}

const getQuestionnaireSummaryDetail = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaireResponse.getQuestionnaireSummaryDetail(data.params.questionnaireResponseSummaryId),
    callback,
    error
  )
}

const getQuestionSummaryResponse = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaireResponse.getQuestionSummaryResponse(data.params.questionnaireResponseSummaryId, data.params.userSummaryId),
    callback,
    error
  )
}

const getQuestionQuestionnaireSummaryResponse = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionResponse.getQuestionQuestionnaireSummaryResponse(data.params.questionResponseSummaryId),
    callback,
    error
  )
}

const getQuestionnaireAnswerDetailResponse = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionResponse.getQuestionnaireAnswerDetailSummary(data.params.questionResponseSummaryId),
    callback,
    error
  )
}

export default {
  getUserSummary,
  getUserSummaryById,
  getQuestionnairesSimpleSummary,
  getQuestionnaireSummaryDetail,
  getQuestionSummaryResponse,
  getQuestionQuestionnaireSummaryResponse,
  getQuestionnaireAnswerDetailResponse
}
