import { mapActions, mapGetters } from 'vuex'
const ListItem = () => import('@/components/list/ListItem')
const EmptyState = () => import('@/components/emptyState/EmptyState')
const ModalDeleteConfirmation = () => import('@/components/modals/ModalDeleteConfirmation')

export default {
  name: 'FinalJudgingList',
  components: {
    ListItem,
    EmptyState,
    ModalDeleteConfirmation
  },
  data () {
    return {
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      },
      batches: [],
      showDeleteConfirmationModal: false,
      selectedId: '',
      selectedBatch: '',
      isLoading: false,
      failLoadJudging: false
    }
  },
  created () {
    this.fetchBatches({
      callback: this.successFetchBatches,
      fail: this.failFetchBatches
    })
  },
  computed: {
    ...mapGetters([
      'judgingList',
      'accessList',
      'batchList'
    ]),
    judgingEmpty() {
      return !(this.judgingList && this.judgingList.length)
    }
  },
  methods: {
    ...mapActions([
      'fetchJudgingList',
      'fetchBatches',
      'deleteJudging',
      'toast'
    ]),
    initPage () {
      this.isLoading = true
      this.fetchJudgingList({
        data: {
          batchCode: this.selectedBatch,
          page: this.paging.page,
          pageSize: this.paging.size
        },
        callback: this.successFetchingJudgingList,
        fail: this.failFetchingJudgingList
      })
    },
    successFetchingJudgingList (paging) {
      this.isLoading = false
      this.paging = paging
    },
    failFetchingJudgingList () {
      this.isLoading = false
      this.failLoadJudging = true
      this.toast({
        data: {
          message: 'Fail to load judging sessions',
          type: 'is-danger'
        }
      })
    },
    addJudging () {
      this.$router.push({
        name: 'addJudging',
        params: {
          batchCode: this.selectedBatch
        }
      })
    },
    goToJudgingDetail (id) {
      this.$router.push({
        name: 'judgingDetail',
        params: {
          judgingId: id,
          batchCode: this.selectedBatch
        }
      })
    },
    goToEditJudging (id) {
      this.$router.push({
        name: 'editJudging',
        params: {
          judgingId: id,
          batchCode: this.selectedBatch
        }
      })
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      console.log(this.selectedId)
      this.showDeleteConfirmationModal = true
    },
    closeDeleteConfirmationModal () {
      this.selectedId = ''
      this.showDeleteConfirmationModal = false
    },
    deleteThisJudging () {
      this.deleteJudging({
        data: {
          batchCode: this.selectedBatch,
          judgingId: this.selectedId
        },
        callback: this.successDeletingJudging,
        fail: this.failDeletingJudging
      })
    },
    successDeletingJudging () {
      this.toast({
        data: {
          message: 'Successfully deleted judging session',
          type: 'is-success'
        }
      })
      this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: this.selectedBatch
        }
      })
      this.closeDeleteConfirmationModal()
      this.initPage()
    },
    failDeletingJudging () {
      this.toast({
        data: {
          message: 'Fail to delete judging session',
          type: 'is-danger'
        }
      })
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
    goToReportPage () {
      this.$router.push({
        name: 'batchReportPage',
        params: {
          batchCode: this.selectedBatch
        }
      })
    },
    successFetchBatches () {
      this.batches = this.batchList
      this.selectedBatch = this.batches[0].code
    },
    failFetchBatches () {
      this.toast({
        data: {
          message: 'Fail to load batch list, please refresh the page',
          type: 'is-danger'
        }
      })
    }
  },
  watch: {
    selectedBatch () {
      this.initPage()
    }
  }
}
