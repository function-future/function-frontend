import BaseCard from '@/components/BaseCard'
import BaseSelect from '@/components/BaseSelect'
import BaseButton from '@/components/BaseButton'
import ModalSelectBatch from '@/components/modals/ModalSelectBatch'

export default {
  name: 'QuestionnaireResults',
  components: {
    BaseCard,
    BaseSelect,
    BaseButton,
    ModalSelectBatch
  },
  data () {
    return {
      batches: [
        {
          name: '',
          value: ''
        },
        {
          name: 'batch one',
          value: 'BATCH_ONE'
        },
        {
          name: 'batch two',
          value: 'BATCH_TWO'
        },
        {
          name: 'batch three',
          value: 'BATCH_THREE'
        }
      ],
      batch: '',
    }
  },
  methods: {
    goToMembers () {
      this.$router.push({
        name: 'questionnaireResultsMembers',
        params: {
          batchCode: this.batch
        }
      })
    }
  }
}
