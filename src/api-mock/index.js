import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  stickyNotes,
  announcements,
  announcementDetails,
  activityBlogs,
  activityBlogDetail,
  resources,
  users

} from '@/api-mock/mock/core-routes'
import {
  assignments,
  assignmentDetails,
  assignmentRooms,
  quizzes,
  quizDetail,
  questionBanks,
  questionBankDetail,
  questionBankQuestions,
  questionBankQuestionDetail
} from '@/api-mock/mock/scoring-routes'

const mock = new MockAdapter(axios)

const methodMap = {
  GET: 'onGet',
  PUT: 'onPut',
  POST: 'onPost',
  DELETE: 'onDelete'
}

stickyNotes.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

announcements.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

announcementDetails.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

activityBlogs.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

activityBlogDetail.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

resources.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

users.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

assignments.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})

assignmentDetails.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})

assignmentRooms.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})

quizzes.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})

quizDetail.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})

questionBanks.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})

questionBankDetail.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})

questionBankQuestions.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})

questionBankQuestionDetail.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})
