module.exports = {
  app: {
    pages: {
      feeds: '/',
      activityBlogs: {
        list: '/activity-blogs',
        detail: '/activity-blogs/:id',
        edit: '/activity-blogs/:id/edit'
      },
      announcements: '/announcements',
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
      announcements: {}
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
