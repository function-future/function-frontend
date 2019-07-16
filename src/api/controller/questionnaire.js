import config from '../../config/index'
import request from '../default-request'

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

export default {
  getQuestionnaire,
  createQuestionnaire

}
