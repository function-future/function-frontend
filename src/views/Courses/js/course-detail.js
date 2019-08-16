import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import InfiniteLoading from 'vue-infinite-loading'
let marked = require('marked')

export default {
  name: 'courseDetail',
  components: {
    BaseCard,
    BaseButton,
    BaseTextArea,
    ModalDeleteConfirmation,
    InfiniteLoading
  },
  data () {
    return {
      courseDetail: {
        id: '',
        title: '',
        description: '',
        material: ''
      },
      discussions: [],
      discussion: {
        comment: ''
      },
      discussionPaging: {
        page: 1,
        size: 4,
        totalRecords: 0
      },
      showDeleteConfirmationModal: false,
      submittingDiscussion: false,
      state: ''
    }
  },
  computed: {
    ...mapGetters([
      'course',
      'courseDiscussions',
      'accessList'
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.courseDetail.description)
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchCourseById',
      'fetchCourseDiscussions',
      'submitCourseDiscussion',
      'deleteCourseById',
      'downloadCourseMaterial'
    ]),
    initPage () {
      this.initCourse()
    },
    initCourse () {
      let data = {
        code: this.$route.params.code,
        id: this.$route.params.id
      }
      this.fetchCourseById({
        data,
        callback: this.successFetchCourseById,
        fail: this.failFetchCourseById
      })
    },
    successFetchCourseById () {
      this.courseDetail = this.course
    },
    failFetchCourseById () {
      this.$toasted.error('Fail to load course detail, please refresh the page')
    },
    initDiscussion ($state) {
      this.state = $state
      let data = {
        code: this.$route.params.code,
        id: this.$route.params.id,
        page: this.discussionPaging.page
      }
      this.fetchCourseDiscussions({
        data,
        callback: this.successFetchCourseDiscussions,
        fail: this.failFetchCourseDiscussions
      })
    },
    successFetchCourseDiscussions (response, paging) {
      this.discussionPaging = paging
      this.discussions.push(...response)
      if (response.length) {
        this.discussionPaging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failFetchCourseDiscussions () {
      this.$toasted.error('Fail to load course discussion, please refresh the page')
    },
    postDiscussion () {
      this.submittingDiscussion = true
      const data = {
        code: this.$route.params.code,
        id: this.$route.params.id,
        content: { ...this.discussion }
      }
      this.submitCourseDiscussion({
        data,
        callback: this.successSubmitCourseDiscussion,
        fail: this.failSubmitCourseDiscussion
      })
    },
    successSubmitCourseDiscussion (response) {
      this.submittingDiscussion = false
      this.$toasted.success('Successfully added course discussion')
      this.discussion.comment = ''
      this.discussions.unshift(response)
    },
    failSubmitCourseDiscussion () {
      this.submittingDiscussion = false
      this.$toasted.error('Fail to post course discussion, please try again')
    },
    goToEditCourse () {
      this.$router.push({
        name: 'editCourse',
        params: {
          id: this.$route.params.id,
          code: this.$route.params.code
        }
      })
    },
    openDeleteConfirmationModal () {
      this.showDeleteConfirmationModal = true
    },
    deleteCourse () {
      let data = {
        id: this.$route.params.id,
        code: this.$route.params.code
      }
      this.deleteCourseById({
        data,
        callback: this.successDeleteCourseById,
        fail: this.failDeleteCourseById
      })
      this.showDeleteConfirmationModal = false
    },
    successDeleteCourseById () {
      this.$router.push({ name: 'courseDetail' })
      this.$toasted.success('Successfully delete course')
    },
    failDeleteCourseById () {
      this.$toasted.error('Fail to delete course')
    }
  }
}
