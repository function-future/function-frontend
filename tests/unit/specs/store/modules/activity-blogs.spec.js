import store from '@/store/modules/activity-blogs'
import api from '@/api/controller/activity-blogs'

jest.mock('@/api/controller/activity-blogs')

describe('setter getter', () => {
  const state = {
    activityBlogs: [],
    activityBlog: {}
  }

  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('setter getters activityBlogs', () => {
    store.mutations.SET_ACTIVITY_BLOGS(state, [
      {
        'id': 'sample-id-1',
        'title': 'Activity Blog Title 5',
        'description': '**Description** in markdown format goes here',
        'files': [
          {
            'id': 'sample-id',
            'file': {
              'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'thumbnail': null
            }
          }
        ],
        'author': {
          'id': 'sample-id',
          'name': 'Student 1'
        }
      },
      {
        'id': 'sample-id-2',
        'title': 'Activity Blog Title 5',
        'description': 'Description in markdown format goes here',
        'files': [
          {
            'id': 'sample-id',
            'file': {
              'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'thumbnail': null
            }
          }
        ],
        'author': {
          'id': 'sample-id-3',
          'name': 'Student 1'
        }
      }
    ])

    expect(store.getters.activityBlogs(state)).toEqual(state.activityBlogs)
  })

  test('setter getters activityBlog', () => {
    store.mutations.SET_ACTIVITY_BLOG_BY_ID(state, {
      'id': 'sample-id-1',
      'title': 'Activity Blog Title 5',
      'description': '**Description** in markdown format goes here',
      'files': [
        {
          'id': 'sample-id',
          'file': {
            'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
            'thumbnail': null
          }
        }
      ],
      'author': {
        'id': 'sample-id',
        'name': 'Student 1'
      }
    })

    expect(store.getters.activityBlog(state)).toEqual(state.activityBlog)
  })
})
