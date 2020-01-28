import ModalSelectBatch from '@/components/modals/ModalSelectBatch'
import { mapActions } from 'vuex'

export default {
  name: 'QuestionnaireResults',
  components: {
    ModalSelectBatch
  },
  data () {
    return {
      batch: 'Please select batch',
      showSelectBatchModal: false
    }
  },
  methods: {
    ...mapActions([
      'toast'
    ]),
    goToMembers () {
      if (this.batch !== 'Please select batch') {
        this.$router.push({
          name: 'questionnaireResultsMembers',
          params: {
            batchCode: this.batch
          }
        })
      } else {
        this.toast({
          data: {
            message: 'please select batch',
            type: 'is-danger'
          }
        })
      }
    },
    selectBatch (code) {
      this.batch = code
      this.showSelectBatchModal = false
    },
    closeModal () {
      this.showSelectBatchModal = false
    }
  }
}
