import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCopyCourse from '@/components/modals/ModalCopyCourse'
import BasePagination from '@/components/BasePagination'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'courses',
  components: {
    BaseCard,
    CourseCard,
    BaseButton,
    ModalDeleteConfirmation,
    ModalCopyCourse,
    BasePagination,
    InfiniteLoading
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
      allSelected: false,
      showDeleteConfirmationModal: false,
      showCopyCourseModal: false,
      state: ''
    }
  },
  computed: {
    ...mapGetters([
      'courseList'
    ]),
    isMaximumPage () {
      return Math.ceil(this.paging.totalRecords / this.paging.size) === this.paging.page
    }
  },
  created () {
  },
  methods: {
    ...mapActions([
      'fetchCourses',
      'deleteCourseById',
      'copyCourse'
    ]),
    initPage ($state) {
      this.state = $state
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
    successFetchCourses (response, paging) {
      this.paging = paging
      this.courses.push(...response)
      if (this.isMaximumPage) {
        this.state.complete()
      } else {
        this.paging.page++
        this.state.loaded()
      }
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
    },
    select () {
      this.allSelected = false
    },
    selectAll () {
      if (!this.allSelected) {
        this.selectedIds = this.courses.map(i => i.id)
      } else {
        this.selectedIds = []
      }
    }
  }
}