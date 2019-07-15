import BaseCard from '@/components/BaseCard'
import BaseSelect from '@/components/BaseSelect'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'QuestionnaireResults',
  components: {
    BaseCard,
    BaseSelect,
    BaseButton
  },
  data () {
    return {
      test: 'Helloworld',
      batch: 'No option',
      batches: [
        {
          name: 'batch one',
          value: 'BATCH_ONE'
        },
        {
          name: 'batch two',
          value: 'BATCH_ONE'
        },
        {
          name: 'batch three',
          value: 'BATCH_ONE'
        }
      ]
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
