import { mapActions, mapGetters } from 'vuex'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ListItem from '@/components/list/ListItem'

export default {
  name: 'batches',
  components: {
    ListItem,
    ModalDeleteConfirmation
  },
  data () {
    return {
      isLoading: false,
      batches: [],
      selectedId: '',
      showDeleteConfirmationModal: false
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'accessList'
    ])
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchBatches',
      'deleteBatch'
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
    },
    failFetchBatches () {
      this.isLoading = false
      this.$toasted.error('Fail to fetch batches, please try again')
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
      this.$toasted.success('Successfully delete batch')
    },
    failDeleteBatch () {
      this.selectedId = ''
      this.$toasted.error('Fail to delete batch')
    }
  }
}
