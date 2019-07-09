import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCopyCourse from '@/components/modals/ModalCopyCourse'
import BasePagination from '@/components/BasePagination'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'masterCourses',
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
      masterCourses: [],
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
      'masterCourseList'
    ])
  },
  created () {
  },
  methods: {
    ...mapActions([
      'fetchMasterCourses',
      'deleteMasterCourseById',
      'copyCourse'
    ]),
    initPage ($state) {
      this.state = $state
      let data = {
        ...this.paging
      }
      this.fetchMasterCourses({
        data,
        callback: this.successFetchMasterCourses,
        fail: this.failFetchMasterCourses
      })
    },
    successFetchMasterCourses (response, paging) {
      this.paging = paging
      this.masterCourses.push(...response)
      if (response.length) {
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failFetchMasterCourses () {
      this.$toasted.error('Fail to load course list')
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
      if (batchDestination === '') return
      let data = {
        code: batchDestination,
        content: {
          originBatch: null,
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
        this.selectedIds = this.masterCourses.map(i => i.id)
      } else {
        this.selectedIds = []
      }
    }
  }
}
