import { mapActions, mapGetters } from 'vuex'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ListItem from '@/components/list/ListItem'
import EmptyState from '@/components/emptyState/EmptyState'

export default {
  name: 'batches',
  components: {
    ListItem,
    ModalDeleteConfirmation,
    EmptyState
  },
  data () {
    return {
      isLoading: false,
      batches: [],
      selectedId: '',
      showDeleteConfirmationModal: false,
      failFetchBatch: false
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'accessList'
    ]),
    batchesEmpty () {
      return !(this.batches && this.batches.length)
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchBatches',
      'deleteBatch',
      'toast'
    ]),
    initPage () {
      this.isLoading = true
      this.fetchBatches({
        callback: this.successFetchBatches,
        fail: this.failFetchBatches
      })
    },
    successFetchBatches (response) {
      this.batches = response
      this.isLoading = false
      this.failFetchBatch = false
    },
    failFetchBatches () {
      this.isLoading = false
      this.failFetchBatch = true
      this.toast({
        data: {
          message: 'Fail to fetch batches, please try again',
          type: 'is-danger'
        }
      })
    },
    createNewBatch () {
      this.$router.push({ name: 'addBatch' })
    },
    editBatch (id) {
      this.$router.push({
        name: 'editBatch',
        params: { id: id }
      })
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    deleteThisBatch () {
      let data = {
        id: this.selectedId
      }
      this.deleteBatch({
        data: { ...data },
        callback: this.successDeleteBatch,
        fail: this.failDeleteBatch
      })
      this.showDeleteConfirmationModal = false
    },
    successDeleteBatch () {
      this.selectedId = ''
      this.initPage()
      this.toast({
        data: {
          message: 'Successfully delete batch',
          type: 'is-success'
        }
      })
    },
    failDeleteBatch () {
      this.selectedId = ''
      this.toast({
        data: {
          message: 'Fail to delete batch',
          type: 'is-danger'
        }
      })
    }
  }
}
