import api from '@/api/controller/reminders'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('Reminder Controller', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('getReminders', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.getReminders(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('createReminders', () => {
    const spy = jest.spyOn(request, 'postRequest')
    const callback = jest.fn()
    const data = {}
    const errorHandler = jest.fn()
    api.createReminder(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('getReminder', () => {
    const spy = jest.spyOn(request, 'getRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.getReminder(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('updateReminder', () => {
    const spy = jest.spyOn(request, 'putRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.updateReminder(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })

  test('deleteReminder', () => {
    const spy = jest.spyOn(request, 'deleteRequest')
    const callback = jest.fn()
    const data = { params: {} }
    const errorHandler = jest.fn()
    api.deleteReminder(callback, errorHandler, data)
    expect(spy).toBeCalledTimes(1)
  })
})
