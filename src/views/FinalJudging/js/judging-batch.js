import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BatchCard from '@/components/batches/BatchCard.vue'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'judgingBatch',
  components: {
    BaseCard,
    BaseButton,
    BatchCard,
    ModalDeleteConfirmation
  },
  data () {
    return {
      batches: [],
      selectedId: '',
      showDeleteConfirmationModal: false
    }
  },
  computed: {
    ...mapGetters([
      'batchList'
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
    goToJudgingList (code) {
      this.$router.push({
        name: 'judgingList',
        params: {
          batchCode: code
        }
      })
    },
    createNewBatch () {
      this.$router.push({
        name: 'addJudgingBatch'
      })
    },
    initPage () {
      this.fetchBatches({
        callback: this.successFetchBatches,
        fail: this.failFetchBatches
      })
    },
    successFetchBatches () {
      this.batches = this.batchList
    },
    failFetchBatches () {
      this.$toasted.error('Fail to fetch batches, please try again')
    },
    editBatch (id) {
      this.$router.push({
        name: 'editJudgingBatch',
        params: { batchCode: id }
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
    },
    successDeleteBatch () {
      this.selectedId = ''
      this.$router.push({ name: 'judgingBatch' })
      this.$toasted.success('Successfully delete batch')
      this.showDeleteConfirmationModal = false
    },
    failDeleteBatch () {
      this.selectedId = ''
      this.$toasted.error('Fail to delete batch')
      this.showDeleteConfirmationModal = false
    }
  }
}