import api from '@/api/controller/resources'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Resources Controller', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('uploadResource', async (done) => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.uploadResource(callback, errorHandler)
    expect(spy).toBeCalledTimes(1)
    done()
  })
})
