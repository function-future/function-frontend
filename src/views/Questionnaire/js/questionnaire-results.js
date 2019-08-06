import BaseCard from '@/components/BaseCard'
import BaseSelect from '@/components/BaseSelect'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import ModalSelectBatch from '@/components/modals/ModalSelectBatch'

export default {
  name: 'QuestionnaireResults',
  components: {
    BaseCard,
    BaseSelect,
    BaseButton,
    BaseInput,
    ModalSelectBatch
  },
  data () {
    return {
      batch: 'Please select batch',
      showSelectBatchModal: false
    }
  },
  methods: {
    goToMembers () {
      if (this.batch !== 'Please select batch') {
        this.$router.push({
          name: 'questionnaireResultsMembers',
          params: {
            batchCode: this.batch
          }
        })
      } else {
        this.$toasted.error('please select batch')
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
