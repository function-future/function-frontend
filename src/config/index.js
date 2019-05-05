module.exports = {
  app: {
    pages: {
      feeds: '/',
      blogs: '/blogs',
      announcements: {
        list: '/announcements',
        detail: '/announcements/:id',
        edit: '/announcements/:id/edit'
      },
      courses: '/courses',
      files: '/files',
      users: '/users',
      grades: '/grades',
      stickyNotes: {
        detail: '/sticky-notes',
        edit: '/sticky-notes/edit'
      }
    }
  },
  api: {
    core: {
      users: {},
      stickyNotes: {
        get: '/api/core/sticky-notes',
        post: '/api/core/sticky-notes'
      },
      announcements: {
        get: '/api/core/announcements'
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
