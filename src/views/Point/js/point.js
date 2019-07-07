import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'Point',
  components: {
    BaseCard
  },
  data () {
    return {

    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'points'
    ])
  },
  methods: {
    ...mapActions([
      'fetchPointList'
    ]),
    initPage () {
      this.fetchPointList({
        data: {
          studentId: 'sample-id' //TODO: CURRENTLY HARDCODED
        },
        fail: this.failFetchingPointList
      })
    },
    failFetchingPointList () {
      this.$toasted.error('Something went wrong')
    }
  }
}
