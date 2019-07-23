import { mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'courseDetail',
  components: {
    BaseCard
  },
  props: [
    'batch',
    'showAction'
  ],
  computed: {
    ...mapGetters([
      'accessList'
    ])
  },
  methods: {
    edit () {
      this.$emit('edit', this.batch.id)
    },
    deleteBatch () {
      this.$emit('delete', this.batch.id)
    }
  }
}
