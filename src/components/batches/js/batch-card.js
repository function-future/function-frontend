import BaseCard from '@/components/BaseCard'

export default {
  name: 'courseDetail',
  components: {
    BaseCard
  },
  props: [
    'batch',
    'masterBatch'
  ],
  methods: {
    edit () {
      this.$emit('edit', this.batch.id)
    },
    deleteBatch () {
      this.$emit('delete', this.batch.id)
    }
  }
}
