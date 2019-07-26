import { mapGetters, mapActions } from 'vuex'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'modal-file-detail',
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
