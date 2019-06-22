import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  stickyNotes,
  announcements,
  announcementDetails
} from '@/api-mock/mock/core-routes'
import {
  assignments,
  assignmentDetails,
  assignmentRooms,
  quizzes,
  quizDetail,
  questionBanks
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
