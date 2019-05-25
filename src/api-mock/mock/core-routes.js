export const auth = [
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
export const accessList = {
  method: 'GET',
  url: '/api/core/user/access-list?url=/feeds',
  response: {
    "add": true,
    "delete": true
  }
}

//menu-list
export const menuList = {
  method: 'GET',
  url: '/api/core/user/menu-list',
  response: {
    "courses": true,
    "files": true,
    "users": true,
    "grades": true,
    "chatroom": true
  }
}

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
    url: '/api/core/announcements?page=0&size=10',
    response: {
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
    }
  },
  {
    //Create new announcement
    method: 'POST',
    url: '/api/core/announcements',
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

export const announcementDetails = [
  {
    // Get announcement detail
    method: 'GET',
    url: '/api/core/announcements/sample-id-1',
    response: {
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
    }
  },
  {
    // Update Announcement
    method: 'POST',
    url: '/api/core/announcements/sample-id-1',
    response: {
      "code": 200,
      "status": "OK",
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
  },
  {
    // Delete announcement
    method: 'DELETE',
    url: '/api/core/announcements/sample-id-1',
    response: {
      "code": 200,
      "status": "OK",
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
  },
  {
    // Update Announcement
    method: 'PUT',
    url: '/api/core/announcements/sample-id-1',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
        "id": "sample-id",
        "title": "Announcement 1 Edited",
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

export const activityBlogs = [
  {
    // Get list of announcements
    method: 'GET',
    url: '/api/core/activity-blogs?page=0&size=10',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
        {
          "id": "sample-id-1",
          "title": "Activity Blog Title 5",
          "description": "**Description** in markdown format goes here",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "author": {
            "id": "sample-id",
            "name": "Student 1"
          }
        },
        {
          "id": "sample-id-2",
          "title": "Activity Blog Title 5",
          "description": "Description in markdown format goes here",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "author": {
            "id": "sample-id-3",
            "name": "Student 1"
          }
        },
        {
          "id": "sample-id-3",
          "title": "Activity Blog Title 5",
          "description": "Description in markdown format goes here",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "author": {
            "id": "sample-id-4",
            "name": "Student 1"
          }
        },
        {
          "id": "sample-id-4",
          "title": "Activity Blog Title 5",
          "description": "Description in markdown format goes here",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "author": {
            "id": "sample-id",
            "name": "Student 1"
          }
        },
        {
          "id": "sample-id-5",
          "title": "Activity Blog Title 5",
          "description": "Description in markdown format goes here",
          "files": [
            {
              "id": "sample-id",
              "file": {
                "full": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png",
                "thumbnail": null
              }
            }
          ],
          "author": {
            "id": "sample-id",
            "name": "Student 1"
          }
        }
      ],
      "paging": {
        "page": 1,
        "size": 5,
        "totalRecords": 24
      }
    }
  }
]

export const activityBlogDetail = [
  {
    method: 'DELETE',
    url: '/api/core/activity-blogs/sample-id-1',
    response: {
      "code": 200,
      "status": "OK"
    }
  }
]
