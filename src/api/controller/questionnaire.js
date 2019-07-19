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

const getQuestionsQuestionnaire = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaire.getQuestionsQuestionnaire(data.params.questionnaireId),
    callback,
    error
  )
}

const updateQuestionQuestionnaire = function (callback, error, data) {
  request.putRequest(
    config.api.communication.questionnaire.updateQuestionQuestionnaire(data.params.questionnaireId, data.params.questionId),
    callback,
    data.body,
    error
  )
}

const deleteQuestionQuestionnaire = function (callback, error, data) {
  request.deleteRequest(
    config.api.communication.questionnaire.deleteQuestionQuestionnaire(data.params.questionnaireId, data.params.questionId),
    callback,
    error
  )
}

const getAppraiseeQuestionnaire = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaire.getAppraiseeQuestionnaire(data.params.questionnaireId, data.params.page, data.params.size),
    callback,
    error
  )
}

const addAppraiseeQuestionnaire = function (callback, error, data) {
  request.postRequest(
    config.api.communication.questionnaire.addAppraisee(data.params.questionnaireId),
    callback,
    data.body,
    error
  )
}

const deleteAppraiseeQuestionnaire = function (callback, error, data) {
  request.deleteRequest(
    config.api.communication.questionnaire.deleteAppraisee(data.params.questionnaireId, data.params.questionnaireParticipantId),
    callback,
    error
  )
}

const getAppraiserQuestionnaire = function (callback, error, data) {
  request.getRequest(
    config.api.communication.questionnaire.getAppraiserQuestionnaire(data.params.questionnaireId, data.params.page, data.params.size),
    callback,
    error
  )
}

const addAppraiserQuestionnaire = function (callback, error, data) {
  request.postRequest(
    config.api.communication.questionnaire.addAppraiser(data.params.questionnaireId),
    callback,
    data.body,
    error
  )
}

const deleteAppraiserQuestionnaire = function (callback, error, data) {
  request.deleteRequest(
    config.api.communication.questionnaire.deleteAppraiser(data.params.questionnaireId, data.params.questionnaireParticipantId),
    callback,
    error
  )
}


export default {
  getQuestionnaires,
  getQuestionnaire,
  createQuestionnaire,
  updateQuestionnaire,
  deleteQuestionnaire,
  addQuestionQuestionnaire,
  getQuestionsQuestionnaire,
  updateQuestionQuestionnaire,
  deleteQuestionQuestionnaire,
  getAppraiseeQuestionnaire,
  addAppraiseeQuestionnaire,
  deleteAppraiseeQuestionnaire,
  getAppraiserQuestionnaire,
  addAppraiserQuestionnaire,
  deleteAppraiserQuestionnaire
}
