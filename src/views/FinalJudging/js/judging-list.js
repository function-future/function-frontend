import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'FinalJudgingList',
  components: {
    ListItem,
    ModalDeleteConfirmation,
    BasePagination
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
      selectedBatch: ''
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
    ])
  },
  methods: {
    ...mapActions([
      'fetchJudgingList',
      'fetchBatches',
      'deleteJudging'
    ]),
    initPage () {
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
      this.paging = paging
    },
    failFetchingJudgingList () {
      this.$toasted.error('Something went wrong')
    },
    addJudging () {
      this.$router.push({name: 'addJudging'})
    },
    goToComparison (id) {
      this.$router.push({
        name: 'comparison',
        params: {
          judgingId: id
        }
      })
    },
    goToJudgingDetail (id) {
      this.$router.push({
        name: 'judgingDetail',
        params: {
          judgingId: id
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
      this.$toasted.success('Successfully deleted judging session')
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
      this.$toasted.error('Something went wrong')
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
      this.$toasted.error('Something went wrong')
    }
  },
  watch: {
    selectedBatch () {
      this.initPage()
    }
  }
}
