import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton'
import BatchCard from '@/components/batches/BatchCard'

export default {
  name: 'modal-copy-course',
  components: {
    BaseButton,
    BatchCard
  },
  data () {
    return {
      batches: [],
      batchDestination: ''
    }
  },
  computed: {
    ...mapGetters([
      'batchList'
    ])
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions([
      'fetchBatches'
    ]),
    close () {
      this.$emit('close')
    },
    copy () {
      this.$emit('copy', this.batchDestination)
    },
    initData () {
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
