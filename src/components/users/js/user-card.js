import { mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'

export default {
  components: { BaseCard },
  props: [
    'user'
  ],
  methods: {
    edit () {
      this.$emit('edit', this.user.id, this.user.role)
    },
    deleteUser () {
      this.$emit('delete', this.user.id)
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ]),
    batch: function () {
      if (this.user.role === 'STUDENT') {
        return 'Batch : ' + this.user.batch.name
      }
      return ''
    }
  }
}
