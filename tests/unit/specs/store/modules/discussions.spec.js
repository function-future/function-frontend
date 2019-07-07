import store from '@/store/modules/discussions'
import api from '@/api/controller/discussions'

jest.mock('@/api/controller/discussions')

describe('discussions store module', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  describe('discussions actions', () => {
    test('fetchCourseDiscussions', () => {
      api.getCourseDiscussions = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': [
            {
              'id': 'sample-id-1',
              'author': {
                'id': 'sample-id',
                'name': 'Oliver Sebastian'
              },
              'comment': 'Comment Example 1',
              'createdAt': 1500000000
            },
            {
              'id': 'sample-id-2',
              'author': {
                'id': 'sample-id',
                'name': 'David William Kurnia'
              },
              'comment': 'Comment Example 1',
              'createdAt': 1500000000
            },
            {
              'id': 'sample-id-3',
              'author': {
                'id': 'sample-id',
                'name': 'Jonathan'
              },
              'comment': 'Comment Example 1',
              'createdAt': 1500000000
            },
            {
              'id': 'sample-id-4',
              'author': {
                'id': 'sample-id',
                'name': 'Stelli'
              },
              'comment': 'Comment Example 1',
              'createdAt': 1500000000
            }
          ],
          'paging': {
            'page': 1,
            'size': 4,
            'totalRecords': 20
          }
        })
      }

      const data = {
        code: 'sample-code',
        id: 'sample-id-1'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.fetchCourseDiscussions({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_COURSE_DISCUSSIONS', [
        {
          'id': 'sample-id-1',
          'author': {
            'id': 'sample-id',
            'name': 'Oliver Sebastian'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-2',
          'author': {
            'id': 'sample-id',
            'name': 'David William Kurnia'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-3',
          'author': {
            'id': 'sample-id',
            'name': 'Jonathan'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-4',
          'author': {
            'id': 'sample-id',
            'name': 'Stelli'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        }
      ])
    })

    test('submitCourseDiscussion', () => {
      api.postCourseDiscussion = (success) => {
        success({
          'code': 200,
          'status': 'OK',
          'data': {
            'id': 'sample-id',
            'author': {
              'id': 'sample-id',
              'name': 'User 1'
            },
            'comment': 'Comment Example 1',
            'createdAt': 1500000000
          }
        })
      }
      const data = {
        code: 'sample-code',
        id: 'sample-id-1'
      }
      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()
      store.actions.submitCourseDiscussion({ commit }, { data, callback, fail })
      expect(fail).not.toHaveBeenCalled()
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('discussions setter getters', () => {
    const state = {
      courseDiscussions: []
    }

    test('SET_COURSE_DISCUSSIONS & courseDiscussions', () => {
      store.mutations.SET_COURSE_DISCUSSIONS(state, [
        {
          'id': 'sample-id-1',
          'author': {
            'id': 'sample-id',
            'name': 'Oliver Sebastian'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-2',
          'author': {
            'id': 'sample-id',
            'name': 'David William Kurnia'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-3',
          'author': {
            'id': 'sample-id',
            'name': 'Jonathan'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-4',
          'author': {
            'id': 'sample-id',
            'name': 'Stelli'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1500000000
        }
      ])
      expect(store.getters.courseDiscussions(state)).toEqual(state.courseDiscussions)
    })
  })
})
