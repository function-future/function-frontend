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
        'id': 'sample-id',
        'title': 'Course Title',
        'description': 'Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes HereCourse Description Goes HereCourse Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes HereCourse Description Goes HereCourse Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes HereCourse Description Goes HereCourse Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes HereCourse Description Goes HereCourse Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes Here Course Description Goes HereCourse Description Goes HereCourse Description Goes Here Course Description Goes Here Course Description Goes Here',
        'material': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
      },
      discussions: [
        {
          id: 'sample-id-1'
        },
        {
          id: 'sample-id-2'
        },
        {
          id: 'sample-id-3'
        },
        {
          id: 'sample-id-4'
        },
        {
          id: 'sample-id-5'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
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
        batchCode: '3',
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
        batchCode: '3',
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
      this.courseDiscussions = this.discussions
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
