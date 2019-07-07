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
      points: {
        list: '/points'
      },
      courses: {
        master: {
          list: '/courses',
          detail: '/courses/:id/detail',
          add: '/courses/add',
          edit: '/courses/:id/edit'
        },
        batches: {
          list: '/batches',
          add: '/batches/add',
          edit: '/batches/:id/edit'
        },
        list: '/batches/:code/courses',
        add: '/batches/:code/courses/add',
        detail: '/batches/:code/courses/:id/detail',
        edit: '/batches/:code/courses/:id/edit'
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
      questionBanks: {
        list: '/question-banks',
        add: '/question-banks/add',
        detail: '/question-banks/:bankId/detail',
        questions: {
          list: '/question-banks/:bankId/questions',
          add: '/question-banks/:bankId/questions/add',
          detail: '/question-banks/:bankId/questions/:questionId'
        }
      },
      quizzes: {
        list: '/quizzes',
        add: '/quizzes/add',
        addDetail: '/quizzes/addDetail',
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
      },
      chatrooms: '/chatrooms'
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
        get: '/api/core/batches',
        post: '/api/core/batches',
        detail: {
          get (id) { return `/api/core/batches/${id}` },
          update (id) { return `/api/core/batches/${id}` },
          delete (id) { return `/api/core/batches/${id}` }
        }
      },
      courses: {
        master: {
          get (page, size) { return `/api/core/courses?page=${page}&size=${size}` },
          post: 'api/core/courses',
          detail: {
            get (id) { return `/api/core/courses/${id}` },
            update (id) { return `/api/core/courses/${id}` },
            delete (id) { return `/api/core/courses/${id}` }
          }
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
          get (code, id, page) { return `/api/core/batches/${code}/courses/${id}/discussions?page=${page}` },
          post (code, id) { return `/api/core/batches/${code}/courses/${id}/discussions` }
        }
      }
    },
    scoring: {
      assignments: {
        list(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${pageSize}`
        },
        create(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments`
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
          return `/api/scoring/question-banks`
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
          return `/api/scoring/batches/${batchCode}/quizzes`
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
      },
      points: {
        list(studentId) {
          return `/api/students/${studentId}/points`
        }
      }
    },
    communication: {
      chatrooms: {
        list (type, search, page, size) {
          return `/api/communication/chatrooms?type=${type}&search=${search}&page=${page}&size=${size}`
        },
        getDetails (chatroomId) {
          return `/api/communication/chatrooms/${chatroomId}`
        },
        getMessages(chatroomId, page, size) {
          return `/api/communication/chatrooms/${chatroomId}/messages?page=${page}&size=${size}`
        },
        getPublicMessages (page, size) {
          return `/api/communication/chatrooms/public/messages?page=${page}&size=${size}`
        },
        create: '/api/communication/chatrooms/',
        createMessage(chatroomId) {
          return `/api/communication/chatrooms/${chatroomId}/messages`
        },
        update (chatroomId) {
          return `/api/communication/chatrooms/${chatroomId}`
        },
        updateReadStatus(chatroomId, messageId) {
          return `/api/communication/chatrooms/${chatroomId}/messages/${messageId}/_read`
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
    },
    defaultPageSize: 10
  }
}
