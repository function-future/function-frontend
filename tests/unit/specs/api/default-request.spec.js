import request from '@/api/default-request'
import AxiosMockAdapter from 'axios-mock-adapter'

const axios = require('axios')
describe('requests', () => {
  let mock

  beforeEach(() => {
    mock = new AxiosMockAdapter(axios)
  })

  afterEach(() => {
    mock.restore()
  })

  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  // test('GetRequest fails', (done) => {
  //   const path = '/api/scoring/batches/futur3/assignments?page=0&size=10'
  //   const callback = jest.fn()
  //   const errorHandler = jest.fn()
  //   moxios.stubRequest('/api/scoring/batches/futur3/assignments?page=0&size=10', {
  //     'code': 200,
  //     'status': 'OK',
  //     'data': [
  //       {
  //         'id': 'ASG0001',
  //         'title': 'Assignment 1',
  //         'description': 'Description Number 1',
  //         'deadline': 15000000,
  //         'batch': 3,
  //         'uploadedDate': 15000000000
  //       },
  //       {
  //         'id': 'ASG0002',
  //         'title': 'Assignment 2',
  //         'description': 'Description Number 2',
  //         'deadline': 30000000,
  //         'batch': 3,
  //         'uploadedDate': 30000000000
  //       }
  //     ],
  //     'paging': {
  //       'page': 1,
  //       'size': 12,
  //       'totalRecords': 13
  //     }
  //   })
  //   request.getRequest(path, callback, errorHandler)
  //
  //   moxios.wait(() => {
  //     expect(errorHandler).toBeCalledTimes(1)
  //     done()
  //   })
  // })

  // test('GetRequest success', () => {
  //   const fakeData = {
  //     'code': 200,
  //     'status': 'OK',
  //     'data': [
  //       {
  //         'id': 'ASG0001',
  //         'title': 'Assignment 1',
  //         'description': 'Description Number 1',
  //         'deadline': 15000000,
  //         'batch': 3,
  //         'uploadedDate': 15000000000
  //       },
  //       {
  //         'id': 'ASG0002',
  //         'title': 'Assignment 2',
  //         'description': 'Description Number 2',
  //         'deadline': 30000000,
  //         'batch': 3,
  //         'uploadedDate': 30000000000
  //       }
  //     ],
  //     'paging': {
  //       'page': 1,
  //       'size': 12,
  //       'totalRecords': 13
  //     }
  //   }
  //   const path = '/api/scoring/batches/futur3/assignments?page=0&size=10'
  //   const callback = jest.fn()
  //   const errorHandler = jest.fn()
  //   mock.onGet(path).replyOnce(200, fakeData)
  //
  //   const response = request.getRequest(path, callback, errorHandler)
  //   console.log(response)
  //   setTimeout(() => {
  //     console.log(response)
  //     expect(response).toEqual(fakeData)
  //   }, 0)
  // })
})
