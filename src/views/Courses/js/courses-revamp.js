import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import ListItem from '@/components/list/ListItem'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'coursesRevamp',
  components: {
    InfiniteLoading,
    ListItem,
    ModalDeleteConfirmation
  },
  data () {
    return {
      switchingTabLoading: false,
      isLoading: false,
      showDeleteConfirmationModal: false,
      showShareCourseModal: false,
      tabs: [
        {
          label: 'Master Courses',
          type: 'master',
          visible: false
        },
        {
          label: 'Courses',
          type: 'batch',
          visible: true
        }
      ],
      activeTab: 0,
      paging: {
        page: 1,
        size: 10
      },
      selectedBatchCode: '',
      batches: [],
      courses: [],
      selectedId: '',
      selectedIds: [],
      allSelected: false,
      infiniteId: +new Date(),
      infiniteState: ''
    }
  },
  computed: {
    ...mapGetters([
      'accessList',
      'currentUser'
    ]),
    isStudent () {
      return this.currentUser.role === 'STUDENT'
    },
    currentTabType () {
      return this.tabs[this.activeTab].type
    }
  },
  created () {
    this.checkCurrentUser()
    this.setQuery()
  },
  methods: {
    ...mapActions([
      'fetchBatches',
      'fetchCourses',
      'fetchMasterCourses',
      'deleteCourseById',
      'deleteMasterCourseById',
      'copyCourse'
    ]),
    checkCurrentUser () {
      if (!this.isStudent) {
        this.tabs[0].visible = true
        this.activeTab = 0
      }
    },
    initPage ($state) {
      this.state = $state
      this.currentTabType === 'master' ? this.fetchMasterCourse() : this.initBatchCourse()
    },
    setQuery () {
      this.$router.push({
        query: { tab: this.currentTabType }
      })
    },
    initBatchCourse () {
      this.batches.length ? this.fetchCourse() : this.fetchBatchList()
    },
    fetchBatchList () {
      this.fetchBatches({
        callback: this.successFetchBatches,
        fail: this.failFetchBatches
      })
    },
    successFetchBatches (response) {
      this.batches = response
      this.selectedBatchCode = response[0].code
      this.fetchCourse()
    },
    failFetchBatches () {
      this.$toasted.error('Fail to load batch list, please refresh the page')
    },
    fetchCourse () {
      let data = {
        code: this.selectedBatchCode,
        ...this.paging
      }
      this.fetchCourses({
        data: data,
        callback: this.successFetchCourse,
        fail: this.failFetchCourse
      })
    },
    fetchMasterCourse () {
      this.fetchMasterCourses({
        data: this.paging,
        callback: this.successFetchCourse,
        fail: this.failFetchCourse
      })
    },
    successFetchCourse (response, paging) {
      this.switchingTabLoading = false
      this.isLoading = false
      this.paging = paging
      this.courses.push(...response)
      if (response.length) {
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failFetchCourse () {
      this.switchingTabLoading = false
      this.isLoading = false
      this.$toasted.error('Fail to load course list')
    },
    resetPage () {
      this.isLoading = true
      this.courses = []
      this.paging.page = 1
      this.infiniteId += 1
    },
    goToAddPage () {
      this.$router.push({
        name: 'addMasterCourse'
      })
    },
    goToEditPage (id) {
      this.currentTabType === 'master' ? this.editMasterCourse(id) : this.editCourse(id)
    },
    editCourse (id) {
      this.$router.push({
        name: 'editCourse',
        params: {
          id: id,
          code: this.$route.params.code
        }
      })
    },
    editMasterCourse (id) {
      this.$router.push({
        name: 'editMasterCourse',
        params: { id: id }
      })
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    deleteThis () {
      this.currentTabType === 'master' ? this.deleteThisMasterCourse() : this.deleteThisCourse()
    },
    deleteThisCourse () {
      let data = {
        id: this.selectedId,
        code: this.selectedBatchCode
      }
      this.deleteCourseById({
        data,
        callback: this.successDeleteCourse,
        fail: this.failDeleteCourse
      })
    },
    deleteThisMasterCourse () {
      let data = { id: this.selectedId }

      this.deleteMasterCourseById({
        data,
        callback: this.successDeleteCourse,
        fail: this.failDeleteCourse
      })
    },
    successDeleteCourse () {
      this.resetPage()
      this.showDeleteConfirmationModal = false
      this.$toasted.success('Successfully delete master course')
    },
    failDeleteCourse () {
      this.showDeleteConfirmationModal = false
      this.$toasted.error('Fail to delete master course')
    },
    openShareCourseModal (id) {
      this.selectedIds = [ id ]
      this.showShareCourseModal = true
    }
  },
  watch: {
    currentTabType () {
      this.switchingTabLoading = true
      this.resetPage()
      this.setQuery()
    },
    selectedBatchCode () {
      this.resetPage()
    }
  }
}
