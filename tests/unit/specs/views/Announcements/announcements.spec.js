import store from '@/store/modules/announcements'
import api from '@/api/controller/announcements'

jest.mock('@/api/controller/announcements')

describe('actions', () => {
  test('initialState', async () => {
    const commit = jest.fn()

    store.actions.initialState({ commit })
    expect(commit).toHaveBeenCalledTimes(2)
    expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENT_BY_ID', {})
    expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENTS', [])
  })

  test('fetchAnnouncementById', async () => {
    api.getAnnouncementDetail = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': {
          'id': 'sample-id',
          'title': 'Announcement 1',
          'summary': 'Summary goes here. Maximum 70 characters?',
          'description': 'Description goes here. Currently there is no limit to description length.',
          'files': [
            {
              'id': 'sample-id',
              'file': {
                'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
                'thumbnail': null
              }
            }
          ],
          'updatedAt': 1555980050616
        }
      })
    }

    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()

    const id = { id: 'sample-id' }
    const data = { ...id }
    store.actions.fetchAnnouncementById({ commit }, { data, callback, fail })

    expect(fail).toHaveBeenCalledTimes(0)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENT_BY_ID', {
      'id': 'sample-id',
      'title': 'Announcement 1',
      'summary': 'Summary goes here. Maximum 70 characters?',
      'description': 'Description goes here. Currently there is no limit to description length.',
      'files': [
        {
          'id': 'sample-id',
          'file': {
            'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
            'thumbnail': null
          }
        }
      ],
      'updatedAt': 1555980050616
    })
  })

  test('fetchAnnouncements', async () => {
    api.getAnnouncementList = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': [
          {
            'id': 'sample-id',
            'title': 'Announcement 1',
            'summary': 'Summary goes here. Maximum 70 characters?',
            'description': 'Description goes here. Currently there is no limit to description length.',
            'files': [
              {
                'id': 'sample-id',
                'file': {
                  'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
                  'thumbnail': null
                }
              }
            ],
            'updatedAt': 1555980050616
          },
          {
            'id': 'sample-id',
            'title': 'Announcement 1',
            'summary': 'Summary goes here. Maximum 70 characters?',
            'description': 'Description goes here. Currently there is no limit to description length.',
            'files': [
              {
                'id': 'sample-id',
                'file': {
                  'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
                  'thumbnail': null
                }
              }
            ],
            'updatedAt': 1555980050616
          }
        ],
        'paging': {
          'page': 1,
          'size': 2,
          'totalRecords': 100
        }
      })
    }

    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()

    const paging = { page: 0, size: 2 }
    const data = { ...paging }
    store.actions.fetchAnnouncements({ commit }, { data, callback, fail })

    expect(fail).toHaveBeenCalledTimes(0)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENTS', [
      {
        'id': 'sample-id',
        'title': 'Announcement 1',
        'summary': 'Summary goes here. Maximum 70 characters?',
        'description': 'Description goes here. Currently there is no limit to description length.',
        'files': [
          {
            'id': 'sample-id',
            'file': {
              'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'thumbnail': null
            }
          }
        ],
        'updatedAt': 1555980050616
      },
      {
        'id': 'sample-id',
        'title': 'Announcement 1',
        'summary': 'Summary goes here. Maximum 70 characters?',
        'description': 'Description goes here. Currently there is no limit to description length.',
        'files': [
          {
            'id': 'sample-id',
            'file': {
              'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'thumbnail': null
            }
          }
        ],
        'updatedAt': 1555980050616
      }
    ])
  })

  test('createAnnouncement', async () => {
    api.createAnnouncement = (success) => {
      success({
        'code': 201,
        'status': 'CREATED',
        'data': {
          'id': 'sample-id',
          'title': 'Announcement 1',
          'summary': 'Summary goes here. Maximum 70 characters?',
          'description': 'Description goes here. Currently there is no limit to description length.',
          'files': [
            {
              'id': 'sample-id',
              'file': {
                'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
                'thumbnail': null
              }
            }
          ],
          'updatedAt': 1555980050616
        }
      })

      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()

      const announcement = {
        'title': 'Announcement 1',
        'summary': 'Summary goes here. Maximum 70 characters?',
        'description': 'Description goes here. Currently there is no limit to description length.',
      }
      const data = { ...announcement }
      store.actions.createAnnouncement({ commit }, { data, callback, fail })

      expect(fail).toHaveBeenCalledTimes(0)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENT_BY_ID', {
        'id': 'sample-id',
        'title': 'Announcement 1',
        'summary': 'Summary goes here. Maximum 70 characters?',
        'description': 'Description goes here. Currently there is no limit to description length.',
        'files': [
          {
            'id': 'sample-id',
            'file': {
              'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'thumbnail': null
            }
          }
        ],
        'updatedAt': 1555980050616
      })
    }
  })

  test('updateAnnouncement', async () => {
    api.updateAnnouncement = (success) => {
      success({
        'code': 200,
        'status': 'OK',
        'data': {
          'id': 'sample-id',
          'title': 'Announcement 1 Edited',
          'summary': 'Summary goes here. Maximum 70 characters?',
          'description': 'Description goes here. Currently there is no limit to description length.',
          'files': [
            {
              'id': 'sample-id',
              'file': {
                'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
                'thumbnail': null
              }
            }
          ],
          'updatedAt': 1555980050616
        }
      })

      const commit = jest.fn()
      const callback = jest.fn()
      const fail = jest.fn()

      const announcement = {
        'id': 'sample-id',
        'title': 'Announcement 1',
        'summary': 'Summary goes here. Maximum 70 characters?',
        'description': 'Description goes here. Currently there is no limit to description length.',
      }
      const data = { ...announcement }
      store.actions.updateAnnouncement({ commit }, { data, callback, fail })

      expect(fail).toHaveBeenCalledTimes(0)
      expect(callback).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledTimes(1)
      expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENT_BY_ID', {
        'id': 'sample-id',
        'title': 'Announcement 1 Edited',
        'summary': 'Summary goes here. Maximum 70 characters?',
        'description': 'Description goes here. Currently there is no limit to description length.',
        'files': [
          {
            'id': 'sample-id',
            'file': {
              'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'thumbnail': null
            }
          }
        ],
        'updatedAt': 1555980050616
      })
    }
  })
})

describe('getters', () => {
  const state = {
    announcementList: [],
    announcement: {}
  }

  test('announcementList', () => {
    expect(store.getters.announcementList(state)).toEqual(state.announcementList)
  })

  test('announcement', () => {
    expect(store.getters.announcement(state)).toEqual(state.announcement)
  })
})

describe('mutations', () => {
  const state = {
    announcementList: [],
    announcement: {}
  }

  test('SET_ANNOUNCEMENTS', () => {
    const list = [
      {
        'id': 'sample-id',
        'title': 'Announcement 1',
        'summary': 'Summary goes here. Maximum 70 characters?',
        'description': 'Description goes here. Currently there is no limit to description length.',
        'files': [
          {
            'id': 'sample-id',
            'file': {
              'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'thumbnail': null
            }
          }
        ],
        'updatedAt': 1555980050616
      },
      {
        'id': 'sample-id',
        'title': 'Announcement 1',
        'summary': 'Summary goes here. Maximum 70 characters?',
        'description': 'Description goes here. Currently there is no limit to description length.',
        'files': [
          {
            'id': 'sample-id',
            'file': {
              'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
              'thumbnail': null
            }
          }
        ],
        'updatedAt': 1555980050616
      }
    ]

    store.mutations.SET_ANNOUNCEMENTS(state, list)
    expect(state.announcementList).toEqual({ ...list })
  })

  test('SET_ANNOUNCEMENT_BY_ID', () => {
    const announcementDetail = {
      'id': 'sample-id',
      'title': 'Announcement 1',
      'summary': 'Summary goes here. Maximum 70 characters?',
      'description': 'Description goes here. Currently there is no limit to description length.',
      'files': [
        {
          'id': 'sample-id',
          'file': {
            'full': 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png',
            'thumbnail': null
          }
        }
      ],
      'updatedAt': 1555980050616
    }

    store.mutations.SET_ANNOUNCEMENT_BY_ID(state, announcementDetail)
    expect(state.announcement).toEqual(announcementDetail)
  })
})
