import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import request from '@/api/default-request'

let mock = new MockAdapter(axios)

describe('requests', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('Sanity Test', () => {
    expect(true).toBe(true)
  })

  test('GetRequestSuccess', () => {
    const spy = jest.spyOn(axios, 'get')
    const path = '/api/scoring/batches/futur3/assignments?page=0&size=10'
    const callback = jest.fn()
    const errorHandler = jest.fn()
    mock.onGet(path)
      .reply(200,
        {
          'code': 200,
          'status': 'OK',
          'data': [
            {
              'id': 'ASG0001',
              'title': 'Assignment 1',
              'description': 'Description Number 1',
              'deadline': 15000000,
              'batch': 3,
              'uploadedDate': 15000000000
            },
            {
              'id': 'ASG0002',
              'title': 'Assignment 2',
              'description': 'Description Number 2',
              'deadline': 30000000,
              'batch': 3,
              'uploadedDate': 30000000000
            }
          ],
          'paging': {
            'page': 1,
            'size': 12,
            'totalRecords': 13
          }
        })
    request.getRequest(path, callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('GetRequestFailed', () => {
    const spy = jest.spyOn(axios, 'get')
    const path = '/api/scoring/batches/futur3/assignments?page=0&size=10'
    const callback = jest.fn()
    const errorHandler = jest.fn()
    mock.onGet(path)
      .reply(404,
        {
          'code': 200,
          'status': 'OK',
          'data': [],
          'paging': {
            'page': 1,
            'size': 0,
            'totalRecords': 0
          }
        })
    request.getRequest(path, callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('GetRequestFailed without errorHandler', () => {
    const spy = jest.spyOn(axios, 'get')
    const path = '/api/scoring/batches/futur3/assignments?page=0&size=10'
    const callback = jest.fn()
    mock.onGet(path)
      .reply(404,
        {
          'code': 200,
          'status': 'OK',
          'data': [],
          'paging': {
            'page': 1,
            'size': 0,
            'totalRecords': 0
          }
        })
    request.getRequest(path, callback)
    expect(spy).toBeCalledTimes(1)
  })

  test('PostRequestSuccess', () => {
    const spy = jest.spyOn(axios, 'post')
    const path = '/api/scoring/batches/futur3/assignments?page=0&size=10'
    const data = {
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': 1500000000,
      'file': 'function-static.com/fileName.docx',
      'batch': 3
    }
    const callback = jest.fn()
    const errorHandler = jest.fn()
    mock.onPost(path, data)
      .reply(201,
        {
          'code': 201,
          'status': 'CREATED',
          'data': {
            'id': 'ASG0001',
            'title': 'Assignment 1',
            'description': 'Description Number 1',
            'deadline': 1500000000,
            'file': 'function-static.com/fileName.docx',
            'batch': 3
          }
        })
    request.postRequest(path, callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('PostRequestFailed', () => {
    const spy = jest.spyOn(axios, 'post')
    const path = '/api/scoring/batches/futur3/assignments?page=0&size=10'
    const data = {
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': 1500000000,
      'file': 'function-static.com/fileName.docx',
      'batch': 3
    }
    const callback = jest.fn()
    const errorHandler = jest.fn()
    mock.onPost(path, data)
      .reply(403)
    request.postRequest(path, callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('PostRequestFailed without errorHandler', () => {
    const spy = jest.spyOn(axios, 'post')
    const path = '/api/scoring/batches/futur3/assignments?page=0&size=10'
    const data = {
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': 1500000000,
      'file': 'function-static.com/fileName.docx',
      'batch': 3
    }
    const callback = jest.fn()
    mock.onPost(path, data)
      .reply(403)
    request.postRequest(path, callback, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('PutRequestSuccess', () => {
    const spy = jest.spyOn(axios, 'put')
    const path = '/api/scoring/batches/futur3/assignments/ASG0001'
    const data = {
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': 1500000000,
      'file': 'function-static.com/fileName.docx',
      'batch': 3
    }
    const callback = jest.fn()
    const errorHandler = jest.fn()
    mock.onPut(path, data)
      .reply(200,
        {
          'code': 200,
          'status': 'OK',
          'data': {
            'id': 'ASG0001',
            'title': 'Assignment 1',
            'description': 'Description Number 1',
            'deadline': 15000000,
            'file': 'http://function-static.com/ASG0001/fileName.docx',
            'batch': 3
          }
        })
    request.putRequest(path, callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('PutRequestFailed', () => {
    const spy = jest.spyOn(axios, 'put')
    const path = '/api/scoring/batches/futur3/assignments/ASG0001'
    const data = {
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': 1500000000,
      'file': 'function-static.com/fileName.docx',
      'batch': 3
    }
    const callback = jest.fn()
    const errorHandler = jest.fn()
    mock.onPut(path, data)
      .reply(403)
    request.putRequest(path, callback, data, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('PutRequestFailed without errorHandler', () => {
    const spy = jest.spyOn(axios, 'put')
    const path = '/api/scoring/batches/futur3/assignments/ASG0001'
    const data = {
      'id': 'ASG0001',
      'title': 'Assignment 1',
      'description': 'Description Number 1',
      'deadline': 1500000000,
      'file': 'function-static.com/fileName.docx',
      'batch': 3
    }
    const callback = jest.fn()
    mock.onPut(path, data)
      .reply(403)
    request.putRequest(path, callback, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('DeleteRequestSuccess', () => {
    const spy = jest.spyOn(axios, 'delete')
    const path = '/api/scoring/batches/futur3/assignments/ASG0001'
    const callback = jest.fn()
    const errorHandler = jest.fn()
    mock.onDelete(path)
      .reply(200,
        {
          'code': 200,
          'status': 'OK'
        })
    request.deleteRequest(path, callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('DeleteRequestFailed', () => {
    const spy = jest.spyOn(axios, 'delete')
    const path = '/api/scoring/batches/futur3/assignments/ASG0001'
    const callback = jest.fn()
    const errorHandler = jest.fn()
    mock.onDelete(path)
      .reply(500)
    request.deleteRequest(path, callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
  })

  test('DeleteRequestFailed without errorHandler', () => {
    const spy = jest.spyOn(axios, 'delete')
    const path = '/api/scoring/batches/futur3/assignments/ASG0001'
    const callback = jest.fn()
    mock.onDelete(path)
      .reply(500)
    request.deleteRequest(path, callback)
    expect(spy).toBeCalledTimes(1)
  })
})
