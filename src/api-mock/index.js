import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  auth,
  profile,
  menuList,
  accessList,
  stickyNotes,
  announcements,
  announcementDetails,
  activityBlogs,
  activityBlogDetail,
  courses,
  discussions,
  batches,
  resources,
  users,
  files
} from '@/api-mock/mock/core-routes'
import {
  assignments,
  assignmentDetails,
  assignmentRooms,
  assignmentRoomComment,
  quizzes,
  quizDetail,
  studentQuiz,
  studentQuizDetail,
  studentQuizQuestion,
  questionBanks,
  questionBankDetail,
  questionBankQuestions,
  questionBankQuestionDetail,
  points
} from '@/api-mock/mock/scoring-routes'
import {
  chatrooms,
  myQuestionnaires
} from '@/api-mock/mock/communication-routes'

const mock = new MockAdapter(axios)

const methodMap = {
  GET: 'onGet',
  PUT: 'onPut',
  POST: 'onPost',
  DELETE: 'onDelete'
}

auth.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

profile.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

menuList.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

accessList.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

stickyNotes.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

announcements.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

announcementDetails.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

chatrooms.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

activityBlogs.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

activityBlogDetail.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

resources.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

users.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

courses.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

batches.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

discussions.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

files.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

assignments.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

assignmentDetails.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

assignmentRooms.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

assignmentRoomComment.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

quizzes.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

quizDetail.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

studentQuiz.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

studentQuizDetail.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

studentQuizQuestion.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

questionBanks.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

questionBankDetail.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

questionBankQuestions.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

questionBankQuestionDetail.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

myQuestionnaires.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data.response)
})

points.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})
