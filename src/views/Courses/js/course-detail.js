import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
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
      discussions: []
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
      'fetchCourseDiscussions'
    ]),
    initPage () {
      this.initCourse()
      this.initDiscussion()
    },
    initCourse () {
      let data = {
        batchCode: this.$route.params.batchCode,
        courseId: this.$route.params.id
      }
      this.fetchCourseById({
        data,
        callback: this.successFetchCourseById,
        fail: this.failFetchCourseById
      })
    },
    initDiscussion () {
      let data = {
        batchCode: this.$route.params.batchCode,
        courseId: this.$route.params.id
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
    postDiscussion () {},
    goToEditCourse () {},
    deleteCourse () {}
  }
}
