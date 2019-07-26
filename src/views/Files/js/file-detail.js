import { mapGetters, mapActions } from 'vuex'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'fileDetail',
  components: {
    BaseCard
  },
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'accessList'
    ])
  }
}
