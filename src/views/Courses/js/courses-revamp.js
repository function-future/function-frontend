import { mapActions, mapGetters } from 'vuex'
import InfiniteLoading from 'vue-infinite-loading'
import ListItem from '@/components/list/ListItem'

export default {
  name: 'coursesRevamp',
  components: {
    InfiniteLoading,
    ListItem
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
          type: 'MASTER',
          visible: false
        },
        {
          label: 'Courses',
          type: 'BATCH',
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
      this.tabs[this.activeTab].type === 'MASTER' ? this.fetchMasterCourse() : this.initBatchCourse()
    },
    initBatchCourse () {
      this.batches.length ? this.fetchCourse() : this.fetchAllBatch()
    },
    fetchAllBatch () {
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
      console.log(response)
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
    goToEditCourse (id) {
      // this.$router.push({
      //   name: 'editMasterCourse',
      //   params: { id: id }
      // })
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    openShareCourseModal (id) {
      this.selectedIds = [ id ]
      this.showShareCourseModal = true
    }
  },
  watch: {
    activeTab () {
      this.switchingTabLoading = true
      this.resetPage()
    },
    selectedBatchCode () {
      this.resetPage()
    }
  }
}
