import config from '../../config/index'
import request from '../default-request'

const getMyQuestionnaires = function (callback, error, data) {
  request.getRequest(
    config.api.communication.myQuestionnaire.getMyquestionnnaires(data.params.page, data.params.size),
    callback,
    error
  )
}

const getListAppraisees = function (callback, error, data) {
  request.getRequest(
    config.api.communication.myQuestionnaire.getListAppraisees(data.params.questionnaireId),
    callback,
    error
  )
}

const getQuestionnaireData = function (callback, error, data) {
  request.getRequest(
    config.api.communication.myQuestionnaire.getQuestionnaireData(data.params.questionnaireId, data.params.appraiseeId),
    callback,
    error
  )
}

const getQuestion = function (callback, error, data) {
  request.getRequest(
    config.api.communication.myQuestionnaire.getQuestion(data.params.questionnaireId, data.params.appraiseeId),
    callback,
    error
  )
}

const addQuestionnaireResponse = function (callback, error, data) {
  request.postRequest(
    config.api.communication.myQuestionnaire.addQuestionnaireResponse(data.params.questionnaireId, data.params.appraiseeId),
    callback,
    error
  )
}
export default {
  getMyQuestionnaires,
  getListAppraisees,
  getQuestionnaireData,
  getQuestion,
  addQuestionnaireResponse
}
