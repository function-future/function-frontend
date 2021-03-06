import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
const ModalDeleteConfirmation = () => import('@/components/modals/ModalDeleteConfirmation')
let marked = require('marked')

export default {
  name: 'courseDetail',
  components: {
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
        size: 5,
        totalRecords: 0
      },
      showDeleteConfirmationModal: false,
      submittingDiscussion: false,
      disableDiscussion: false,
      state: ''
    }
  },
  props: [ 'master' ],
  computed: {
    ...mapGetters([
      'accessList'
    ]),
    descriptionCompiledMarkdown () {
      return marked(this.courseDetail.description)
    },
    paramsData () {
      let params = this.$route.params
      return this.master ? { id: params.id } : { id: params.id, code: params.code }
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchCourseById',
      'fetchMasterCourseById',
      'fetchCourseDiscussions',
      'submitCourseDiscussion',
      'deleteCourseById',
      'deleteMasterCourseById',
      'downloadCourseMaterial',
      'toast'
    ]),
    initPage () {
      this.master ? this.initMasterCourse() : this.initCourse()
    },
    initCourse () {
      this.fetchCourseById({
        data: this.paramsData,
        callback: this.successFetchById,
        fail: this.failFetchById
      })
    },
    initMasterCourse () {
      this.fetchMasterCourseById({
        data: this.paramsData,
        callback: this.successFetchById,
        fail: this.failFetchById
      })
    },
    successFetchById (response) {
      this.courseDetail = response
    },
    failFetchById () {
      this.disableDiscussion = true
      this.toast({
        data: {
          message: 'Fail to load detail, please refresh the page',
          type: 'is-danger'
        }
      })
    },
    initDiscussion ($state) {
      this.state = $state
      let data = {
        ...this.paramsData,
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
      this.toast({
        data: {
          message: 'Fail to load course discussion, please refresh the page',
          type: 'is-danger'
        }
      })
    },
    postDiscussion () {
      this.submittingDiscussion = true
      const data = {
        ...this.paramsData,
        content: { ...this.discussion }
      }
      this.submitCourseDiscussion({
        data,
        callback: this.successSubmitCourseDiscussion,
        fail: this.failSubmitCourseDiscussion
      })
    },
    successSubmitCourseDiscussion (response) {
      this.toast({
        data: {
          message: 'Successfully added course discussion',
          type: 'is-success'
        }
      })
      this.submittingDiscussion = false
      this.discussion.comment = ''
      this.discussions.unshift(response)
      this.discussionPaging.totalRecords++
    },
    failSubmitCourseDiscussion () {
      this.submittingDiscussion = false
      this.toast({
        data: {
          message: 'Fail to post course discussion, please try again',
          type: 'is-danger'
        }
      })
    },
    goToEditPage () {
      this.master ? this.editMasterCourse() : this.editCourse()
    },
    editMasterCourse () {
      this.$router.push({
        name: 'editMasterCourse',
        params: this.paramsData
      })
    },
    editCourse () {
      this.$router.push({
        name: 'editCourse',
        params: this.paramsData
      })
    },
    openDeleteConfirmationModal () {
      this.showDeleteConfirmationModal = true
    },
    deleteThis () {
      this.master ? this.deleteMasterCourse() : this.deleteCourse()
    },
    deleteMasterCourse () {
      this.deleteMasterCourseById({
        data: this.paramsData,
        callback: this.successDeleteById,
        fail: this.failDeleteById
      })
      this.showDeleteConfirmationModal = false
    },
    deleteCourse () {
      this.deleteCourseById({
        data: this.paramsData,
        callback: this.successDeleteById,
        fail: this.failDeleteById
      })
      this.showDeleteConfirmationModal = false
    },
    successDeleteById () {
      this.backToCourseList()
      this.toast({
        data: {
          message: 'Successfully delete course',
          type: 'is-success'
        }
      })
    },
    failDeleteById () {
      this.toast({
        data: {
          message: 'Fail to delete course',
          type: 'is-danger'
        }
      })
    },
    backToCourseList () {
      this.$router.push({
        name: 'courses',
        query: { tab: this.master ? 'master' : 'batch' }
      })
    }
  }
}
