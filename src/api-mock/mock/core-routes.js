export const login = [
  {
    // Attempt Login
    method: 'POST',
    url: '/api/core/auth',
    param_body: ['email', 'password'],
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "role": "STUDENT",
        "email": "user@user.com",
        "name": "User Name",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      }
    }
  },
  {
    // Get login status
    method: 'GET',
    url: '/api/core/auth',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "role": "STUDENT",
        "email": "user@user.com",
        "name": "User Name",
        "avatar": "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
      }
    }
  },
  {
    // Attempt logout
    method: 'DELETE',
    url: '/api/core/auth',
    response: {
      code: 200,
      status: 'OK'
    }
  }
]

//access-list

//menu-list

//resource-upload

export const stickyNotes = [
  {
    // Get StickyNote
    method: 'GET',
    url: '/api/core/sticky-notes',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
          "id": "sample-id",
          "title": "Sticky Note Title",
          "description": "Note noteDescription goes here. Length is undetermined.",
          "updatedAt": 1555333551046
        }
      ],
      "paging": {
        "page": 1,
        "size": 1,
        "totalRecords": 100
      }
    }
  },
  {
    // Edit StickyNote
    method: 'POST',
    url: '/api/core/sticky-notes',
    response: {
      "code": 201,
      "status": "CREATED",
      "data": {
        "id": "507f1f77bcf86cd799439011",
        "title": "Sticky Note Title",
        "description": "Note description goes here. Length is undetermined.",
        "updatedAt": 1555333551046
      }
    }
  }
]

export const announcements = [
  {
    // Get list of announcements
    method: 'GET',
    url: '/api/core/announcements',
    param_body: ['page', 'size'],
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
      ]
    }
  },
  {
    //Create new announcement
    method: 'POST',
    url: '/api/core/announcements',
    param_body: ['page', 'size'],
    response: {
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
    }
  }
]