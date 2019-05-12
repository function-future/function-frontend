import BaseCard from '@/components/BaseCard'

export default {
  components: { BaseCard },
  props: [
    'user'
  ],
  methods: {
    goToEditUser () {
    },

    deleteUser () {
    }
  },
  computed: {
    batch: function () {
      if (this.user.batch) {
        return 'Batch ' + this.user.batch
      }
      return ''
    }
  }
}
