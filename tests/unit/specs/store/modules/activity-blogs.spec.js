import store from '@/store/modules/activity-blogs'
import api from '@/api/controller/activity-blogs'

jest.mock('@/api/controller/activity-blogs')

describe('setter getter activity-blogs', () => {
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

describe('actions activity-blogs', () => {
  test('initialState', () => {
    const commit = jest.fn()
    store.actions.initialState({ commit })
    expect(commit).toHaveBeenCalledWith('SET_ACTIVITY_BLOG_BY_ID', {})
    expect(commit).toHaveBeenCalledWith('SET_ACTIVITY_BLOGS', [])
  })

  test('fetchActivityBlogs', () => {
    const response = {
      'code': 200,
      'status': 'OK',
      'data': [
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
        }]
    }
    api.getActivityBlogList = (success) => {
      success(response)
    }
    const data = {
      'paging': {
        'page': 1,
        'size': 4
      }
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.fetchActivityBlogs({ commit }, { callback, data, fail })
    expect(fail).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_ACTIVITY_BLOGS', response.data)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('fetchActivityBlogById', () => {
    const response = {
      'code': 200,
      'status': 'OK',
      'data': {
        'code': 200,
        'status': 'OK',
        'data': {
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
        }
      }
    }
    api.getActivityBlogDetail = (success) => {
      success(response)
    }
    const data = {
      id: 'sample-id'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.fetchActivityBlogById({ commit }, { callback, data, fail })
    expect(fail).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_ACTIVITY_BLOG_BY_ID', response.data)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('createActivityBlog', () => {
    const response = {
      'code': 200,
      'status': 'OK',
      'data': {
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
      }
    }
    api.createActivityBlog = (success) => {
      success(response)
    }
    const data = {
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
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.createActivityBlog({ commit }, { callback, data, fail })
    expect(fail).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_ACTIVITY_BLOG_BY_ID', response.data)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('updateActivityBlog', () => {
    const response = {
      'code': 200,
      'status': 'OK',
      'data': {
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
      }
    }
    api.updateActivityBlog = (success) => {
      success(response)
    }
    const data = {
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
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.updateActivityBlog({ commit }, { data, callback, fail })
    expect(fail).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_ACTIVITY_BLOG_BY_ID', response.data)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('deleteActivityBlogById', () => {
    const response = {
      'code': 200,
      'status': 'OK'
    }
    api.deleteActivityBlog = (success) => {
      success(response)
    }
    const data = {
      'id': 'sample-id-1'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.deleteActivityBlogById({ commit }, { callback, data, fail })
    expect(fail).toHaveBeenCalledTimes(0)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('uploadResource', () => {
    const response = {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "sample-id",
        "name": "File Name",
        "file": {
          "full": "https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg",
          "thumbnail": null
        }
      }
    }
    api.uploadResource = (success) => {
      success(response)
    }

    const data = new FormData()
    let configuration = { headers: { 'Content-Type': 'multipart/form-data' } }

    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.uploadResource({ commit }, { callback, data, fail, configuration })
    expect(fail).toHaveBeenCalledTimes(0)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
