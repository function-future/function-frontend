import config from '../../config/index'
import request from '../default-request'

const getQuestionnaires = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaire.getQuestionnaires(data.page, data.size),
    callback,
    error
  )
}

const getQuestionnaire = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaire.getQuestionnaire(data.params.questionnaireId),
    callback,
    error
  )
}

const createQuestionnaire = function (callback, error, data) {
  request.postRequest(
    config.api.communication.questionnaire.createQuestionnaire(),
    callback,
    data.body,
    error
  )
}
const updateQuestionnaire = function (callback, error, data) {
  request.putRequest(
    config.api.communication.questionnaire.updateQuestionnaire(data.params.questionnaireId),
    callback,
    data.body,
    error
  )
}

const deleteQuestionnaire = function (callback, error, data) {
  request.deleteRequest(
    config.api.communication.questionnaire.deleteQuestionnaire(data.params.questionnaireId),
    callback,
    error
  )
}

const addQuestionQuestionnaire = function (callback, error, data) {
  request.postRequest(
    config.api.communication.questionnaire.createQuestionQuestionnaire(data.params.questionnaireId),
    callback,
    data.body,
    error
  )
}

export default {
  getQuestionnaires,
  getQuestionnaire,
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
  addQuestionQuestionnaire
}
