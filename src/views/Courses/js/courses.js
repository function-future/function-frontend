import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'courses',
  components: {
    BaseCard,
    CourseCard,
    BaseButton
  },
  data () {
    return {
      paging: {
        page: 0,
        size: 10
      },
      courses: []
    }
  },
  computed: {
    ...mapGetters([
      'courseList'
    ])
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchCourses'
    ]),
    initPage () {
      let data = { ...this.paging }
      this.fetchCourses({
        data,
        callback: this.successFetchCourses,
        fail: this.failFetchCourses
      })
    },
    successFetchCourses () {
      this.courses = this.courseList
    },
    failFetchCourses () {
      this.$toasted.error('Fail to load course list')
    },
    goToThisCourseDetail (id) {
      this.$router.push({
        name: 'courseDetail',
        params: { id: id }
      })
    },
    goToAddCourse () {},
    editThisCourse () {},
    deleteThisCourse () {}
  }
}