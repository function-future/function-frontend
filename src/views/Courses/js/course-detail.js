import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import axios from 'axios'
let marked = require('marked')

export default {
  name: 'courseDetail',
  components: {
    BaseCard,
    BaseButton,
    BaseTextArea
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
      }
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
      'submitCourseDiscussion'
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
        id: this.$route.params.id
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
    successFetchCourseDiscussions () {
      this.discussions = this.courseDiscussions
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
    goToEditCourse () {},
    deleteCourse () {},
    forceFileDownload (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      document.body.appendChild(link)
      link.click()
    }
  }
}
