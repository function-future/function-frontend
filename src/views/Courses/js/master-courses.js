import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import CourseCard from '@/components/courses/CourseCard.vue'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'masterCourses',
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
      masterCourses: [],
      selectedId: '',
      showDeleteConfirmationModal: false
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
      'deleteMasterCourseById'
    ]),
    initPage () {
      let data = {
        ...this.paging,
        page: this.paging.page
      }
      this.fetchMasterCourses({
        data,
        callback: this.successFetchMasterCourses,
        fail: this.failFetchMasterCourses
      })
    },
    successFetchMasterCourses () {
      this.masterCourses = this.masterCourseList
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
    }
  }
}
