import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import request from '@/api/default-request'
import config from '@/config/index'

// jest.mock('axios', () => ({
//   get: jest.fn(() => Promise.resolve({
//     'code': 200,
//     'status': 'OK',
//     'data': {
//       'role': 'STUDENT',
//       'email': 'user@user.com',
//       'name': 'User Name',
//       'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
//     }
//   }))
// }))

describe('requests', () => {
  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  // test('getRequest', async () => {
  //   const path = config.api.core.auth.status
  //   const callback = jest.fn()
  //   const errorHandler = jest.fn()
  //   request.getRequest(path, callback, errorHandler)
  //   expect(axios.get).toBeCalledWith('/api/core/auth')
  // })
})
