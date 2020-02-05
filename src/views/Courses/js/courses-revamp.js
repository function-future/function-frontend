import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import ListItem from '@/components/list/ListItem'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCopy from '@/components/modals/ModalCopy'
import EmptyState from '@/components/emptyState/EmptyState'

export default {
  name: 'coursesRevamp',
  components: {
    InfiniteLoading,
    ListItem,
    ModalDeleteConfirmation,
    ModalCopy,
    EmptyState
  },
  data () {
    return {
      switchingTabLoading: false,
      isLoading: false,
      showDeleteConfirmationModal: false,
      showShareCourseModal: false,
      showSelection: false,
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
      infiniteState: '',
      showNoBatchAvailableMessage: false,
      failFetchData: false
    }
  },
  computed: {
    ...mapGetters([
      'accessList',
      'currentUser'
    ]),
    isStudent () {
      return this.currentUser && this.currentUser.role === 'STUDENT'
    },
    isAdmin () {
      return this.currentUser && this.currentUser.role === 'ADMIN'
    },
    loggedIn () {
      return Object.keys(this.currentUser).length
    },
    currentTabType () {
      return this.$route.query.tab || this.defaultCurrentTabType
    },
    defaultCurrentTabType () {
      if (this.isStudent) return 'batch'
      return 'master'
    },
    partialSelected () {
      return (this.selectedIds.length !== this.courses.length) && this.selectedIds.length > 0
    },
    originBatch () {
      return this.currentTabType === 'master' ? null : this.shareCourseCurrentSelectedBatch
    },
    coursesEmpty () {
      return !(this.courses && this.courses.length)
    },
    courseType () {
      return this.currentTabType === 'master' ? ' master course' : ' course'
    },
    shareCourseCurrentSelectedBatch () {
      if (this.currentTabType === 'master') return ''
      return this.selectedBatchCode
    }
  },
  created () {
    this.checkCurrentUser()
  },
  methods: {
    ...mapActions([
      'fetchBatches',
      'fetchCourses',
      'fetchMasterCourses',
      'deleteCourseById',
      'deleteMasterCourseById',
      'copyCourse',
      'toast'
    ]),
    checkCurrentUser () {
      if (!this.isStudent) {
        this.tabs[0].visible = true
        this.activeTab = this.tabs.findIndex(i => i.type === this.currentTabType)
      } else {
        this.tabs[0].visible = false
        this.activeTab = 1
      }
    },
    initPage ($state) {
      this.infiniteState = $state
      if (this.currentTabType) {
        this.currentTabType === 'master' ? this.fetchMasterCourse() : this.initBatchCourse()
      }
    },
    setQuery () {
      if (this.activeTab < 0 || this.activeTab > this.tabs.length) this.activeTab = 0
      if (this.tabs[this.activeTab].type === this.currentTabType) return
      this.$router.push({
        query: { tab: this.tabs[this.activeTab].type }
      })
    },
    initBatchCourse () {
      if (this.isStudent) {
        this.selectedBatchCode = this.currentUser.batchCode
        this.fetchCourse()
        return
      }
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
      this.failFetchData = false
      this.showNoBatchAvailableMessage = false
      if (this.batches.length) {
        this.selectedBatchCode = response[0].code
        this.fetchCourse()
      } else {
        this.infiniteState.complete()
        this.switchingTabLoading = false
        this.showNoBatchAvailableMessage = true
        this.isLoading = false
      }
    },
    failFetchBatches () {
      this.failFetchData = true
      this.toast({
        data: {
          message: 'Fail to load batch list, please refresh the page',
          type: 'is-danger'
        }
      })
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
      this.failFetchData = false
      this.showNoBatchAvailableMessage = false
      this.paging = paging
      this.courses.push(...response)
      if (response.length) {
        this.paging.page++
        this.infiniteState.loaded()
      } else {
        this.infiniteState.complete()
      }
    },
    failFetchCourse () {
      this.switchingTabLoading = false
      this.isLoading = false
      this.failFetchData = true
      this.showNoBatchAvailableMessage = false
      this.toast({
        data: {
          message: 'Fail to load course list',
          type: 'is-danger'
        }
      })
    },
    resetPage () {
      this.isLoading = true
      this.allSelected = false
      this.selectedIds = []
      this.courses = []
      this.paging.page = 1
      this.infiniteId += 1
    },
    goToAddPage () {
      this.$router.push({ name: 'addMasterCourse' })
    },
    goToDetail (id) {
      this.currentTabType === 'master' ? this.goToMasterCourseDetail(id) : this.goToCourseDetail(id)
    },
    goToEditPage (id) {
      this.currentTabType === 'master' ? this.editMasterCourse(id) : this.editCourse(id)
    },
    deleteThis () {
      this.currentTabType === 'master' ? this.deleteThisMasterCourse() : this.deleteThisCourse()
    },
    editCourse (id) {
      this.$router.push({
        name: 'editCourse',
        params: {
          id: id,
          code: this.selectedBatchCode
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
    goToMasterCourseDetail (id) {
      this.$router.push({
        name: 'masterCourseDetail',
        params: { id: id }
      })
    },
    goToCourseDetail (id) {
      this.$router.push({
        name: 'courseDetail',
        params: { id: id, code: this.selectedBatchCode }
      })
    },
    successDeleteCourse () {
      this.resetPage()
      this.showDeleteConfirmationModal = false
      this.toast({
        data: {
          message: 'Successfully delete ' + this.courseType,
          type: 'is-success'
        }
      })
    },
    failDeleteCourse () {
      this.showDeleteConfirmationModal = false
      this.toast({
        data: {
          message: 'Fail to delete ' + this.courseType,
          type: 'is-danger'
        }
      })
    },
    selectAll () {
      this.allSelected ? this.selectedIds = this.courses.map(i => i.id) : this.selectedIds = []
    },
    openShareCourseModal (id) {
      this.selectedIds = [ id ]
      this.showShareCourseModal = true
    },
    openShareSelectedCourseModal () {
      this.showShareCourseModal = true
    },
    submitShareCourse (destinationBatchCode) {
      this.showShareCourseModal = false
      if (destinationBatchCode === '') return
      let data = {
        code: destinationBatchCode,
        content: {
          originBatch: this.originBatch,
          courses: [ ...this.selectedIds ]
        }
      }
      this.copyCourse({
        data,
        callback: this.successSubmitShareCourse,
        fail: this.failSubmitShareCourse
      })
    },
    successSubmitShareCourse () {
      this.selectedIds = []
      this.toast({
        data: {
          message: 'Successfully share course',
          type: 'is-success'
        }
      })
    },
    failSubmitShareCourse () {
      this.toast({
        data: {
          message: 'Fail to share course, please try again',
          type: 'is-danger'
        }
      })
    },
    courseTitleEllipsis (title) {
      let max = 50
      return title.length > max ? title.substr(0, max) + '...' : title
    },
    goToCreateBatch () {
      this.$router.push({ name: 'addBatch' })
    }
  },
  watch: {
    activeTab () {
      this.setQuery()
    },
    currentTabType () {
      this.switchingTabLoading = true
      this.resetPage()
    },
    allSelected () {
      this.selectAll()
    },
    currentUser () {
      this.checkCurrentUser()
    }
  }
}
