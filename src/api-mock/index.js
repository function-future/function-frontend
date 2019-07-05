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
import {
  chatrooms
} from '@/api-mock/mock/communication-routes'

const mock = new MockAdapter(axios)

const methodMap = {
  GET: 'onGet',
  PUT: 'onPut',
  POST: 'onPost',
  DELETE: 'onDelete'
}

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

assignments.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

assignmentDetails.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

assignmentRooms.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

quizzes.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

quizDetail.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

questionBanks.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

questionBankDetail.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

questionBankQuestions.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})

questionBankQuestionDetail.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data.response)
})
