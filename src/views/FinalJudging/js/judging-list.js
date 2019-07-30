import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'FinalJudgingList',
  components: {
    BaseCard,
    BaseButton,
    ModalDeleteConfirmation,
    BasePagination
  },
  data () {
    return {
      paging: {
        page: 1,
        size: 10,
        totalRecords: 13
      },
      showDeleteConfirmationModal: false,
      selectedId: ''
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'judgingList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchJudgingList',
      'deleteJudging'
    ]),
    initPage () {
      this.fetchJudgingList({
        data: {
          batchCode: this.$route.params.batchCode,
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
      this.showDeleteConfirmationModal = true
    },
    closeDeleteConfirmationModal () {
      this.selectedId = ''
      this.showDeleteConfirmationModal = false
    },
    deleteThisJudging () {
      this.deleteJudging({
        data: {
          batchCode: this.$route.params.batchCode,
          judgingId: this.selectedId
        },
        callback: this.successDeletingJudging,
        fail: this.failDeletingJudging
      })
    },
    successDeletingJudging () {
      this.$toasted.success('Successfully deleted question bank')
      this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: this.$route.params.batchCode
        }
      })
      this.closeDeleteConfirmationModal()
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
  }
}
