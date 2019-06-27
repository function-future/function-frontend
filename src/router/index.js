import Vue from 'vue'
import Router from 'vue-router'
import assignments from '@/views/Assignment/Assignments'
import addAssignment from '@/views/Assignment/AddAssignment'
import assignmentRooms from '@/views/Assignment/AssignmentRooms'
import assignmentDetail from '@/views/Assignment/AssignmentDetail'
import questionBanks from '@/views/QuestionBank/QuestionBanks'
import questionBankDetail from '@/views/QuestionBank/QuestionBankDetail'
import addQuestionBank from '@/views/QuestionBank/AddQuestionBank'
import questionBankQuestionList from '@/views/QuestionBank/QuestionBankQuestionList'
import questionBankAddQuestion from '@/views/QuestionBank/QuestionBankAddQuestion'
import questionBankQuestionDetail from '@/views/QuestionBank/QuestionBankQuestionDetail'
import quizzes from '@/views/Quiz/Quiz'
import addQuiz from '@/views/Quiz/AddQuiz'
import quizDetail from '@/views/Quiz/QuizDetail'
import feeds from '@/views/Feeds/Feeds.vue'
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
import courseBatch from '@/views/Courses/CourseBatch.vue'
import batchForm from '@/views/Courses/BatchForm.vue'
import courses from '@/views/Courses/Courses.vue'
import masterCourses from '@/views/Courses/MasterCourses.vue'
import courseDetail from '@/views/Courses/CourseDetail.vue'
import courseForm from '@/views/Courses/CourseForm.vue'
import masterCourseDetail from '@/views/Courses/MasterCourseDetail.vue'
import masterCourseForm from '@/views/Courses/MasterCourseForm.vue'
import config from '@/config/index'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
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
        title: 'Activity Blogs'
      }
    },
    {
      path: config.app.pages.activityBlogs.detail,
      name: 'activityBlogDetail',
      component: activityBlogDetail,
      meta: {
        title: 'Activity Blog Detail'
      }
    },
    {
      path: config.app.pages.activityBlogs.add,
      name: 'addActivityBlog',
      component: ActivityBlogForm,
      meta: {
        title: 'Add Activity Blog'
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.activityBlogs.edit,
      name: 'editActivityBlog',
      component: ActivityBlogForm,
      meta: {
        title: 'Edit Activity Blog'
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.announcements.list,
      name: 'announcements',
      component: announcements,
      meta: {
        title: 'Announcements'
      }
    },
    {
      path: config.app.pages.announcements.detail,
      name: 'announcementDetail',
      component: announcementDetail,
      meta: {
        title: 'Announcements Detail'
      }
    },
    {
      path: config.app.pages.announcements.edit,
      name: 'editAnnouncement',
      component: announcementForm,
      meta: {
        title: 'Edit Announcements'
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.announcements.add,
      name: 'addAnnouncement',
      component: announcementForm,
      meta: {
        title: 'Add Announcements'
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.courses.batches.list,
      name: 'courseBatches',
      component: courseBatch,
      meta: {
        title: 'Select Course Batch',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' }
        ]
      }
    },
    {
      path: config.app.pages.courses.batches.add,
      name: 'addBatch',
      component: batchForm,
      meta: {
        title: 'Add Batch',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Add Batch', link: 'addBatch' }
        ]
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.courses.batches.edit,
      name: 'editBatch',
      component: batchForm,
      meta: {
        title: 'Edit Batch',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Edit Batch', link: 'editBatch' }
        ]
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.courses.master.list,
      name: 'masterCourses',
      component: masterCourses,
      meta: {
        title: 'Master Courses',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Master Courses', link: 'masterCourses' }
        ]
      }
    },
    {
      path: config.app.pages.courses.list,
      name: 'courses',
      component: courses,
      meta: {
        title: 'Courses',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' }
        ]
      }
    },
    {
      path: config.app.pages.courses.detail,
      name: 'courseDetail',
      component: courseDetail,
      meta: {
        title: 'Course Detail',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' },
          { name: 'Course Detail', link: 'courseDetail' }
        ]
      }
    },
    {
      path: config.app.pages.courses.add,
      name: 'addCourse',
      component: courseForm,
      meta: {
        title: 'Add Course',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' },
          { name: 'Add Course', link: 'addCourse' }
        ]
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.courses.master.edit,
      name: 'editCourse',
      component: courseForm,
      meta: {
        title: 'Edit Course',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Courses', link: 'courses' },
          { name: 'Edit Course', link: 'editCourse' }
        ]
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.courses.master.detail,
      name: 'masterCourseDetail',
      component: masterCourseDetail,
      meta: {
        title: 'Master Course Detail',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Master Courses', link: 'masterCourses' },
          { name: 'Master Course Detail', link: 'masterCourseDetail' }
        ]
      }
    },
    {
      path: config.app.pages.courses.master.add,
      name: 'addMasterCourse',
      component: masterCourseForm,
      meta: {
        title: 'Add Master Course',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Master Courses', link: 'masterCourses' },
          { name: 'Add Master Course', link: 'addMasterCourse' }
        ]
      },
      props: { editMode: false }
    },
    {
      path: config.app.pages.courses.master.edit,
      name: 'editMasterCourse',
      component: masterCourseForm,
      meta: {
        title: 'Edit Master Course',
        breadcrumb: [
          { name: 'Batches', link: 'courseBatches' },
          { name: 'Master Courses', link: 'masterCourses' },
          { name: 'Edit Master Course', link: 'editMasterCourse' }
        ]
      },
      props: { editMode: true }
    },
    {
      path: config.app.pages.files,
      name: 'files',
      component: feeds,
      meta: {
        title: 'Files'
      }
    },
    {
      path: config.app.pages.users.list,
      name: 'users',
      component: users,
      meta: {
        title: 'Users'
      }
    },
    {
      path: config.app.pages.users.add.student,
      name: 'addStudent',
      component: UserForm,
      meta: {
        title: 'Add Student'
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
        title: 'Add User'
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
        title: 'Edit Student'
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
        title: 'Edit User'
      },
      props: {
        studentMode: false,
        editMode: true
      }
    },
    {
      path: config.app.pages.grades,
      name: 'grades',
      component: feeds,
      meta: {
        title: 'Grades'
      }
    },
    {
      path: config.app.pages.stickyNotes.detail,
      name: 'stickyNotes',
      component: stickyNotes,
      meta: {
        title: 'Sticky Notes'
      }
    },
    {
      path: config.app.pages.stickyNotes.edit,
      name: 'editStickyNote',
      component: editStickyNote,
      meta: {
        title: 'Edit Sticky Note'
      }
    },
    {
      path: config.app.pages.questionBanks.list,
      name: 'questionBanks',
      component: questionBanks,
      meta: {
        title: 'Question Banks'
      }
    },
    {
      path: config.app.pages.questionBanks.detail,
      name: 'questionBankDetail',
      component: questionBankDetail,
      meta: {
        title: 'Question Bank Detail'
      }
    },
    {
      path: config.app.pages.questionBanks.add,
      name: 'addQuestionBank',
      component: addQuestionBank,
      meta: {
        title: 'Add Question Bank'
      }
    },
    {
      path: config.app.pages.questionBanks.questions.list,
      name: 'questionBankQuestionList',
      component: questionBankQuestionList,
      meta: {
        title: 'Question List'
      }
    },
    {
      path: config.app.pages.questionBanks.questions.add,
      name: 'questionBankAddQuestion',
      component: questionBankAddQuestion,
      meta: {
        title: 'Add Question'
      }
    },
    {
      path: config.app.pages.questionBanks.questions.detail,
      name: 'questionBankQuestionDetail',
      component: questionBankQuestionDetail,
      meta: {
        title: 'Question Detail'
      }
    },
    {
      path: config.app.pages.quizzes.list,
      name: 'quizzes',
      component: quizzes,
      meta: {
        title: 'Quizzes'
      }
    },
    {
      path: config.app.pages.quizzes.add,
      name: 'addQuiz',
      component: addQuiz,
      meta: {
        title: 'Add Quiz'
      }
    },
    {
      path: config.app.pages.quizzes.detail,
      name: 'quizDetail',
      component: quizDetail,
      meta: {
        title: 'Quiz Detail'
      }
    },
    {
      path: config.app.pages.assignments.list,
      name: 'assignments',
      component: assignments,
      meta: {
        title: 'Assignments'
      }
    },
    {
      path: config.app.pages.assignments.detail,
      name: 'assignmentDetail',
      component: assignmentDetail,
      meta: {
        title: 'Assignment Detail'
      }
    },
    {
      path: config.app.pages.assignments.add,
      name: 'addAssignment',
      component: addAssignment,
      meta: {
        title: 'Add Assignments'
      }
    },
    {
      path: config.app.pages.assignments.rooms.list,
      name: 'assignmentRooms',
      component: assignmentRooms,
      meta: {
        title: 'Rooms'
      }
    },
    {
      path: config.app.pages.assignments.rooms.detail,
      name: 'assignmentRoomDetail',
      component: quizDetail,
      meta: {
        title: 'Assignment'
      }
    },
    {
      path: config.app.pages.finalJudging,
      name: 'finalJudging',
      component: feeds
    }
  ]
})
