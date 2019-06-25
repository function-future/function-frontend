module.exports = {
  app: {
    pages: {
      feeds: '/',
      activityBlogs: {
        list: '/activity-blogs',
        add: '/activity-blogs/add',
        detail: '/activity-blogs/:id/detail',
        edit: '/activity-blogs/:id/edit'
      },
      announcements: {
        list: '/announcements',
        add: '/announcements/add',
        detail: '/announcements/:id/detail',
        edit: '/announcements/:id/edit'
      },
      courses: {
        master: {
          list: '/courses'
        },
        batches: '/batches',
        list: '/batches/:code/courses',
        add: '/batches/:code/courses/add',
        detail: '/batches/:code/courses/:id/detail',
        edit: '/batches/:code/courses/:id/detail'
      },
      files: '/files',
      users: {
        list: '/users',
        add: {
          student: '/users/add/student',
          user: '/users/add'
        },
        edit: {
          student: '/users/:id/edit/student',
          user: '/users/:id/edit'
        }
      },
      quizzes: '/quizzes',
      assignments: {
        list: '/assignments',
        add: '/assignments/add'
      },
      finalJudging: '/final-judging',
      grades: '/grades',
      stickyNotes: {
        detail: '/sticky-notes',
        edit: '/sticky-notes/edit'
      }
    }
  },
  api: {
    base_path: '',
    core: {
      auth: {
        status: '/api/core/auth',
        login: '/api/core/auth',
        logout: '/api/core/auth'
      },
      access: {
        accessList (url) {
          return `/api/core/user/access-list?url=${url}`
        },
        menuList: '/api/core/menu-list'
      },
      users: {
        get (page, size, role) { return `/api/core/users?page=${page}&size=${size}&role=${role}` },
        post: '/api/core/users',
        detail (id) { return `/api/core/users/${id}` }
      },
      resources: {
        post (source) { return `api/core/resources?source=${source}` }
      },
      stickyNotes: {
        get: '/api/core/sticky-notes',
        post: '/api/core/sticky-notes'
      },
      announcements: {
        get (page, size) { return `/api/core/announcements?page=${page}&size=${size}` },
        post: '/api/core/announcements',
        detail: {
          get (id) {
            return `/api/core/announcements/${id}`
          },
          update (id) {
            return `/api/core/announcements/${id}`
          },
          delete (id) {
            return `/api/core/announcements/${id}`
          }
        }
      },
      profile: {
        get: '/api/core/user/profile',
        change_password: '/api/core/user/password'
      },
      activityBlogs: {
        get (page, size) { return `/api/core/activity-blogs?page=${page}&size=${size}` },
        post: 'api/core/activity-blogs',
        detail: {
          get (id) {
            return `/api/core/activity-blogs/${id}`
          },
          update (id) {
            return `/api/core/activity-blogs/${id}`
          },
          delete (id) {
            return `/api/core/activity-blogs/${id}`
          }
        }
      },
      batches: {
        get: '/api/core/batches'
      },
      courses: {
        master: {
          get (page, size) { return `/api/core/courses?page=${page}&size=${size}` }
        },
        get (code, page, size) { return `/api/core/batches/${code}/courses?page=${page}&size=${size}` },
        post (code) { return `api/core/batches/${code}/courses` },
        detail: {
          get (code, id) {
            return `/api/core/batches/${code}/courses/${id}`
          },
          update (code, id) {
            return `/api/core/batches/${code}/courses/${id}`
          },
          delete (code, id) {
            return `/api/core/batches/${code}/courses/${id}`
          }
        }
      },
      discussions: {
        courses: {
          get (code, id) { return `/api/core/batches/${code}/courses/${id}/discussions` },
          post (code, id) { return `/api/core/batches/${code}/courses/${id}/discussions` }
        }
      }
    },
    scoring: {
      assignments: {
        list (batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${pageSize}`
        },
        create (batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${pageSize}`
        }
      }
    }
  },
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
}
