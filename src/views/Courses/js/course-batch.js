import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import BatchCard from '@/components/batches/BatchCard.vue'

export default {
  name: 'courseBatch',
  components: {
    BaseCard,
    BaseButton,
    BatchCard
  },
  data () {
    return {
      batches: [
        {
          id: '1',
          name: 'Batch 1',
          batchCode: '1'
        },
        {
          id: '2',
          name: 'Batch 2',
          batchCode: '2'
        },
        {
          id: '3',
          name: 'Batch 3',
          batchCode: '3'
        },
        {
          id: '4',
          name: 'Batch 4',
          batchCode: '4'
        },
        {
          id: '5',
          name: 'Batch 5',
          batchCode: '5'
        }
      ]
    }
  },
  methods: {
    goToCourse (batchCode) {
      this.$router.push({
        name: 'courses',
        params: {
          batchCode: batchCode
        }
      })
    },
    createNewBatch () {}
  }
}
