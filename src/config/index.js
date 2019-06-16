module.exports = {
  app: {
    pages: {
      feeds: '/',
      blogs: '/blogs',
      announcements: {
        list: '/announcements',
        add: '/announcements/add',
        detail: '/announcements/:id/detail',
        edit: '/announcements/:id/edit'
      },
      courses: '/courses',
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
      resources: {
        post (source) { return `api/core/resources?source=${source}` }
      },
      profile: {
        get: '/api/core/user/profile',
        change_password: '/api/core/user/password'
      },
      blogs: {
        get: '/api/core/activity-blogs'
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
