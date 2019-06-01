import store from '@/store/modules/stickyNotes'
import api from '@/api/controller/sticky-notes'

jest.mock('@/api/controller/sticky-notes')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('initialState', () => {
    const commit = jest.fn()
    store.actions.initialState({ commit })
    expect(commit).toHaveBeenCalledWith('SET_STICKY_NOTES_INFO', {})
  })

  test('fetchStickyNotes', async () => {
    api.getStickyNote = (success) => {
      success({
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
    }
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.fetchStickyNotes({ commit }, { callback, fail })
    expect(fail).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_STICKY_NOTES_INFO', {
      'noteTitle': 'Sticky Note Title',
      'noteDescription': 'Note noteDescription goes here. Length is undetermined.',
      'updatedAt': 1555333551046
    })
    expect(callback).toBeCalledTimes(1)
  })

  test('postStickyNotes', async () => {
    api.createStickyNote = (success) => {
      success({
        'method': 'POST',
        'url': '/api/core/sticky-notes',
        'response': {
          "code": 201,
          "status": "CREATED",
          "data": {
            "id": "507f1f77bcf86cd799439011",
            "title": "Sticky Note Title",
            "description": "Note description goes here. Length is undetermined.",
            "updatedAt": 1555333551046
          }
        }
      })
    }
    const data = {
      'title': 'Sticky Note Title',
      'description': 'Note description goes here. Length is undetermined.',
      'updatedAt': 1555333551046
    }
    const commit = jest.fn()
    const fail = jest.fn()
    const callback = jest.fn()
    store.actions.postStickyNotes({ commit }, { data, callback, fail })
    expect(fail).toBeCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_STICKY_NOTES_INFO', {
      'title': 'Sticky Note Title',
      'description': 'Note description goes here. Length is undetermined.',
      'updatedAt': 1555333551046
    })
    expect(callback).toBeCalledTimes(1)

  })
})

describe('getters', () => {
  const state = {
    stickyNote: {
      noteTitle: '',
      noteDescription: '',
      updatedAt: ''
    }
  }

  test('stickyNotes', () => {
    expect(store.getters.stickyNotes(state)).toEqual({
      noteTitle: state.stickyNote.noteTitle,
      noteDescription: state.stickyNote.noteDescription,
      updatedAt: state.stickyNote.updatedAt
    })
  })
})

describe('mutations', () => {
  const state = {
    stickyNote: {
      noteTitle: '',
      noteDescription: '',
      updatedAt: ''
    }
  }
  test('SET_STICKY_NOTES_INFO', () => {
    store.mutations.SET_STICKY_NOTES_INFO(state, {
      'title': 'Sticky Note Title',
      'description': 'Note description goes here. Length is undetermined.',
      'updatedAt': 1555333551046
    })
    expect(state.stickyNote).toEqual({
      'title': 'Sticky Note Title',
      'description': 'Note description goes here. Length is undetermined.',
      'updatedAt': 1555333551046
    })
  })
})
