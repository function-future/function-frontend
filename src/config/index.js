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
        batches: '/batches',
        list: '/batches/:batchCode/courses',
        add: '/batches/:batchCode/courses/add',
        detail: '/batches/:batchCode/courses/:id/detail',
        edit: '/batches/:batchCode/courses/:id/detail'
      },
      files: '/files',
      users: '/users',
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
        accessList(url) {
          return `/api/core/user/access-list?url=${url}`
        },
        menuList: '/api/core/menu-list'
      },
      resources: {
        post (source) { return `api/core/resources?source=${source}` }
      },
      users: {},
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
      courses: {
        get (batchCode, page, size) { return `/api/core/batches/${batchCode}/courses?page=${page}&size=${size}` },
        post (batchCode) { return `api/core/batches/${batchCode}/courses` },
        detail: {
          get (batchCode, id) {
            return `/api/core/batches/${batchCode}/courses/${id}`
          },
          update (batchCode, id) {
            return `/api/core/batches/${batchCode}/courses/${id}`
          },
          delete (batchCode, id) {
            return `/api/core/batches/${batchCode}/courses/${id}`
          }
        }
      },
      discussions: {
        courses: {
          get (batchCode, courseId) { return `/api/core/batches/${batchCode}/courses/${courseId}/discussions` },
          post (batchCode, courseId) { return `/api/core/batches/${batchCode}/courses/${courseId}/discussions` }
        }
      }
    },
    scoring: {
      assignments: {
        list(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${pageSize}`
        },
        create(batchCode, page, pageSize) {
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
