import request from '../default-request'
import config from '@/config/index'

const getQuizzes = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.quiz.students.list(data.studentId, data.page, data.pageSize), callback, errorHandler)
}

const getQuizDetail = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.quiz.students.list(data.studentId, data.quizId), callback, errorHandler)
}

const getQuestions = function (callback, data, errorHandler) {
  request.getRequest(config.api.scoring.quiz.students.questions(data.studentId, data.quizId), callback, errorHandler)
}

const postQuizAnswer = function (callback, data, payload, errorHandler) {
  request.postRequest(config.api.scoring.quiz.students.questions(data.studentId, data.quizId), callback, payload, errorHandler)
}

export default {
  getPoints
}
