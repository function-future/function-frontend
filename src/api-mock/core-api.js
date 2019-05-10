import { axios } from '@/api/axios-config'
import {
  login,
  stickyNotes
} from '@/api-mock/mock/core-routes'
import config from '@/config'

const apiStickyNotes = config.api.stickyNotes

mock.onGet(apiStickyNotes.get).reply(200, stickyNotes[0])
