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
      batches: []
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
      'fetchBatches'
    ]),
    goToCourse (code) {
      this.$router.push({
        name: 'courses',
        params: {
          code: code
        }
      })
    },
    createNewBatch () {},
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
    }
  }
}
