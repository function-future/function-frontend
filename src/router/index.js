import Vue from 'vue'
import Router from 'vue-router'
import studentAssignments from '@/views/Assignment/StudentAssignments'
import assignments from '@/views/Assignment/Assignments'
import assignmentForm from '@/views/Assignment/AssignmentForm'
import assignmentRooms from '@/views/Assignment/AssignmentRooms'
import assignmentRoomDetail from '@/views/Assignment/AssignmentRoomDetail'
import assignmentDetail from '@/views/Assignment/AssignmentDetail'
import scoringAdmin from '@/views/Scoring/LandingPageAdmin'
import questionBanks from '@/views/QuestionBank/QuestionBanks'
import questionBankDetail from '@/views/QuestionBank/QuestionBankDetail'
import questionBankForm from '@/views/QuestionBank/QuestionBankForm'
import addQuestionBank from '@/views/QuestionBank/AddQuestionBank'
import questionBankQuestionList from '@/views/QuestionBank/QuestionBankQuestionList'
import questionBankQuestionDetail from '@/views/QuestionBank/QuestionBankQuestionDetail'
import questionForm from '@/views/QuestionBank/QuestionForm'
import quizBatch from '@/views/Quiz/QuizBatch'
import quizBatchForm from '@/views/Quiz/QuizBatchForm'
import quizzes from '@/views/Quiz/Quiz'
import quizForm from '@/views/Quiz/QuizForm'
import addQuizDetail from '@/views/Quiz/AddQuizDetail'
import quizDetail from '@/views/Quiz/QuizDetail'
import studentQuizList from '@/views/Quiz/StudentQuizList'
import studentQuizDetail from '@/views/Quiz/StudentQuizDetail'
import quizQuestions from '@/views/Quiz/QuizQuestions'
import judgingList from '@/views/FinalJudging/JudgingList'
import judgingForm from '@/views/FinalJudging/JudgingForm'
import judgingDetail from '@/views/FinalJudging/JudgingDetail'
import reportPage from '@/views/FinalJudging/ReportPage'
import points from '@/views/Point/Point'
import feeds from '@/views/Feeds/FeedsRevamp.vue'
import announcements from '@/views/Announcements/Announcements.vue'
import announcementDetail from '@/views/Announcements/AnnouncementDetail.vue'
import announcementForm from '@/views/Announcements/AnnouncementForm.vue'
import activityBlogs from '@/views/ActivityBlogs/ActivityBlogs.vue'
import activityBlogDetail from '@/views/ActivityBlogs/ActivityBlogDetail.vue'
import ActivityBlogForm from '@/views/ActivityBlogs/ActivityBlogForm.vue'
import users from '@/views/Users/Users.vue'
import stickyNotes from '@/views/StickyNotes/StickyNotesDetail.vue'
import editStickyNote from '@/views/StickyNotes/EditStickyNote.vue'
import UserForm from '@/views/Users/UserForm.vue'
import batches from '@/views/Batches/Batches.vue'
import batchForm from '@/views/Batches/BatchForm.vue'
import courses from '@/views/Courses/CoursesRevamp.vue'
import courseDetail from '@/views/Courses/CourseDetailRevamp.vue'
import courseForm from '@/views/Courses/CourseFormRevamp.vue'
import config from '@/config/index'
import chatrooms from '@/views/Chatrooms/Chatrooms'
import myQuestionnaire from '@/views/Questionnaire/MyQuestionnaire'
import myQuestionnaireAppraisee from '@/views/Questionnaire/MyQuestionnaireAppraisee'
import questionnaires from '@/views/Questionnaire/Questionnaires'
import questionnairesCreate from '@/views/Questionnaire/QuestionnairesCreate'
import questionnairesEdit from '@/views/Questionnaire/QuestionnairesEdit'
import questionnaireResults from '@/views/Questionnaire/QuestionnaireResults'
import questionnaireResultsMembers from '@/views/Questionnaire/QuestionnaireResultsMembers'
import questionnaireResultsMemberDetail from '@/views/Questionnaire/QuestionnaireResultsMemberDetail'
import questionnaireResultsQuestionnaireDetail from '@/views/Questionnaire/QuestionnaireResultsQuestionnaireDetail'
import questionnaireResultsQuestionDetail from '@/views/Questionnaire/QuestionnaireResultsQuestionDetail'
import reminders from '@/views/Reminders/Reminders'
import reminderForm from '@/views/Reminders/ReminderForm'
import profile from '@/views/User/Profile'
import account from '@/views/User/Account'
import notifications from '@/views/Notifications/Notifications.vue'
import changePassword from '@/views/User/ChangePassword'
import loggingRoom from '@/views/LoggingRoom/LoggingRoom.vue'
import loggingRoomDetail from '@/views/LoggingRoom/LoggingRoomDetail.vue'
import logMessageRoom from '@/views/LoggingRoom/LogMessageRoom.vue'
import loggingRoomCreate from '@/views/LoggingRoom/LoggingRoomCreate'
import loggingRoomEdit from '@/views/LoggingRoom/LoggingRoomEdit'

import files from '@/views/Files/Files'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: config.app.pages.user.profile,
      name: 'profile',
      component: profile,
      meta: {
        auth: true,
        title: 'Profile',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Profile', link: 'profile' }
        ]
      }
    },
    {
      path: config.app.pages.user.profileMobile,
      name: 'profileMobile',
      component: profile,
      meta: {
        auth: true,
        title: 'Profile',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Account', link: 'account' },
          { name: 'Profile', link: 'profile' }
        ]
      }
    },
    {
      path: config.app.pages.user.account,
      name: 'account',
      component: account,
      meta: {
        auth: true,
        title: 'Account',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Account', link: 'account' }
        ]
      }
    },
    {
      path: config.app.pages.user.changePassword,
      name: 'changePassword',
      component: changePassword,
      meta: {
        auth: true,
        title: 'Change Password',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Profile', link: 'profile' },
          { name: 'Change Password', link: 'changePassword' }
        ]
      },
      props: { mobile: false }
    },
    {
      path: config.app.pages.user.changePasswordMobile,
      name: 'changePasswordMobile',
      component: changePassword,
      meta: {
        auth: true,
        title: 'Change Password',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Account', link: 'account' },
          { name: 'Change Password', link: 'changePassword' }
        ]
      },
      props: { mobile: true }
    },
    {
      path: config.app.pages.feeds,
      name: 'feeds',
      component: feeds,
      meta: {
        title: 'Feeds'
      }
    },
    {
      path: config.app.pages.activityBlogs.list,
      name: 'activityBlogs',
      component: activityBlogs,
      meta: {
        title: 'Activity Blogs',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Activity Blogs', link: 'activityBlogs' }
        ]
      }
    },
    {
      path: config.app.pages.activityBlogs.detail,
      name: 'activityBlogDetail',
      component: activityBlogDetail,
      meta: {
        title: 'Activity Blog Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Activity Blogs', link: 'activityBlogs' },
          { name: 'Activity Blog Detail', link: 'activityBlogDetail' }
        ]
      }
    },
    {
      path: config.app.pages.activityBlogs.add,
      name: 'addActivityBlog',
      component: ActivityBlogForm,
      meta: {
        auth: true,
        add: true,
        title: 'Add Activity Blog',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Activity Blogs', link: 'activityBlogs' },
          { name: 'Add Activity Blog', link: 'addActivityBlog' }
        ]
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.activityBlogs.edit,
      name: 'editActivityBlog',
      component: ActivityBlogForm,
      meta: {
        auth: true,
        edit: true,
        title: 'Edit Activity Blog',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Activity Blogs', link: 'activityBlogs' },
          { name: 'Activity Blog Detail', link: 'activityBlogDetail' },
          { name: 'Edit Activity Blog', link: 'editActivityBlog' }
        ]
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.announcements.list,
      name: 'announcements',
      component: announcements,
      meta: {
        title: 'Announcements',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Announcements', link: 'announcements' }
        ]
      }
    },
    {
      path: config.app.pages.announcements.detail,
      name: 'announcementDetail',
      component: announcementDetail,
      meta: {
        title: 'Announcements Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Announcements', link: 'announcements' },
          { name: 'Announcement Detail', link: 'announcementDetail' }
        ]
      }
    },
    {
      path: config.app.pages.announcements.edit,
      name: 'editAnnouncement',
      component: announcementForm,
      meta: {
        auth: true,
        edit: true,
        title: 'Edit Announcements',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Announcements', link: 'announcements' },
          { name: 'Announcement Detail', link: 'announcementDetail' },
          { name: 'Edit Announcement', link: 'editAnnouncement' }
        ]
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.announcements.add,
      name: 'addAnnouncement',
      component: announcementForm,
      meta: {
        auth: true,
        add: true,
        title: 'Add Announcements',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Announcements', link: 'announcements' },
          { name: 'Add Announcement', link: 'addAnnouncement' }
        ]
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.batches.list,
      name: 'batches',
      component: batches,
      meta: {
        auth: true,
        title: 'Batches',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'batches' }
        ]
      }
    },
    {
      path: config.app.pages.batches.add,
      name: 'addBatch',
      component: batchForm,
      meta: {
        auth: true,
        add: true,
        title: 'Add Batch',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'batches' },
          { name: 'Add Batch', link: 'addBatch' }
        ]
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.batches.edit,
      name: 'editBatch',
      component: batchForm,
      meta: {
        auth: true,
        edit: true,
        title: 'Edit Batch',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'batches' },
          { name: 'Edit Batch', link: 'editBatch' }
        ]
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.courses.list,
      name: 'courses',
      component: courses,
      meta: {
        auth: true,
        title: 'Courses',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Courses', link: 'courses' }
        ]
      }
    },
    {
      path: config.app.pages.courses.detail,
      name: 'courseDetail',
      component: courseDetail,
      meta: {
        auth: true,
        title: 'Course Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Courses', link: 'courses', params: { query: { tab: 'batch' } } },
          { name: 'Course Detail', link: 'courseDetail' }
        ]
      },
      props: { master: false }
    },
    {
      path: config.app.pages.courses.add,
      name: 'addCourse',
      component: courseForm,
      meta: {
        auth: true,
        add: true,
        title: 'Add Course',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Courses', link: 'courses', params: { query: { tab: 'batch' } } },
          { name: 'Add Course', link: 'addCourse' }
        ]
      },
      props: {
        editMode: false,
        master: false
      }
    },
    {
      path: config.app.pages.courses.edit,
      name: 'editCourse',
      component: courseForm,
      meta: {
        auth: true,
        edit: true,
        title: 'Edit Course',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Courses', link: 'courses', params: { query: { tab: 'batch' } } },
          { name: 'Course Detail', link: 'courseDetail' },
          { name: 'Edit Course', link: 'editCourse' }
        ]
      },
      props: {
        editMode: true,
        master: false
      }
    },
    {
      path: config.app.pages.courses.master.detail,
      name: 'masterCourseDetail',
      component: courseDetail,
      meta: {
        auth: true,
        title: 'Master Course Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Courses', link: 'courses', params: { query: { tab: 'master' } } },
          { name: 'Master Course Detail', link: 'masterCourseDetail' }
        ]
      },
      props: { master: true }
    },
    {
      path: config.app.pages.courses.master.add,
      name: 'addMasterCourse',
      component: courseForm,
      meta: {
        auth: true,
        add: true,
        title: 'Add Master Course',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Courses', link: 'courses', params: { query: { tab: 'master' } } },
          { name: 'Add Master Course', link: 'addMasterCourse' }
        ]
      },
      props: {
        editMode: false,
        master: true
      }
    },
    {
      path: config.app.pages.courses.master.edit,
      name: 'editMasterCourse',
      component: courseForm,
      meta: {
        auth: true,
        edit: true,
        title: 'Edit Master Course',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Courses', link: 'courses', params: { query: { tab: 'master' } } },
          { name: 'Master Course Detail', link: 'masterCourseDetail' },
          { name: 'Edit Master Course', link: 'editMasterCourse' }
        ]
      },
      props: {
        editMode: true,
        master: true
      }
    },
    {
      path: config.app.pages.files.root,
      name: 'files',
      redirect: config.app.pages.files.root + '/root'
    },
    {
      path: config.app.pages.files.folder,
      name: 'folder',
      component: files,
      meta: {
        auth: true,
        title: 'Files'
      }
    },
    {
      path: config.app.pages.files.detail,
      name: 'fileDetail',
      component: files,
      meta: {
        auth: true,
        title: 'Files'
      }
    },
    {
      path: config.app.pages.users.list,
      name: 'users',
      component: users,
      meta: {
        auth: true,
        title: 'Users',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Users', link: 'users' }
        ]
      }
    },
    {
      path: config.app.pages.users.add.student,
      name: 'addStudent',
      component: UserForm,
      meta: {
        auth: true,
        add: true,
        title: 'Add Student',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Users', link: 'users' },
          { name: 'Add Student', link: 'addStudent' }
        ]
      },
      props: {
        studentMode: true,
        editMode: false
      }
    },
    {
      path: config.app.pages.users.add.user,
      name: 'addUser',
      component: UserForm,
      meta: {
        auth: true,
        add: true,
        title: 'Add User',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Users', link: 'users' },
          { name: 'Add User', link: 'addUser' }
        ]
      },
      props: {
        studentMode: false,
        editMode: false
      }
    },
    {
      path: config.app.pages.users.edit.student,
      name: 'editStudent',
      component: UserForm,
      meta: {
        auth: true,
        edit: true,
        title: 'Edit Student',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Users', link: 'users' },
          { name: 'Edit Student', link: 'editStudent' }
        ]
      },
      props: {
        studentMode: true,
        editMode: true
      }
    },
    {
      path: config.app.pages.users.edit.user,
      name: 'editUser',
      component: UserForm,
      meta: {
        auth: true,
        edit: true,
        title: 'Edit User',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Users', link: 'users' },
          { name: 'Edit User', link: 'editUser' }
        ]
      },
      props: {
        studentMode: false,
        editMode: true
      }
    },
    {
      path: config.app.pages.stickyNotes.detail,
      name: 'stickyNotes',
      component: stickyNotes,
      meta: {
        title: 'Sticky Notes',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Sticky Notes', link: 'stickyNotes' }
        ]
      }
    },
    {
      path: config.app.pages.stickyNotes.edit,
      name: 'editStickyNote',
      component: editStickyNote,
      meta: {
        auth: true,
        edit: true,
        title: 'Edit Sticky Note',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Sticky Notes', link: 'stickyNotes' },
          { name: 'Edit Sticky Notes', link: 'editStickyNote' }
        ]
      }
    },
    {
      path: config.app.pages.scoring.admin,
      name: 'scoringAdmin',
      component: scoringAdmin
    },
    {
      path: config.app.pages.questionBanks.list,
      name: 'questionBanks',
      component: scoringAdmin,
      meta: {
        auth: true,
        title: 'Question Banks',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Question Banks', link: 'questionBanks' }
        ]
      }
    },
    {
      path: config.app.pages.questionBanks.detail,
      name: 'questionBankDetail',
      component: questionBankDetail,
      meta: {
        auth: true,
        title: 'Question Bank Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Question Banks', link: 'questionBanks' },
          { name: 'Question Bank Detail', link: 'questionBankDetail' }
        ]
      }
    },
    {
      path: config.app.pages.questionBanks.add,
      name: 'addQuestionBank',
      component: questionBankForm,
      meta: {
        auth: true,
        title: 'Add Question Bank',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Question Banks', link: 'questionBanks' },
          { name: 'Add Question Bank', link: 'addQuestionBank' }
        ]
      },
      props: {
        editMode: false
      }
    },
    {
      path: config.app.pages.questionBanks.edit,
      name: 'editQuestionBank',
      component: questionBankForm,
      meta: {
        auth: true,
        title: 'Edit Question Bank',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Question Banks', link: 'questionBanks' },
          { name: 'Add Question Bank', link: 'addQuestionBank' }
        ]
      },
      props: {
        editMode: true
      }
    },
    {
      path: config.app.pages.questionBanks.questions.list,
      name: 'questionBankQuestionList',
      component: questionBankQuestionList,
      meta: {
        auth: true,
        title: 'Question List',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Question Banks', link: 'questionBanks' },
          { name: 'Question Bank Detail', link: 'questionBankDetail' },
          { name: 'Questions', link: 'questionBankQuestionList' }
        ]
      }
    },
    {
      path: config.app.pages.questionBanks.questions.detail,
      name: 'questionBankQuestionDetail',
      component: questionBankQuestionDetail,
      meta: {
        auth: true,
        title: 'Question Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Question Banks', link: 'questionBanks' },
          { name: 'Question Bank Detail', link: 'questionBankDetail' },
          { name: 'Questions', link: 'questionBankQuestionList' },
          { name: 'Question Detail', link: 'questionBankQuestionDetail' }
        ]
      }
    },
    {
      path: config.app.pages.questionBanks.questions.add,
      name: 'addQuestion',
      component: questionForm,
      meta: {
        auth: true,
        title: 'New Question',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Question Banks', link: 'questionBanks' },
          { name: 'Question Bank Detail', link: 'questionBankDetail' },
          { name: 'Questions', link: 'questionBankQuestionList' },
          { name: 'Add Question', link: 'addQuestion' }
        ]
      },
      props: {
        editMode: false
      }
    },
    {
      path: config.app.pages.questionBanks.questions.edit,
      name: 'editQuestion',
      component: questionForm,
      meta: {
        auth: true,
        title: 'Edit Question',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Question Banks', link: 'questionBanks' },
          { name: 'Question Bank Detail', link: 'questionBankDetail' },
          { name: 'Questions', link: 'questionBankQuestionList' },
          { name: 'Edit Question', link: 'editQuestion' }
        ]
      },
      props: {
        editMode: true
      }
    },
    {
      path: config.app.pages.quizzes.batches.list,
      name: 'quizBatch',
      component: quizBatch,
      meta: {
        auth: true,
        title: 'Quiz Batch List',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'quizBatch' }
        ]
      }
    },
    {
      path: config.app.pages.quizzes.batches.add,
      name: 'addQuizBatch',
      component: quizBatchForm,
      meta: {
        auth: true,
        title: 'Quiz Batch List',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'quizBatch' },
          { name: 'Add Batch', link: 'addQuizBatch' }
        ]
      }
    },
    {
      path: config.app.pages.quizzes.batches.edit,
      name: 'editQuizBatch',
      component: quizBatchForm,
      meta: {
        auth: true,
        title: 'Quiz Batch List',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'quizBatch' },
          { name: 'Edit Batch', link: 'editQuizBatch' }
        ]
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.quizzes.list,
      name: 'quizzes',
      component: quizzes,
      meta: {
        auth: true,
        title: 'Quizzes',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'quizBatch' },
          { name: 'Quizzes', link: 'quizzes' }
        ]
      }
    },
    {
      path: config.app.pages.quizzes.add,
      name: 'addQuiz',
      component: quizForm,
      meta: {
        auth: true,
        title: 'Add Quiz',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'quizBatch' },
          { name: 'Quizzes', link: 'quizzes' },
          { name: 'Add Quiz', link: 'addQuiz' }
        ]
      },
      props: {
        editMode: false
      }
    },
    {
      path: config.app.pages.quizzes.edit,
      name: 'editQuiz',
      component: quizForm,
      meta: {
        auth: true,
        title: 'Edit Quiz',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'quizBatch' },
          { name: 'Quizzes', link: 'quizzes' },
          { name: 'Edit Quiz', link: 'editQuiz' }
        ]
      },
      props: {
        editMode: true
      }
    },
    {
      path: config.app.pages.quizzes.addDetail,
      name: 'addQuizDetail',
      component: addQuizDetail,
      meta: {
        auth: true,
        title: 'Add Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'quizBatch' },
          { name: 'Quizzes', link: 'quizzes' },
          { name: 'Add Quiz', link: 'addQuiz' },
          { name: 'Add Quiz Detail', link: 'addQuizDetail' }
        ]
      }
    },
    {
      path: config.app.pages.quizzes.detail,
      name: 'quizDetail',
      component: quizDetail,
      meta: {
        auth: true,
        title: 'Quiz Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'quizBatch' },
          { name: 'Quizzes', link: 'quizzes' },
          { name: 'Quiz Detail', link: 'quizDetail' }
        ]
      }
    },
    {
      path: config.app.pages.students.quizzes.list,
      name: 'studentQuizzes',
      component: studentQuizList,
      meta: {
        auth: true,
        title: 'Quizzes',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Quizzes', link: 'studentQuizzes' }
        ]
      }
    },
    {
      path: config.app.pages.students.quizzes.detail,
      name: 'studentQuizDetail',
      component: studentQuizDetail,
      meta: {
        auth: true,
        title: 'Quiz Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Quizzes', link: 'studentQuizzes' },
          { name: 'Quiz Detail', link: 'studentQuizDetail' }
        ]
      }
    },
    {
      path: config.app.pages.students.quizzes.questions,
      name: 'studentQuizQuestions',
      component: quizQuestions,
      meta: {
        auth: true,
        title: 'Questions',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Quizzes', link: 'studentQuizzes' },
          { name: 'Quiz Detail', link: 'studentQuizDetail' },
          { name: 'Questions', link: 'studentQuizQuestions' }
        ]
      }
    },
    {
      path: config.app.pages.students.assignments,
      name: 'studentAssignments',
      component: studentAssignments,
      meta: {
        auth: true,
        title: 'Assignments'
      }
    },
    {
      path: config.app.pages.assignments.list,
      name: 'assignments',
      component: assignments,
      meta: {
        auth: true,
        title: 'Assignments',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'assignmentBatch' },
          { name: 'Assignments', link: 'assignments' }
        ]
      }
    },
    {
      path: config.app.pages.assignments.detail,
      name: 'assignmentDetail',
      component: assignmentDetail,
      meta: {
        auth: true,
        title: 'Assignment Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'assignmentBatch' },
          { name: 'Assignments', link: 'assignments' },
          { name: 'Assignment Detail', link: 'assignmentDetail' }
        ]
      }
    },
    {
      path: config.app.pages.assignments.add,
      name: 'addAssignment',
      component: assignmentForm,
      meta: {
        auth: true,
        title: 'Add Assignments',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'assignmentBatch' },
          { name: 'Assignments', link: 'assignments' },
          { name: 'Add Assignment', link: 'addAssignment' }
        ]
      },
      props: {
        editMode: false
      }
    },
    {
      path: config.app.pages.assignments.edit,
      name: 'editAssignment',
      component: assignmentForm,
      meta: {
        auth: true,
        title: 'Edit Assignments',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'assignmentBatch' },
          { name: 'Assignments', link: 'assignments' },
          { name: 'Edit Assignment', link: 'editAssignment' }
        ]
      },
      props: {
        editMode: true
      }
    },
    {
      path: config.app.pages.assignments.rooms.list,
      name: 'assignmentRooms',
      component: assignmentRooms,
      meta: {
        auth: true,
        title: 'Rooms',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'assignmentBatch' },
          { name: 'Assignments', link: 'assignments' },
          { name: 'Assignment Detail', link: 'assignmentDetail' },
          { name: 'Rooms', link: 'assignmentRooms' }
        ]
      }
    },
    {
      path: config.app.pages.assignments.rooms.detail,
      name: 'assignmentRoomDetail',
      component: assignmentRoomDetail,
      meta: {
        auth: true,
        title: 'Room Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'assignmentBatch' },
          { name: 'Assignments', link: 'assignments' },
          { name: 'Rooms', link: 'assignmentRooms' },
          { name: 'Room Detail', link: 'assignmentRoomDetail' }
        ]
      },
      beforeEnter: (to, from, next) => {
        if (store.getters.currentUser.role === 'STUDENT') {
          to.meta.breadcrumb = [
            { name: 'Home', link: 'feeds' },
            { name: 'Assignments', link: 'studentAssignments' },
            { name: 'Room Detail', link: 'assignmentRoomDetail' }
          ]
        }
        else {
          to.meta.breadcrumb = [
            { name: 'Home', link: 'feeds' },
            { name: 'Batches', link: 'assignmentBatch' },
            { name: 'Assignments', link: 'assignments' },
            { name: 'Rooms', link: 'assignmentRooms' },
            { name: 'Room Detail', link: 'assignmentRoomDetail' }
          ]
        }
        next()
      }
    },
    {
      path: config.app.pages.points.list,
      name: 'points',
      component: points,
      meta: {
        auth: true,
        title: 'Points',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Points', link: 'points' },
        ]
      }
    },
    {
      path: config.app.pages.finalJudging.list,
      name: 'judgingList',
      component: judgingList,
      meta: {
        auth: true,
        title: 'Judging Sessions',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'judgingBatch' },
          { name: 'Judging Sessions', link: 'judgingList' }
        ]
      }
    },
    {
      path: config.app.pages.finalJudging.add,
      name: 'addJudging',
      component: judgingForm,
      meta: {
        auth: true,
        title: 'Add Judging Session',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'judgingBatch' },
          { name: 'Add Judging Session', link: 'addJudging' }
        ],
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.finalJudging.edit,
      name: 'editJudging',
      component: judgingForm,
      meta: {
        auth: true,
        title: 'Add Judging Session',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'judgingBatch' },
          { name: 'Judging Session Detail', link: 'judgingDetail' },
          { name: 'Edit Judging Session', link: 'editJudging' }
        ],
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.finalJudging.detail,
      name: 'judgingDetail',
      component: judgingDetail,
      meta: {
        auth: true,
        title: 'Judging Detail',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'judgingBatch' },
          { name: 'Judging Sessions', link: 'judgingList' },
          { name: 'Judging Session Detail', link: 'judgingDetail' }
        ]
      }
    },
    {
      path: config.app.pages.finalJudging.reportPage,
      name: 'batchReportPage',
      component: reportPage,
      meta: {
        auth: true,
        title: 'Final Score Report',
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Batches', link: 'judgingBatch' },
          { name: 'Judging Sessions', link: 'judgingList' },
          { name: 'Report Page', link: 'batchReportPage' }
        ]
      }
    },
    {
      path: config.app.pages.chatrooms,
      name: 'chatrooms',
      component: chatrooms,
      meta: {
        auth: true,
        title: 'Chatrooms'
      }
    },
    {
      path: config.app.pages.reminders.list,
      name: 'reminders',
      component: reminders,
      meta: {
        title: 'Reminders',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Reminders', link: 'reminders' }
        ]
      }
    },
    {
      path: config.app.pages.reminders.detail,
      name: 'reminderDetail',
      component: reminderForm,
      meta: {
        title: 'Reminder Detail',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Reminders', link: 'reminders' },
          { name: 'Reminder Detail', link: 'reminderDetail' }
        ]
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.reminders.edit,
      name: 'reminderEdit',
      component: reminderForm,
      meta: {
        title: 'Edit Reminder',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Reminders', link: 'reminders' },
          { name: 'Reminder Detail', link: 'reminderDetail' },
          { name: 'Edit Reminder', link: 'reminderEdit' }
        ]
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.reminders.create,
      name: 'reminderCreate',
      component: reminderForm,
      meta: {
        title: 'Create Reminder',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Reminders', link: 'reminders' },
          { name: 'Create Reminder', link: 'reminderCreate' }
        ]
      },
      props: { editMode: true, createMode: true }
    },
    {
      path: config.app.pages.notifications,
      name: 'notifications',
      component: notifications,
      meta: {
        title: 'Notifications',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Notifications', link: 'notifications' }
        ]
      }
    },
    {
      path: config.app.pages.myQuestionnaire.default,
      name: 'myQuestionnaire',
      component: myQuestionnaire,
      meta: {
        title: 'My Questionnaire',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'My Questionnaire', link: 'myQuestionnaire' }
        ]
      }
    },
    {
      path: config.app.pages.myQuestionnaire.appraisee,
      name: 'myQuestionnaireAppraisee',
      component: myQuestionnaireAppraisee,
      meta: {
        title: 'My Questionnaire - Appraisee',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'My Questionnaire', link: 'myQuestionnaire' },
          { name: 'My Questionnaire Appraisee', link: 'myQuestionnaireAppraisee' }
        ]
      }
    },
    {
      path: config.app.pages.myQuestionnaire.form,
      name: 'myQuestionnaireForm',
      component: myQuestionnaireAppraisee,
      meta: {
        title: 'My Questionnaire - Form',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'My Questionnaire', link: 'myQuestionnaire' },
          { name: 'My Questionnaire Appraisee', link: 'myQuestionnaireAppraisee' },
          { name: 'My Questionnaire Form', link: 'myQuestionnaireForm' }
        ]
      }
    },
    {
      path: config.app.pages.questionnaires.default,
      name: 'questionnaires',
      component: questionnaires,
      meta: {
        title: 'Questionnaires',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Questionnaires', link: 'questionnaires' }
        ]
      }
    },
    {
      path: config.app.pages.questionnaires.create,
      name: 'questionnairesCreate',
      component: questionnairesCreate,
      meta: {
        title: 'Questionnaires - Create',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Questionnaires', link: 'questionnaires' },
          { name: 'Create Questionnaires', link: 'questionnairesCreate' }
        ]
      }
    },
    {
      path: config.app.pages.questionnaires.edit,
      name: 'questionnairesEdit',
      component: questionnairesEdit,
      meta: {
        title: 'Questionnaires - Edit',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Questionnaires', link: 'questionnaires' },
          { name: 'Edit Questionnaires', link: 'questionnairesEdit' }
        ]
      }
    },
    {
      path: config.app.pages.questionnaireResults.default,
      name: 'questionnaireResults',
      component: questionnaireResults,
      meta: {
        title: 'Questionnaire Results',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Questionnaire Results', link: 'questionnaireResults' }
        ]
      }
    },
    {
      path: config.app.pages.questionnaireResults.members,
      name: 'questionnaireResultsMembers',
      component: questionnaireResultsMembers,
      meta: {
        title: 'Questionnaire Results - Members',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Questionnaire Results', link: 'questionnaireResults' },
          { name: 'Questionnaire Results Member', link: 'questionnaireResultsMembers' }
        ]
      }
    },
    {
      path: config.app.pages.questionnaireResults.memberDetail,
      name: 'questionnaireResultsMemberDetail',
      component: questionnaireResultsMemberDetail,
      meta: {
        title: 'Questionnaire Results - Member Detail',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Questionnaire Results', link: 'questionnaireResults' },
          { name: 'Questionnaire Results Member', link: 'questionnaireResultsMembers' },
          { name: 'Questionnaire Results Member Detail', link: 'questionnaireResultsMemberDetail' }
        ]
      }
    },
    {
      path: config.app.pages.questionnaireResults.questionnaireDetail,
      name: 'questionnaireResultsQuestionnaireDetail',
      component: questionnaireResultsQuestionnaireDetail,
      meta: {
        title: 'Questionnaire Results - Questionnaire Detail',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Questionnaire Results', link: 'questionnaireResults' },
          { name: 'Questionnaire Results Member', link: 'questionnaireResultsMembers' },
          { name: 'Questionnaire Results Member Detail', link: 'questionnaireResultsMemberDetail' },
          { name: 'Questionnaire Results Detail', link: 'questionnaireResultsQuestionnaireDetail' }
        ]
      }
    },
    {
      path: config.app.pages.questionnaireResults.questionDetail,
      name: 'questionnaireResultsQuestionDetail',
      component: questionnaireResultsQuestionDetail,
      meta: {
        title: 'Questionnaire Results - Question Detail',
        auth: true,
        breadcrumb: [
          { name: 'Home', link: 'feeds' },
          { name: 'Questionnaire Results', link: 'questionnaireResults' },
          { name: 'Questionnaire Results Member', link: 'questionnaireResultsMembers' },
          { name: 'Questionnaire Results Member Detail', link: 'questionnaireResultsMemberDetail' },
          { name: 'Questionnaire Results Detail', link: 'questionnaireResultsQuestionnaireDetail' },
          { name: 'Questionnaire Results Question Detail', link: 'questionnaireResultsQuestionDetail' }
        ]
      }
    },
    {
      path: config.app.pages.loggingRoom.default,
      name: 'loggingRoom',
      component: loggingRoom,
      meta: {
        title: 'Logging Rooms',
        auth: true
      }
    },
    {
      path: config.app.pages.loggingRoom.topics,
      name: 'loggingRoomDetail',
      component: loggingRoomDetail,
      meta: {
        title: 'Logging Room - Detail',
        auth: true
      }
    },
    {
      path: config.app.pages.loggingRoom.logMessages,
      name: 'logMessage',
      component: logMessageRoom,
      meta: {
        title: 'Logging Room',
        auth: true
      }
    },
    {
      path: config.app.pages.loggingRoom.create,
      name: 'loggingRoomCreate',
      component: loggingRoomCreate,
      meta: {
        title: 'Logging Room - Create',
        auth: true
      }
    },
    {
      path: config.app.pages.loggingRoom.edit,
      name: 'loggingRoomEdit',
      component: loggingRoomEdit,
      meta: {
        title: 'Logging Room - Edit',
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (process.env.NODE_ENV === 'development') {
    return next()
  }

  store.dispatch('getLoginStatus', {
    callback: () => { return to.query.auth === 'login' ? next({ path: from.fullPath, query: {} }) : next() },
    fail: () => {
      store.dispatch('setCurrentUser', { data: {} })
      store.dispatch('setMenuList', { data: {} })
      return !to.meta.auth ? next() : (to.query.auth !== 'login' ? next({
        path: from.fullPath,
        query: { auth: 'login', redirect: to.fullPath }
      }) : next())
    }
  })
})

router.afterEach((to, from) => {
  if (process.env.NODE_ENV === 'development') {
    store.commit('SET_ACCESS_LIST', {
      'add': true,
      'delete': true,
      'edit': true,
      'read': true
    })
    if (!store.getters.accessList.read ||
      (to.meta.add && store.getters.accessList.add !== to.meta.add) ||
      (to.meta.edit && store.getters.accessList.edit !== to.meta.edit)) {
      Vue.toasted.error('You do not have permission to access the page')
      router.push({ name: 'feeds' })
    }
    return
  }

  store.dispatch('getAccessList', {
    data: encodeURIComponent(to.fullPath),
    callback: () => {
      if (!store.getters.accessList.read ||
        (to.meta.add && store.getters.accessList.add !== to.meta.add) ||
        (to.meta.edit && store.getters.accessList.edit !== to.meta.edit)) {
        Vue.toasted.error('You do not have permission to access the page')
        router.push({ name: 'feeds' })
      }
    },
    fail: () => {}
  })
})

export default router
