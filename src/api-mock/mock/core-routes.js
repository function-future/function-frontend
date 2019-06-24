export const auth = [
  {
    // Attempt Login
    method: 'POST',
    url: '/api/core/auth',
    param_body: ['email', 'password'],
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Name',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    }
  },
  {
    // Get login status
    method: 'GET',
    url: '/api/core/auth',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Name',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
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

// access-list
export const accessList = {
  method: 'GET',
  url: '/api/core/user/access-list?url=/feeds',
  response: {
    'add': true,
    'delete': true
  }
}

// menu-list
export const menuList = {
  method: 'GET',
  url: '/api/core/user/menu-list',
  response: {
    'courses': true,
    'files': true,
    'users': true,
    'grades': true,
    'chatroom': true
  }
}

export const stickyNotes = [
  {
    // Get StickyNote
    method: 'GET',
    url: '/api/core/sticky-notes',
    response: {
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
    }
  },
  {
    // Edit StickyNote
    method: 'POST',
    url: '/api/core/sticky-notes',
    response: {
      'code': 201,
      'status': 'CREATED',
      'data': {
        'id': '507f1f77bcf86cd799439011',
        'title': 'Sticky Note Title',
        'description': 'Note description goes here. Length is undetermined.',
        'updatedAt': 1555333551046
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
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-1',
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
          'id': 'sample-id-2',
          'title': 'Announcement 2',
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
          'id': 'sample-id-3',
          'title': 'Announcement 3',
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
          'id': 'sample-id-4',
          'title': 'Announcement 4',
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
        'size': 4,
        'totalRecords': 100
      }
    }
  },
  {
    // Create new announcement
    method: 'POST',
    url: '/api/core/announcements',
    response: {
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
    }
  }
]

export const announcementDetails = [
  {
    // Get announcement detail
    method: 'GET',
    url: '/api/core/announcements/sample-id-1',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-1',
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
    }
  },
  {
    // Update Announcement
    method: 'POST',
    url: '/api/core/announcements/sample-id-1',
    response: {
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
    }
  },
  {
    // Delete announcement
    method: 'DELETE',
    url: '/api/core/announcements/sample-id-1',
    response: {
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
    }
  },
  {
    // Update Announcement
    method: 'PUT',
    url: '/api/core/announcements/sample-id-1',
    response: {
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
    method: 'GET',
    url: '/api/core/activity-blogs/sample-id-1',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
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
      }
    }
  },
  {
    method: 'POST',
    url: '/api/core/activity-blogs',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
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
      }
    }
  },
  {
    method: 'PUT',
    url: '/api/core/activity-blogs/sample-id-1',
    response: {
      "code": 200,
      "status": "OK",
      "data": {
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
      }
    }
  },
  {
    method: 'DELETE',
    url: '/api/core/activity-blogs/sample-id-1',
    response: {
      "code": 200,
      "status": "OK"
    }
  }
]

export const resources = [
  {
    method: 'POST',
    url: '/api/core/resources?source=activity-blog',
    response: {
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
  }
]

export const users = [
  {
    method: 'GET',
    url: '/api/core/users?page=0&size=10&role=student',
    response: [
      {
        'id': 'sample-id-student',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      },
      {
        'id': 'sample-id-2',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      },
      {
        'id': 'sample-id-3',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 3',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      },
      {
        'id': 'sample-id-4',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 4',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      },
      {
        'id': 'sample-id-5',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 5',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      },
      {
        'id': 'sample-id-6',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 6',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      }
    ],
    'paging': {
      'page': 1,
      'size': 5,
      'totalRecords': 20
    }
  },
  {
    method: 'GET',
    url: '/api/core/users?page=0&size=10&role=mentor',
    response: [
      {
        'id': 'sample-id-mentor-1',
        'role': 'MENTOR',
        'email': 'user@user.com',
        'name': 'User Mentor 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-mentor-2',
        'role': 'MENTOR',
        'email': 'user@user.com',
        'name': 'User Mentor 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ],
    'paging': {
      'page': 1,
      'size': 5,
      'totalRecords': 20
    }
  },
  {
    method: 'GET',
    url: '/api/core/users?page=0&size=10&role=judge',
    response: [
      {
        'id': 'sample-id-judge-1',
        'role': 'JUDGE',
        'email': 'user@user.com',
        'name': 'User Judge 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ],
    'paging': {
      'page': 1,
      'size': 5,
      'totalRecords': 20
    }
  },
  {
    method: 'GET',
    url: '/api/core/users?page=0&size=10&role=admin',
    response: [
      {
        'id': 'sample-id-admin',
        'role': 'ADMIN',
        'email': 'user@user.com',
        'name': 'User Admin 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-2',
        'role': 'ADMIN',
        'email': 'user@user.com',
        'name': 'User Admin 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      {
        'id': 'sample-id-3',
        'role': 'ADMIN',
        'email': 'user@user.com',
        'name': 'User Admin 3',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    ],
    'paging': {
      'page': 1,
      'size': 5,
      'totalRecords': 20
    }
  },
  {
    method: 'GET',
    url: '/api/core/users/sample-id-student',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-student',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/users/sample-id-admin',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-admin',
        'role': 'ADMIN',
        'email': 'user@user.com',
        'name': 'User Admin 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      }
    }
  },
  {
    method: 'POST',
    url: '/api/core/users',
    response: {
      'code': 201,
      'status': 'CREATED',
      'data': {
        'id': 'sample-id',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      }
    }
  },
  {
    method: 'PUT',
    url: '/api/core/users/sample-id-student',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-student',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Student 2',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      }
    }
  },
  {
    method: 'PUT',
    url: '/api/core/users/sample-id-admin',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-admin',
        'role': 'ADMIN',
        'email': 'user@user.com',
        'name': 'User Admin 1',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      }
    }
  },
  {
    method: 'DELETE',
    url: '/api/core/users/sample-id-admin',
    response: {
      'code': 200,
      'status': 'OK'
    }
  },
  {
    method: 'DELETE',
    url: '/api/core/users/sample-id-student',
    response: {
      'code': 200,
      'status': 'OK'
    }
  }
]
