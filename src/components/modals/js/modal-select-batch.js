import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton'
import BatchCard from '@/components/batches/BatchCard'

export default {
  name: 'modal-select-batch',
  components: {
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
    this.initData()
  },
  methods: {
    ...mapActions([
      'fetchBatches'
    ]),
    close () {
      this.$emit('close')
    },
    select (code) {
      this.$emit('select', code)
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
