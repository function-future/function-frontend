import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'courses',
  components: {
    BaseCard,
    CourseCard,
    BaseButton,
    ModalDeleteConfirmation
  },
  data () {
    return {
      paging: {
        page: 1,
        size: 10
      },
      courses: [],
      selectedId: '',
      showDeleteConfirmationModal: false
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
      'fetchCourses',
      'deleteCourseById'
    ]),
    initPage () {
      let data = {
        code: this.$route.params.code,
        ...this.paging,
        page: this.paging.page
      }
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
        params: {
          id: id,
          code: this.$route.params.code
        }
      })
    },
    goToAddCourse () {
      this.$router.push({
        name: 'addCourse'
      })
    },
    goToEditCourse (id) {
      this.$router.push({
        name: 'editCourse',
        params: {
          id: id,
          code: this.$route.params.code
        }
      })
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    deleteThisCourse () {
      let data = {
        id: this.selectedId,
        code: this.$route.params.code
      }
      this.deleteCourseById({
        data,
        callback: this.successDeleteCourseById,
        fail: this.failDeleteCourseById
      })
    },
    successDeleteCourseById () {
      this.$router.push({ name: 'courses' })
      this.$toasted.success('Successfully delete course')
      this.showDeleteConfirmationModal = false
    },
    failDeleteCourseById () {
      this.$toasted.error('Fail to delete course')
      this.showDeleteConfirmationModal = false
    }
  }
}
