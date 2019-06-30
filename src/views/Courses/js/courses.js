import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCopyCourse from '@/components/modals/ModalCopyCourse'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'courses',
  components: {
    BaseCard,
    CourseCard,
    BaseButton,
    ModalDeleteConfirmation,
    ModalCopyCourse,
    BasePagination
  },
  data () {
    return {
      paging: {
        page: 1,
        size: 10
      },
      courses: [],
      selectedId: '',
      selectedIds: [],
      showDeleteConfirmationModal: false,
      showCopyCourseModal: false
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
      'deleteCourseById',
      'copyCourse'
    ]),
    initPage () {
      let data = {
        code: this.$route.params.code,
        ...this.paging
      }
      this.fetchCourses({
        data,
        callback: this.successFetchCourses,
        fail: this.failFetchCourses
      })
    },
    successFetchCourses (paging) {
      this.courses = this.courseList
      this.paging = paging
    },
    failFetchCourses () {
      this.$toasted.error('Fail to load course list')
    },
    loadPage (page) {
      this.paging.page = page
      this.initPage()
    },
    loadPreviousPage () {
      this.paging.page = this.paging.page - 1
      this.initPage()
    },
    loadNextPage () {
      this.paging.page = this.paging.page + 1
      this.initPage()
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
    },
    openCopySelectedCourseModal () {
      if (this.selectedIds.length) {
        this.showCopyCourseModal = true
      }
    },
    openCopyCourseModal (id) {
      this.selectedIds = [ id ]
      this.showCopyCourseModal = true
    },
    submitCopyCourse (batchDestination) {
      if (batchDestination === '') return
      let data = {
        code: batchDestination,
        content: {
          originBatch: this.$route.params.code,
          courses: [ ...this.selectedIds ]
        }
      }
      this.copyCourse({
        data,
        callback: this.successSubmitCopyCourse,
        fail: this.failSubmitCopyCourse
      })
    },
    successSubmitCopyCourse () {
      this.selectedIds = []
      this.showCopyCourseModal = false
    },
    failSubmitCopyCourse () {
      this.showCopyCourseModal = false
      this.$toasted.error('Fail to copy course, please try again')
    }
  }
}
