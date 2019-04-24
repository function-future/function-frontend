module.exports = {
  app: {
    pages: {
      feeds: '/',
      blogs: '/blogs',
      announcements: '/announcements',
      courses: '/courses',
      files: '/files',
      users: '/users',
      grades: '/grades',
      stickyNotes: {
        list: '/sticky-notes',
        edit: '/sticky-notes/edit'
      }
    }
  },
  api: {
    users: {},
    sticky_notes: {},
    announcements: {}
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
