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
      users: '/users',
      questionBanks: {
        list: '/question-banks',
        add: '/question-banks/add',
        detail: '/question-banks/:id/detail',
        questions: {
          list: '/question-banks/:bankId/questions',
          add: '/question-banks/:bankId/questions/add',
          detail: '/question-banks/:bankId/questions/:questionId'
        }
      },
      quizzes: {
        list: '/quizzes',
        add: '/quizzes/add',
        detail: '/quizzes/:quizId/detail'
      },
      assignments: {
        list: '/assignments',
        add: '/assignments/add',
        rooms: {
          list: '/assignments/:id/rooms',
          detail: '/assignments/:id/rooms/:roomId'
        },
        detail: '/assignments/:id/detail'
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
      blogs: {
        get: '/api/core/activity-blogs'
      }
    },
    scoring: {
      assignments: {
        list(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${pageSize}`
        },
        create(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${pageSize}`
        },
        detail(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/assignments/${id}`
        },
        update(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/assignments/${id}`
        },
        rooms: {
          list(batchCode, assignmentId, page, pageSize) {
            return `/api/scoring/batches/${batchCode}/assignments/${assignmentId}/rooms?page=${page}&size=${pageSize}`
          },
          detail(batchCode, assignmentId, roomId) {
            return `api/scoring/batches/${batchCode}/assignments/${assignmentId}/rooms/${roomId}`
          },
          update(batchCode, assignmentId, roomId) {
            return `api/scoring/batches/${batchCode}/assignments/${assignmentId}/rooms/${roomId}`
          }
        }
      },
      questionBanks: {
        list (page, pageSize) {
          return `/api/scoring/question-banks?page=${page}&size=${pageSize}`
        },
        create (page, pageSize) {
          return `/api/scoring/question-banks?page=${page}&size=${pageSize}`
        },
        detail (id) {
          return `/api/scoring/question-banks/${id}`
        },
        update (id) {
          return `/api/scoring/question-banks/${id}`
        },
        delete (id) {
          return `/api/scoring/question-banks/${id}`
        },
        question: {
          list (bankId) {
            return `/api/scoring/question-banks/${bankId}/questions`
          },
          create (bankId) {
            return `/api/scoring/question-banks/${bankId}/questions`
          },
          detail (bankId, questionId) {
            return `/api/scoring/question-banks/${bankId}/questions/${questionId}`
          },
          update (bankId, questionId) {
            return `/api/scoring/question-banks/${bankId}/questions/${questionId}`
          },
          delete (bankId, questionId) {
            return `/api/scoring/question-banks/${bankId}/questions/${questionId}`
          }
        }
      },
      quiz: {
        list(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/quizzes?page=${page}&size=${pageSize}`
        },
        create(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/quizzes?page=${page}&size=${pageSize}`
        },
        detail(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/quizzes/${id}`
        },
        update(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/quizzes/${id}`
        },
        delete(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/quizzes/${id}`
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
