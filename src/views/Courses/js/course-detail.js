import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import InfiniteLoading from 'vue-infinite-loading'
import axios from 'axios'
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
        size: 4
      },
      showDeleteConfirmationModal: false
    }
  },
  computed: {
    ...mapGetters([
      'course',
      'courseDiscussions'
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
      'deleteCourseById'
    ]),
    initPage () {
      this.initCourse()
      this.initDiscussion()
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
    initDiscussion () {
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
    successFetchCourseById () {
      this.courseDetail = this.course
    },
    successFetchCourseDiscussions (response) {
      this.discussions.unshift(...response.reverse())
    },
    failFetchCourseById () {
      this.$toasted.error('Fail to load course detail, please refresh the page')
    },
    failFetchCourseDiscussions () {
      this.$toasted.error('Fail to load course discussion, please refresh the page')
    },
    postDiscussion () {
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
    successSubmitCourseDiscussion () {
      this.$toasted.success('Successfully added course discussion')
      this.discussion.comment = ''
      this.initDiscussion()
    },
    failSubmitCourseDiscussion () {
      this.$toasted.error('Fail to post course discussion, please try again')
    },
    downloadMaterial (url) {
      axios({ method: 'get', url: url, responseType: 'arraybuffer' })
        .then(response => { this.forceFileDownload(response) })
        .catch(() => console.log('error occurred'))
    },
    forceFileDownload (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      document.body.appendChild(link)
      link.click()
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
    },
    successDeleteCourseById () {
      this.$router.push({ name: 'courseDetail' })
      this.$toasted.success('Successfully delete course')
      this.showDeleteConfirmationModal = false
    },
    failDeleteCourseById () {
      this.$toasted.error('Fail to delete course')
      this.showDeleteConfirmationModal = false
    },
    infiniteHandler ($state) {
      this.discussionPaging.page++
      console.log(this.discussionPaging.page)
      this.initDiscussion()
      // $state.loaded()
      // $state.complete()
    }
  }
}
