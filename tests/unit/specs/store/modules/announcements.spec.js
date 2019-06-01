import store from '@/store/modules/announcements'
import api from '@/api/controller/announcements'

jest.mock('@/api/controller/announcements')

describe('actions', () => {
  test('Sanity test', () => {
    expect(true).toBe(true)
  })

  test('Initial state', () => {
    const commit = jest.fn()
    store.actions.initialState({ commit })
    expect(commit).toHaveBeenCalledTimes(2)
    expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENT_BY_ID', {})
    expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENTS', [])
  })

  test('fetchAnnouncements', () => {
    api.getAnnouncementList = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": [
          {
            "id": "sample-id-1",
            "title": "Announcement 1",
            "summary": "Summary goes here. Maximum 70 characters?",
            "description": "Description goes here. Currently there is no limit to description length.",
            "files": [
              {
                "id": "sample-id",
                "file": {
                  "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                  "thumbnail": null
                }
              }
            ],
            "updatedAt": 1555980050616
          },
          {
            "id": "sample-id-2",
            "title": "Announcement 2",
            "summary": "Summary goes here. Maximum 70 characters?",
            "description": "Description goes here. Currently there is no limit to description length.",
            "files": [
              {
                "id": "sample-id",
                "file": {
                  "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                  "thumbnail": null
                }
              }
            ],
            "updatedAt": 1555980050616
          },
          {
            "id": "sample-id-3",
            "title": "Announcement 3",
            "summary": "Summary goes here. Maximum 70 characters?",
            "description": "Description goes here. Currently there is no limit to description length.",
            "files": [
              {
                "id": "sample-id",
                "file": {
                  "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                  "thumbnail": null
                }
              }
            ],
            "updatedAt": 1555980050616
          },
          {
            "id": "sample-id-4",
            "title": "Announcement 4",
            "summary": "Summary goes here. Maximum 70 characters?",
            "description": "Description goes here. Currently there is no limit to description length.",
            "files": [
              {
                "id": "sample-id",
                "file": {
                  "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                  "thumbnail": null
                }
              }
            ],
            "updatedAt": 1555980050616
          }
        ],
        "paging": {
          "page": 1,
          "size": 4,
          "totalRecords": 100
        }
      })
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
    store.actions.fetchAnnouncements({ commit }, { data, callback, fail })
    expect(fail).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENTS', [
      {
        "id": "sample-id-1",
        "title": "Announcement 1",
        "summary": "Summary goes here. Maximum 70 characters?",
        "description": "Description goes here. Currently there is no limit to description length.",
        "files": [
          {
            "id": "sample-id",
            "file": {
              "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
              "thumbnail": null
            }
          }
        ],
        "updatedAt": 1555980050616
      },
      {
        "id": "sample-id-2",
        "title": "Announcement 2",
        "summary": "Summary goes here. Maximum 70 characters?",
        "description": "Description goes here. Currently there is no limit to description length.",
        "files": [
          {
            "id": "sample-id",
            "file": {
              "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
              "thumbnail": null
            }
          }
        ],
        "updatedAt": 1555980050616
      },
      {
        "id": "sample-id-3",
        "title": "Announcement 3",
        "summary": "Summary goes here. Maximum 70 characters?",
        "description": "Description goes here. Currently there is no limit to description length.",
        "files": [
          {
            "id": "sample-id",
            "file": {
              "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
              "thumbnail": null
            }
          }
        ],
        "updatedAt": 1555980050616
      },
      {
        "id": "sample-id-4",
        "title": "Announcement 4",
        "summary": "Summary goes here. Maximum 70 characters?",
        "description": "Description goes here. Currently there is no limit to description length.",
        "files": [
          {
            "id": "sample-id",
            "file": {
              "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
              "thumbnail": null
            }
          }
        ],
        "updatedAt": 1555980050616
      }
    ])
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('fetchAnnouncementById ', () => {
    api.getAnnouncementDetail = (success) => {
      success({
        "code": 200,
        "status": "OK",
        "data": {
          "id": "sample-id-1",
          "title": "Announcement 1",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        }
      })
    }
    const data = {'id': 'sample-id-1'}
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.fetchAnnouncementById({ commit }, { data, callback, fail })
    expect(fail).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENT_BY_ID', {
      "id": "sample-id-1",
      "title": "Announcement 1",
      "summary": "Summary goes here. Maximum 70 characters?",
      "description": "Description goes here. Currently there is no limit to description length.",
      "files": [
      {
        "id": "sample-id",
        "file": {
          "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
          "thumbnail": null
        }
      }
    ],
      "updatedAt": 1555980050616
    })
    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('createAnnouncement', () => {
    api.createAnnouncement = (success) => {
      success({
        "code": 201,
        "status": "CREATED",
        "data": {
          "id": "sample-id",
          "title": "Announcement 1",
          "summary": "Summary goes here. Maximum 70 characters?",
          "description": "Description goes here. Currently there is no limit to description length.",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "updatedAt": 1555980050616
        }
      })
    }
    const data = {
      id: 'sample-id',
      title: 'sample title',
      summary: 'sample summary',
      description: 'sample announcement for testing purpose'
    }
    const commit = jest.fn()
    const callback = jest.fn()
    const fail = jest.fn()
    store.actions.createAnnouncement({ commit }, { data, callback, fail})
    expect(fail).toHaveBeenCalledTimes(0)
    expect(commit).toHaveBeenCalledWith('SET_ANNOUNCEMENT_BY_ID', {
      "id": "sample-id",
      "title": "Announcement 1",
      "summary": "Summary goes here. Maximum 70 characters?",
      "description": "Description goes here. Currently there is no limit to description length.",
      "files": [
        {
          "id": "sample-id",
          "file": {
            "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
            "thumbnail": null
          }
        }
      ],
      "updatedAt": 1555980050616
    })
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
