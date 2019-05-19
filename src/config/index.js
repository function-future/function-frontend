module.exports = {
  app: {
    pages: {
      feeds: '/',
      blogs: '/blogs',
      announcements: '/announcements',
      courses: '/courses',
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
          return `/api/core/user/access-list?${url}`
        },
        menuList: '/api/core/menu-list'
      },
      users: {},
      stickyNotes: {
        get: '/api/core/sticky-notes',
        post: '/api/core/sticky-notes'
      },
      announcements: {
        get: '/api/core/announcements',
        post: '/api/core/announcements',
        detail: {
          get(announcementId) {
            return `/api/core/announcements/${announcementId}`
          },
          update(announcementId) {
            return `/api/core/announcements/${announcementId}`
          },
          delete(announcementId) {
            return `/api/core/announcements/${announcementId}`
          }
        }
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
        list(batchCode, page, pageSize) {
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
