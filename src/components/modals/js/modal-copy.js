import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'

export default {
  name: 'modal-copy',
  components: {
    ListItem
  },
  data () {
    return {
      isLoading: false,
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
      this.isLoading = true
      this.fetchBatches({
        callback: this.successFetchBatches,
        fail: this.failFetchBatches
      })
    },
    successFetchBatches () {
      this.isLoading = false
      this.batches = this.batchList.filter(batch => batch.code !== (this.$route.params.batchCode || this.$route.params.code))
    },
    failFetchBatches () {
      this.isLoading = false
      this.$toasted.error('Fail to fetch batches, please try again')
    },
    select (code) {
      this.batchDestination = code
    },
    goToCreateBatch () {
      this.$router.push({ name: 'addBatch' })
    }
  }
}
