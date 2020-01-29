import { mapGetters } from 'vuex'

export default {
  name: 'topic-card',
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
