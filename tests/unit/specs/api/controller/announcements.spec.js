import api from '@/api/controller/announcements'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('controller', () => {
  test('getAnnouncementList', async () => {
    request.getRequest = jest.fn()
    const callback = jest.fn()
    const errorHandler = jest.fn()

    const paging = { page: 1, size: 10 }
    const data = { ...paging }
    api.getAnnouncementList(callback, data, errorHandler)

    expect(request.getRequest).toHaveBeenCalledTimes(1)
  })

  test('createAnnouncement', async () => {
    request.postRequest = jest.fn()
    const callback = jest.fn()
    const errorHandler = jest.fn()

    const announcement = {
      'title': 'Announcement 1',
      'summary': 'Summary goes here. Maximum 70 characters?',
      'description': 'Description goes here. Currently there is no limit to description length.'
    }
    const data = { ...announcement }
    api.createAnnouncement(callback, data, errorHandler)
    expect(request.postRequest).toHaveBeenCalledTimes(1)
  })

  test('getAnnouncementDetail', async () => {
    request.getRequest = jest.fn()
    const callback = jest.fn()
    const errorHandler = jest.fn()

    const id = { 'id': 'sample-id' }
    const data = { ...id }
    api.getAnnouncementDetail(callback, data, errorHandler)
    expect(request.getRequest).toHaveBeenCalledTimes(1)
  })

  test('updateAnnouncement', async () => {
    request.putRequest = jest.fn()
    const callback = jest.fn()
    const errorHandler = jest.fn()

    const announcement = {
      'id': 'sample-id',
      'title': 'Announcement 1',
      'summary': 'Summary goes here. Maximum 70 characters?',
      'description': 'Description goes here. Currently there is no limit to description length.'
    }
    const data = { ...announcement }
    api.updateAnnouncement(callback, data, errorHandler)
    expect(request.putRequest).toHaveBeenCalledTimes(1)
  })

  test('deleteAnnouncement', async () => {
    request.deleteRequest = jest.fn()
    const callback = jest.fn()
    const errorHandler = jest.fn()

    const id = { 'id': 'sample-id' }
    const data = { ...id }
    api.deleteAnnouncement(callback, data, errorHandler)
    expect(request.deleteRequest).toHaveBeenCalledTimes(1)
  })
})
