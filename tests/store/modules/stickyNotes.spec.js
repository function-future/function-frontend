import store from '@/store/modules/stickyNotes'
import api from '@/api/controller/sticky-notes'

jest.mock('@/api/controller/sticky-notes')

describe('actions', () => {
  test('test', () => {
    expect(true).toBe(true)
  })

  test('fetchStickyNotes', async () => {
    api.getStickyNote = jest.fn()
    api.getStickyNote.mockResolvedValue()
    const commit = jest.fn()
    await store.actions.fetchStickyNotes({ commit })
    expect(commit).toHaveBeenCalledOnce
    // expect(commit).toHaveBeenCalledWith('actionName', mockResolvedValue.data)
  })

  test('postStickyNotes', async () => {
    api.createStickyNote = jest.fn()
    api.createStickyNote.mockResolvedValue()
  })
})
