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
  computed: {}
}
