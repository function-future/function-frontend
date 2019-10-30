import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BatchCard from '@/components/batches/BatchCard.vue'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ListItem from '@/components/list/ListItem'

export default {
  name: 'courseBatch',
  components: {
    ListItem,
    ModalDeleteConfirmation
  },
  data () {
    return {
      isLoading: false,
      masterCourse: {
        id: 'master',
        code: 'master',
        name: 'Master Course'
      },
      batches: [],
      selectedId: '',
      showDeleteConfirmationModal: false
    }
  },
  computed: {
    ...mapGetters([
      'batchList',
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
    goToCourse (code) {
      this.$router.push({
        name: 'courses',
        params: {
          code: code
        }
      })
    },
    goToMasterCourse () {
      this.$router.push({
        name: 'masterCourses'
      })
    },
    createNewBatch () {
      this.$router.push({
        name: 'addBatch'
      })
    },
    initPage () {
      this.isLoading = true
      this.fetchBatches({
        callback: this.successFetchBatches,
        fail: this.failFetchBatches
      })
    },
    successFetchBatches () {
      this.batches = this.batchList
      this.isLoading = false
    },
    failFetchBatches () {
      this.isLoading = false
      this.$toasted.error('Fail to fetch batches, please try again')
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
