import BaseCard from '@/components/BaseCard'
import { mapGetters } from 'vuex'


export default {
  name: 'topic-card',
  components: {
    BaseCard
  },
  props: {
    title: {
      type: String,
      default: 'Lorem Ipsum'
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ])
  }
}
