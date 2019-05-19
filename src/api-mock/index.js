import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  stickyNotes,
  announcements,
  announcementDetails
} from '@/api-mock/mock/core-routes'
import {
  assignments
} from '@/api-mock/mock/scoring-routes'

const mock = new MockAdapter(axios)

const methodMap = {
  GET: 'onGet',
  PUT: 'onPut',
  POST: 'onPost'
}

stickyNotes.forEach(data => {
  mock[methodMap[data.method]](data.url).reply(200, data)
})

assignments.forEach(data => {
  mock[methodMap[data.method]] (data.url).reply(200, data)
})
