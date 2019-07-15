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
        'id': 'sample-id-1',
        'role': 'ADMIN',
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
        'id': 'sample-id-1',
        'role': 'ADMIN',
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

export const profile = [
  {
    method: 'GET',
    url: '/api/core/user/profile',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id',
        'role': 'STUDENT',
        'email': 'user@user.com',
        'name': 'User Name',
        'phone': '088888888888',
        'address': 'Jl. Address 1 Address 2',
        'deleted': false,
        'avatar': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        'batch': {
          'id': 'sample-id',
          'name': 'Batch Name',
          'code': '3'
        },
        'university': 'Bina Nusantara University'
      }
    }
  }
]

// access-list
export const accessList = [
  {
    method: 'GET',
    url: '/api/core/user/access-list?url=%2F',
    response: {
      'add': true,
      'delete': true,
      'edit': true,
      'read': true
    }
  },
  {
    method: 'GET',
    url: '/api/core/user/access-list?url=%2Fannouncements',
    response: {
      'add': true,
      'delete': true,
      'edit': true,
      'read': true
    }
  },
  {
    method: 'GET',
    url: '/api/core/user/access-list?url=%2Fsticky-notes',
    response: {
      'add': true,
      'delete': true,
      'edit': true,
      'read': true
    }
  }
]

// menu-list
export const menuList = [
  {
    method: 'GET',
    url: '/api/core/user/menu-list',
    response: {
      'courses': true,
      'files': true,
      'users': true,
      'chatroom': true,
      'questionBanks': true,
      'quizzes': true,
      'assignments': true,
      'comparisons': true,
      'points': true
    }
  }
]

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
    url: '/api/core/announcements?page=1&size=10',
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
        'size': 10,
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
    url: '/api/core/activity-blogs?page=1&size=10',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
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
            "id": "sample-id-1",
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
        "size": 10,
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
      'code': 201,
      'status': 'CREATED',
      'data': {
        'id': 'sample-id',
        'name': 'File Name',
        'file': {
          'full': 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
          'thumbnail': null
        }
      }
    }
  },
  {
    method: 'POST',
    url: '/api/core/resources?source=course',
    response: {
      'code': 201,
      'status': 'CREATED',
      'data': {
        'id': 'sample-id',
        'name': 'File Name',
        'file': {
          'full': 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
          'thumbnail': null
        }
      }
    }
  }
]

export const courses = [
  //master course
  {
    method: 'GET',
    url: '/api/core/courses?page=1&size=10',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-1',
          'title': 'Master Course Title 1',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-2',
          'title': 'Master Course Title 2',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-3',
          'title': 'Master Course Title 3',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-4',
          'title': 'Master Course Title 4',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-5',
          'title': 'Master Course Title 5',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-6',
          'title': 'Master Course Title 6',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-7',
          'title': 'Master Course Title 7',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-8',
          'title': 'Master Course Title 8',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-9',
          'title': 'Master Course Title 9',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-10',
          'title': 'Master Course Title 10',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      ],
      'paging': {
        'page': 1,
        'size': 10,
        'totalRecords': 20
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/courses?page=2&size=10',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-11',
          'title': 'Master Course Title 11',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-12',
          'title': 'Master Course Title 12',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-13',
          'title': 'Master Course Title 13',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-14',
          'title': 'Master Course Title 14',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      ],
      'paging': {
        'page': 2,
        'size': 10,
        'totalRecords': 20
      }
    }
  },
  // master course POST
  {
    method: 'POST',
    url: '/api/core/courses',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-1',
        'title': 'Master Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    }
  },
  // master course detail GET
  {
    method: 'GET',
    url: '/api/core/courses/sample-id-1',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-1',
        'title': 'Master Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    }
  },
  // master course detail EDIT
  {
    method: 'PUT',
    url: '/api/core/courses/sample-id-1',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-1',
        'title': 'Master Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    }
  },
  // master course DELETE
  {
    method: 'DELETE',
    url: '/api/core/courses/sample-id-1',
    response: {
      'code': 200,
      'status': 'OK'
    }
  },
  // course list GET
  {
    method: 'GET',
    url: '/api/core/batches/1/courses?page=1&size=10',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-1',
          'title': 'Course Title 1',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-2',
          'title': 'Course Title 2',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-3',
          'title': 'Course Title 3',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-4',
          'title': 'Course Title 4',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      ],
      'paging': {
        'page': 1,
        'size': 10,
        'totalRecords': 40
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/batches/1/courses?page=2&size=10',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-5',
          'title': 'Course Title 5',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        },
        {
          'id': 'sample-id-6',
          'title': 'Course Title 2',
          'description': 'Course Description Goes Here',
          'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
        }
      ],
      'paging': {
        'page': 2,
        'size': 10,
        'totalRecords': 40
      }
    }
  },
  // course POST
  {
    method: 'POST',
    url: '/api/core/batches/1/courses',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id',
        'title': 'Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    }
  },
  // course detail GET
  {
    method: 'GET',
    url: '/api/core/batches/1/courses/sample-id-1',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id',
        'title': 'Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    }
  },
  // course detail PUT
  {
    method: 'PUT',
    url: '/api/core/batches/1/courses/sample-id-1',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id',
        'title': 'Course Title',
        'description': '**Course** Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      }
    }
  },
  // course detail DELETE
  {
    method: 'DELETE',
    url: '/api/core/batches/1/courses/sample-id-1',
    response: {
      'code': 200,
      'status': 'OK'
    }
  }
]

export const batches = [
  {
    method: 'GET',
    url: '/api/core/batches',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-1',
          'code': '1',
          'name': 'Batch 1'
        },
        {
          'id': 'sample-id-2',
          'code': '2',
          'name': 'Batch 2'
        },
        {
          'id': 'sample-id-3',
          'code': '3',
          'name': 'Batch 3'
        },
        {
          'id': 'sample-id-4',
          'code': '4',
          'name': 'Batch 3'
        }
      ],
      'paging': {
        'page': 1,
        'size': 4,
        'totalRecords': 4
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/batches/sample-id-1',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-1',
        'code': 'Batch Code 1',
        'name': 'Batch Name'
      }
    }
  },
  {
    method: 'POST',
    url: '/api/core/batches',
    response: {
      'code': 200,
      'status': 'OK',
      'data': {
        'id': 'sample-id-1',
        'code': 'Batch Code 1',
        'name': 'Batch Name'
      }
    }
  }
]

export const discussions = [
  {
    method: 'GET',
    url: '/api/core/batches/1/courses/sample-id-1/discussions?page=1',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-1',
          'author': {
            'id': 'sample-id',
            'name': 'Oliver Sebastian'
          },
          'comment': 'Comment Example 12',
          'createdAt': 1580000000
        },
        {
          'id': 'sample-id-2',
          'author': {
            'id': 'sample-id',
            'name': 'David William Kurnia'
          },
          'comment': 'Comment Example 11',
          'createdAt': 1570000000
        },
        {
          'id': 'sample-id-3',
          'author': {
            'id': 'sample-id',
            'name': 'Jonathan'
          },
          'comment': 'Comment Example 10',
          'createdAt': 1560000000
        },
        {
          'id': 'sample-id-4',
          'author': {
            'id': 'sample-id',
            'name': 'Stelli'
          },
          'comment': 'Comment Example 9',
          'createdAt': 1550000000
        }
      ],
      'paging': {
        'page': 1,
        'size': 4,
        'totalRecords': 16
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/batches/1/courses/sample-id-1/discussions?page=2',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-5',
          'author': {
            'id': 'sample-id',
            'name': 'Oliver Sebastian'
          },
          'comment': 'Comment Example 8',
          'createdAt': 1540000000
        },
        {
          'id': 'sample-id-6',
          'author': {
            'id': 'sample-id',
            'name': 'David William Kurnia'
          },
          'comment': 'Comment Example 7',
          'createdAt': 1530000000
        },
        {
          'id': 'sample-id-7',
          'author': {
            'id': 'sample-id',
            'name': 'Jonathan'
          },
          'comment': 'Comment Example 6',
          'createdAt': 1520000000
        },
        {
          'id': 'sample-id-8',
          'author': {
            'id': 'sample-id',
            'name': 'Stelli'
          },
          'comment': 'Comment Example 5',
          'createdAt': 1510000000
        }
      ],
      'paging': {
        'page': 2,
        'size': 4,
        'totalRecords': 16
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/batches/1/courses/sample-id-1/discussions?page=3',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-9',
          'author': {
            'id': 'sample-id',
            'name': 'Oliver Sebastian'
          },
          'comment': 'Comment Example 4',
          'createdAt': 1500000000
        },
        {
          'id': 'sample-id-10',
          'author': {
            'id': 'sample-id',
            'name': 'David William Kurnia'
          },
          'comment': 'Comment Example 3',
          'createdAt': 1490000000
        },
        {
          'id': 'sample-id-11',
          'author': {
            'id': 'sample-id',
            'name': 'Jonathan'
          },
          'comment': 'Comment Example 2',
          'createdAt': 1480000000
        },
        {
          'id': 'sample-id-12',
          'author': {
            'id': 'sample-id',
            'name': 'Stelli'
          },
          'comment': 'Comment Example 1',
          'createdAt': 1470000000
        }
      ],
      'paging': {
        'page': 3,
        'size': 4,
        'totalRecords': 16
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/batches/1/courses/sample-id-1/discussions?page=4',
    response: {
      'code': 200,
      'status': 'OK',
      'data': [
        {
          'id': 'sample-id-13',
          'author': {
            'id': 'sample-id',
            'name': 'Oliver Sebastian'
          },
          'comment': 'Comment Example 0',
          'createdAt': 1460000000
        },
        {
          'id': 'sample-id-14',
          'author': {
            'id': 'sample-id',
            'name': 'David William Kurnia'
          },
          'comment': 'Comment Example -1',
          'createdAt': 1450000000
        },
        {
          'id': 'sample-id-15',
          'author': {
            'id': 'sample-id',
            'name': 'Jonathan'
          },
          'comment': 'Comment Example -2',
          'createdAt': 1440000000
        },
        {
          'id': 'sample-id-16',
          'author': {
            'id': 'sample-id',
            'name': 'Stelli'
          },
          'comment': 'Comment Example -3',
          'createdAt': 1430000000
        }
      ],
      'paging': {
        'page': 4,
        'size': 4,
        'totalRecords': 16
      }
    }
  },
  {
    method: 'POST',
    url: '/api/core/batches/1/courses/sample-id-1/discussions',
    response: {
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
    }
  }
]

export const users = [
  {
    method: 'GET',
    url: '/api/core/users?page=1&size=10&role=STUDENT',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
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
        'size': 10,
        'totalRecords': 20
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/users?page=1&size=10&role=MENTOR',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
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
        'size': 10,
        'totalRecords': 20
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/users?page=1&size=10&role=JUDGE',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
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
        'size': 10,
        'totalRecords': 20
      }
    }
  },
  {
    method: 'GET',
    url: '/api/core/users?page=1&size=10&role=ADMIN',
    response: {
      "code": 200,
      "status": "OK",
      "data": [
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
        'size': 10,
        'totalRecords': 20
      }
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
