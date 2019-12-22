module.exports = {
  app: {
    pages: {
      auth: {
        login: '/login'
      },
      user: {
        account: '/account',
        profile: '/profile',
        profileMobile: '/m/profile',
        changePassword: '/profile/change-password',
        changePasswordMobile: '/m/profile/change-password'
      },
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
      batches: {
        list: '/batches',
        add: '/batches/add',
        edit: '/batches/:id/edit'
      },
      courses: {
        master: {
          list: '/courses',
          detail: '/courses/:id/detail',
          add: '/courses/add',
          edit: '/courses/:id/edit'
        },
        list: '/courses',
        add: '/batches/:code/courses/add',
        detail: '/batches/:code/courses/:id/detail',
        edit: '/batches/:code/courses/:id/edit'
      },
      files: {
        root: '/files',
        folder: '/files/:parentId',
        detail: '/files/:parentId/:id'
      },
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
      scoring: {
        admin: '/scoring'
      },
      questionBanks: {
        list: '/question-banks',
        add: '/question-banks/add',
        edit: '/question-banks/:id/edit',
        detail: '/question-banks/:bankId/detail',
        questions: {
          list: '/question-banks/:bankId/questions',
          add: '/question-banks/:bankId/questions/add',
          detail: '/question-banks/:bankId/questions/:questionId/detail',
          edit: '/question-banks/:bankId/questions/:questionId/edit'
        }
      },
      quizzes: {
        list: '/batches/:batchCode/quizzes',
        add: '/batches/:batchCode/quizzes/add',
        addDetail: '/batches/:batchCode/quizzes/addDetail',
        detail: '/batches/:batchCode/quizzes/:quizId/detail',
        batches: {
          list: '/quiz/batches',
          add: '/quiz/batches/add',
          edit: '/quiz/batches/:batchCode/edit'
        },
      },
      assignments: {
        list: '/batches/:batchCode/assignments',
        add: '/batches/:batchCode/assignments/add',
        edit: '/batches/:batchCode/assignments/:assignmentId/edit',
        rooms: {
          list: '/batches/:batchCode/assignments/:assignmentId/rooms',
          detail: '/batches/:batchCode/assignments/:assignmentId/rooms/:studentId'
        },
        detail: '/batches/:batchCode/assignments/:assignmentId/detail',
      },
      finalJudging: {
        list: '/final-judging',
        add: '/batches/:batchCode/final-judging/add',
        detail: '/batches/:batchCode/final-judging/:judgingId/detail',
        edit: '/batches/:batchCode/final-judging/:judgingId/edit',
        reportPage: '/batches/:batchCode/final-judging/report-page'
      },
      stickyNotes: {
        detail: '/sticky-notes',
        edit: '/sticky-notes/edit'
      },
      students: {
        quizzes: {
          list: '/quizzes',
          detail: '/quizzes/:quizId/detail',
          questions: '/quizzes/:quizId/questions'
        },
        assignments: '/assignments'
      },
      chatrooms: '/chatrooms',
      reminders: {
        list: '/reminders',
        detail: '/reminders/:reminderId/detail',
        edit: '/reminders/:reminderId/edit',
        create: '/reminders/create'
      },
      notifications: '/notifications',
      myQuestionnaire: {
        default: '/my-questionnaire',
        appraisee: '/my-questionnaire/:questionnaireId/appraisees',
        form: '/my-questionnaire/:questionnaireId/appraisees/:appraiseeId'
      },
      questionnaires: {
        default: '/questionnaires',
        create: '/questionnaires/_create',
        edit: '/questionnaires/:questionnaireId/_edit'
      },
      questionnaireResults: {
        default: '/questionnaire-results',
        members: '/questionnaire-results/:batchCode/members',
        memberDetail: '/questionnaire-results/:batchCode/members/:userSummaryId',
        questionnaireDetail: '/questionnaire-results/:batchCode/members/:userSummaryId/questionnaire/:questionnaireId',
        questionDetail: '/questionnaire-results/:batchCode/members/:userSummaryId/questionnaire/:questionnaireId/question/:questionId'
      },
      loggingRoom: {
        default: '/logging-rooms',
        topics: '/logging-rooms/:loggingRoomId/topics',
        logMessages: '/logging-rooms/:loggingRoomId/topics/:topicId',
        create: '/logging-rooms/_create',
        edit: '/logging-rooms/:loggingRoomId/_edit'
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
        menuList: '/api/core/user/menu-list'
      },
      users: {
        get (page, size, role) { return `/api/core/users?page=${page}&size=${size}&role=${role}` },
        post: '/api/core/users',
        detail (id) { return `/api/core/users/${id}` },
        search (page, size, name) { return `/api/core/users/_search?name=${name}&page=${page}&size=${size}` },
        getWithNameAndRole (name, page, size, role) { return `/api/core/users?name=${name}&page=${page}&size=${size}&role=${role}` }
      },
      resources: {
        post (origin) { return `/api/core/resources?origin=${origin}` }
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
        change_password: '/api/core/user/password',
        updateProfilePicture: '/api/core/user/profile/picture'
      },
      activityBlogs: {
        get (page, size) { return `/api/core/activity-blogs?page=${page}&size=${size}` },
        user (page, size, userId) { return `/api/core/activity-blogs?page=${page}&size=${size}&userId=${userId}` },
        post: '/api/core/activity-blogs',
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
          post: '/api/core/courses',
          detail: {
            get (id) { return `/api/core/courses/${id}` },
            update (id) { return `/api/core/courses/${id}` },
            delete (id) { return `/api/core/courses/${id}` }
          }
        },
        get (code, page, size) { return `/api/core/batches/${code}/courses?page=${page}&size=${size}` },
        post (code) { return `/api/core/batches/${code}/courses` },
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
      },
      files: {
        list (parentId, page, size) { return `/api/core/files/${parentId}?page=${page}&size=${size}` },
        create (parentId) { return `/api/core/files/${parentId}` },
        delete (parentId, id) { return `/api/core/files/${parentId}/${id}` },
        detail (parentId, id) { return `/api/core/files/${parentId}/${id}` },
        update (parentId, id) { return `/api/core/files/${parentId}/${id}` }
      }
    },
    scoring: {
      assignments: {
        list(batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${pageSize}`
        },
        create(batchCode) {
          return `/api/scoring/batches/${batchCode}/assignments`
        },
        copy(batchCode) {
          return `/api/scoring/batches/${batchCode}/assignments/copy`
        },
        detail(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/assignments/${id}`
        },
        update(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/assignments/${id}`
        },
        delete(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/assignments/${id}`
        },
        rooms: {
          list(batchCode, assignmentId, page, pageSize) {
            return `/api/scoring/batches/${batchCode}/judgings/students?page=${page}&size=${pageSize}`
          },
          detail(batchCode, assignmentId, studentId) {
            return `/api/scoring/batches/${batchCode}/assignments/${assignmentId}/room/${studentId}`
          },
          update(batchCode, assignmentId, roomId) {
            return `/api/scoring/batches/${batchCode}/assignments/${assignmentId}/room/${roomId}`
          },
          score(batchCode, assignmentId, roomId) {
            return `/api/scoring/batches/${batchCode}/assignments/${assignmentId}/room/${roomId}`
          },
          comments: {
            list(batchCode, assignmentId, studentId, page, pageSize) {
              return `/api/scoring/batches/${batchCode}/assignments/${assignmentId}/room/${studentId}/comments?page=${page}&size=${pageSize}`
            },
            create(batchCode, assignmentId, studentId) {
              return `/api/scoring/batches/${batchCode}/assignments/${assignmentId}/room/${studentId}/comments`
            },
          }
        },
        students (batchCode, page, size) {
          return `/api/scoring/batches/${batchCode}/assignments?page=${page}&size=${size}`
        }
      },
      questionBanks: {
        list (page, pageSize) {
          return `/api/scoring/question-banks?page=${page}&size=${pageSize}`
        },
        create: `/api/scoring/question-banks`,
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
          list (bankId, page, size) {
            return `/api/scoring/question-banks/${bankId}/questions?page=${page}&size=${size}`
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
        create(batchCode) {
          return `/api/scoring/batches/${batchCode}/quizzes`
        },
        copy(batchCode) {
          return `/api/scoring/batches/${batchCode}/quizzes/copy`
        },
        detail(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/quizzes/${id}`
        },
        update(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/quizzes/${id}`
        },
        delete(batchCode, id) {
          return `/api/scoring/batches/${batchCode}/quizzes/${id}`
        },
        students: {
          list(batchCode, page, pageSize) {
            return `/api/scoring/batches/${batchCode}/quizzes?page=${page}&size=${pageSize}`
          },
          detail(batchCode, id) {
            return `/api/scoring/batches/${batchCode}/quizzes/${id}/student`
          },
          questions(batchCode, quizId) {
            return `/api/scoring/batches/${batchCode}/quizzes/${quizId}/student/questions`
          }
        }
      },
      finalJudging: {
        list (batchCode, page, pageSize) {
          return `/api/scoring/batches/${batchCode}/judgings?page=${page}&size=${pageSize}`
        },
        create (batchCode) {
          return `/api/scoring/batches/${batchCode}/judgings`
        },
        detail (batchCode, judgingId) {
          return `/api/scoring/batches/${batchCode}/judgings/${judgingId}`
        },
        update (batchCode, judgingId) {
          return `/api/scoring/batches/${batchCode}/judgings/${judgingId}`
        },
        delete (batchCode, judgingId) {
          return `/api/scoring/batches/${batchCode}/judgings/${judgingId}`
        },
        comparisons (batchCode, judgingId) {
          return `/api/scoring/batches/${batchCode}/judgings/${judgingId}/comparisons`
        },
        score () {
          return `/api/scoring/summary`
        },
        getStudentsWithBatch (page, size, batchCode) {
          return `/api/scoring/batches/${batchCode}/judgings/students?page=${page}`
        },
        reportPage (page, size, batchCode) {
          return `/api/scoring/batches/${batchCode}/judgings/students?page=${page}`
        }
      },
      points: {
        list(studentId, type, page, size) {
          return `/api/scoring/summary/${studentId}?type=${type}&page=${page}&size=${size}`
        }
      }
    },
    communication: {
      chatrooms: {
        list (type, search, page, size) {
          return `/api/communication/chatrooms?type=${type}&search=${search}&page=${page}&size=${size}`
        },
        getMessagesBeforePivot (messageId, chatroomId) {
          return `/api/communication/chatrooms/${chatroomId}/messages/_before?messageId=${messageId}`
        },
        getMessagesAfterPivot (messageId, chatroomId) {
          return `/api/communication/chatrooms/${chatroomId}/messages/_after?messageId=${messageId}`
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
      },
      notifications: {
        list (page, size) {
          return `/api/communication/notifications?page=${page}&size=${size}`
        },
        create: `/api/communication/notifications`,
        getTotalUnseen: `/api/communication/notifications/_unseen_total`,
        readNotification (notificationId) {
          return `/api/communication/notifications/${notificationId}/_read`
        }
      },
      reminders: {
        list (page, size, keyword) {
          if (keyword) {
            return `/api/communication/reminders?page=${page}&size=${size}&search=${keyword}`
          } else {
            return `/api/communication/reminders?page=${page}&size=${size}`
          }
        },
        create: `/api/communication/reminders`,
        get (reminderId) {
          return `/api/communication/reminders/${reminderId}`
        },
        update (reminderId) {
          return `/api/communication/reminders/${reminderId}`
        },
        delete (reminderId) {
          return `/api/communication/reminders/${reminderId}`
        }
      },
      myQuestionnaire: {
        getMyquestionnnaires (page, size) {
          return `/api/communication/my-questionnaires?page=${page}&size=${size}`
        },
        getListAppraisees (questionnaireId) {
          return `/api/communication/my-questionnaires/${questionnaireId}/appraisees`
        },
        getQuestionnaireData (questionnaireId, appraiseeId) {
          return `/api/communication/my-questionnaires/${questionnaireId}/appraisees/${appraiseeId}`
        },
        getQuestion (questionnaireId, appraiseeId) {
          return `/api/communication/my-questionnaires/${questionnaireId}/appraisees/${appraiseeId}/questions`
        },
        addQuestionnaireResponse (questionnaireId, appraiseeId) {
          return `/api/communication/my-questionnaires/${questionnaireId}/appraisees/${appraiseeId}/questions`
        }
      },
      questionnaire: {
        getQuestionnaires (page, size, keyword) {
          if ( keyword == null) {
            return `/api/communication/questionnaires?page=${page}&size=${size}`
          } else {
            return `/api/communication/questionnaires?page=${page}&size=${size}&search=${keyword}`
          }
        },
        createQuestionnaire () {
          return `/api/communication/questionnaires`
        },
        getQuestionnaire (questionnaireId) {
          return `/api/communication/questionnaires/${questionnaireId}`
        },
        updateQuestionnaire (questionnaireId) {
          return `/api/communication/questionnaires/${questionnaireId}`
        },
        deleteQuestionnaire (questionnaireId) {
          return `/api/communication/questionnaires/${questionnaireId}`
        },
        getAppraiseeQuestionnaire (questionnaireId, page, size) {
          return `/api/communication/questionnaires/${questionnaireId}/appraisee?page=${page}&size=${size}`
        },
        addAppraisee (questionnaireId) {
          return `/api/communication/questionnaires/${questionnaireId}/appraisee`
        },
        deleteAppraisee (questionnaireId, questionnaireParticipantId) {
          return `/api/communication/questionnaires/${questionnaireId}/appraisee/${questionnaireParticipantId}`
        },
        getAppraiserQuestionnaire (questionnaireId, page, size) {
          return `/api/communication/questionnaires/${questionnaireId}/appraiser?page=${page}&size=${size}`
        },
        addAppraiser (questionnaireId) {
          return `/api/communication/questionnaires/${questionnaireId}/appraiser`
        },
        deleteAppraiser (questionnaireId, questionnaireParticipantId) {
          return `/api/communication/questionnaires/${questionnaireId}/appraiser/${questionnaireParticipantId}`
        },
        getQuestionsQuestionnaire (questionnaireId) {
          return `/api/communication/questionnaires/${questionnaireId}/questions`
        },
        createQuestionQuestionnaire (questionnaireId) {
          return `/api/communication/questionnaires/${questionnaireId}/questions`
        },
        updateQuestionQuestionnaire (questionnaireId, questionId) {
          return `/api/communication/questionnaires/${questionnaireId}/questions/${questionId}`
        },
        deleteQuestionQuestionnaire (questionnaireId, questionId) {
          return `/api/communication/questionnaires/${questionnaireId}/questions/${questionId}`
        }
      },
      questionnaireResponse: {
        getQuestionnaireSimpleSummary (userSummaryId, page, size) {
          return `/api/communication/questionnaire-response?userSummaryId=${userSummaryId}&page=${page}&size=${size}`
        },
        getQuestionnaireSummaryDetail (questionnaireResponseSummaryId) {
          return `/api/communication/questionnaire-response/${questionnaireResponseSummaryId}`
        },
        getQuestionSummaryResponse (questionnaireResponseSummaryId, userSummaryId) {
          return `/api/communication/questionnaire-response/${questionnaireResponseSummaryId}/questions/${userSummaryId}`
        }
      },
      questionnaireResults: {
        getUserSummary (batchCode, page, size) {
          return `/api/communication/questionnaire-results?batchCode=${batchCode}&page=${page}&size=${size}`
        },
        getUserSummaryById (batchCode, userSummaryId) {
          return `/api/communication/questionnaire-results/${batchCode}/user-summary-response/${userSummaryId}`
        }
      },
      questionResponse: {
        getQuestionQuestionnaireSummaryResponse (questionResponseSummaryId) {
          return `/api/communication/question-response/${questionResponseSummaryId}`
        },
        getQuestionnaireAnswerDetailSummary (questionResponseSummaryId) {
          return `/api/communication/question-response/${questionResponseSummaryId}/responses`
        }
      },
      loggingRoom: {
        getLoggingRoomsByMember (search, page, size) {
          return `/api/communication/logging-rooms?search=${search}&page=${page}&size=${size}`
        },
        createLoggingRoom () {
          return `/api/communication/logging-rooms`
        },
        getLoggingRoom (loggingRoomId) {
          return `/api/communication/logging-rooms/${loggingRoomId}`
        },
        updateLoggingRoom (loggingRoomId) {
          return `/api/communication/logging-rooms/${loggingRoomId}`
        },
        deleteLoggingRoom (loggingRoomId) {
          return `/api/communication/logging-rooms/${loggingRoomId}`
        },
        getLoggingRoomTopic (loggingRoomId, page, size) {
          return `/api/communication/logging-rooms/${loggingRoomId}/topics?page=${page}&size=${size}`
        },
        createTopic (loggingRoomId) {
          return `/api/communication/logging-rooms/${loggingRoomId}/topics`
        },
        getTopic (loggingRoomId, topicId) {
          return `/api/communication/logging-rooms/${loggingRoomId}/topics/${topicId}`
        },
        updateTopic (loggingRoomId, topicId) {
          return `/api/communication/logging-rooms/${loggingRoomId}/topics/${topicId}`
        },
        deleteTopic (loggingRoomId, topicId) {
          return `/api/communication/logging-rooms/${loggingRoomId}/topics/${topicId}`
        },
        getLogMessages (loggingRoomId, topicId, page, size) {
          return `/api/communication/logging-rooms/${loggingRoomId}/topics/${topicId}/log-messages?page=${page}&size=${size}`
        },
        createLogMessage (loggingRoomId, topicId) {
          return `/api/communication/logging-rooms/${loggingRoomId}/topics/${topicId}/log-messages`
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
