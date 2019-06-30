import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCopyCourse from '@/components/modals/ModalCopyCourse'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'masterCourses',
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
      masterCourses: [],
      selectedId: '',
      selectedIds: [],
      showDeleteConfirmationModal: false,
      showCopyCourseModal: false
    }
  },
  computed: {
    ...mapGetters([
      'masterCourseList'
    ])
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchMasterCourses',
      'deleteMasterCourseById',
      'copyCourse'
    ]),
    initPage () {
      let data = {
        ...this.paging
      }
      this.fetchMasterCourses({
        data,
        callback: this.successFetchMasterCourses,
        fail: this.failFetchMasterCourses
      })
    },
    successFetchMasterCourses (paging) {
      this.masterCourses = this.masterCourseList
      this.paging = paging
    },
    failFetchMasterCourses () {
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
    goToThisMasterCourseDetail (id) {
      this.$router.push({
        name: 'masterCourseDetail',
        params: { id: id }
      })
    },
    goToAddMasterCourse () {
      this.$router.push({
        name: 'addMasterCourse'
      })
    },
    goToEditMasterCourse (id) {
      this.$router.push({
        name: 'editMasterCourse',
        params: { id: id }
      })
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    deleteThisMasterCourse () {
      let data = { id: this.selectedId }

      this.deleteMasterCourseById({
        data,
        callback: this.successDeleteMasterById,
        fail: this.failDeleteMasterById
      })
    },
    successDeleteMasterById () {
      this.$router.push({ name: 'masterCourses' })
      this.$toasted.success('Successfully delete master course')
      this.showDeleteConfirmationModal = false
    },
    failDeleteMasterById () {
      this.$toasted.error('Fail to delete master course')
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
      let data = {
        content: {
          code: batchDestination,
          originBatch: 'MASTER',
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
      this.selectedIds = []
      this.showCopyCourseModal = false
      this.$toasted.error('Fail to copy course, please try again')
    }
  }
}
