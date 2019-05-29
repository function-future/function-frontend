import store from '@/store/modules/stickyNotes'
import api from '@/api/controller/sticky-notes'

jest.mock('@/api/controller/sticky-notes')

describe('actions', () => {
  test('test', () => {
    expect(true).toBe(true)
  })

  test('fetchStickyNotes', async () => {
    api.getStickyNote = jest.fn()
    api.getStickyNote.mockResolvedValue({
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id',
          'title': 'Sticky Note Title',
          'description': 'Note noteDescription goes here. Length is undetermined.',
          'updatedAt': 1555333551046
        }
      ],
      'paging': {
        'page': 1,
        'size': 1,
        'totalRecords': 100
      }
    })
    const commit = jest.fn()
    store.actions.fetchStickyNotes({ commit })
    expect(commit).toHaveBeenCalledWith('SET_STICKY_NOTES_INFO', [
      {
        'id': 'sample-id',
        'title': 'Sticky Note Title',
        'description': 'Note noteDescription goes here. Length is undetermined.',
        'updatedAt': 1555333551046
      }
    ])
  })

  test('postStickyNotes', async () => {
    api.createStickyNote = jest.fn()
    api.createStickyNote.mockResolvedValue()
  })
})
