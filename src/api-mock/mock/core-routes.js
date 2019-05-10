export const login = [
  {
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
