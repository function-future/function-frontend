import api from '@/api/controller/sticky-notes'
import request from '@/api/default-request'

jest.mock('@/api/default-request')

describe('controller', function () {
  test('getStickyNote', async () => {
    request.getRequest = jest.fn()
    const callback = jest.fn()
    const errorHandler = jest.fn()
    api.getStickyNote(callback, errorHandler)
    expect(request.getRequest).toHaveBeenCalledTimes(1)
  })

  test('createStickyNote', async () => {
    request.postRequest = jest.fn()
    const callback = jest.fn()
    const errorHandler = jest.fn()
    const stickyNote = {
      'title': 'Sticky Note Title',
      'description': 'Note description goes here. Length is undetermined.',
      'updatedAt': 1555333551046
    }
    const data = { ...stickyNote }
    api.createStickyNote(callback, data, errorHandler)
    expect(request.postRequest).toHaveBeenCalledTimes(1)
  })
})
