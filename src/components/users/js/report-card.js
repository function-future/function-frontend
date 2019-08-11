import { mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'ReportCard',
  components: { BaseCard },
  props: [
    'user',
    'score'
  ],
  methods: {},
  computed: {
    batch: function () {
      if (this.user.role === 'STUDENT') {
        return 'Batch : ' + this.user.batch.name
      }
      return ''
    }
  }
}
