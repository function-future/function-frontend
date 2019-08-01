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
      'points',
      'currentUser'
    ])
  },
  methods: {
    ...mapActions([
      'fetchPointList'
    ]),
    initPage () {
      this.fetchPointList({
        data: {
          studentId: this.currentUser.id
        },
        fail: this.failFetchingPointList
      })
    },
    failFetchingPointList () {
      this.$toasted.error('Something went wrong')
    }
  }
}
