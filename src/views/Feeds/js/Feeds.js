import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import config from '@/config/index'

export default {
  name: 'feeds',
  components: {
    BaseCard
  },
  created () {
    this.fetchStickyNotes()
  },
  computed: {
    ...mapGetters([
      'stickyNotes'
    ])
  },
  methods: {
    ...mapActions([
      'fetchStickyNotes'
    ]),
    goToStickyNotesDetail () {
      this.$router.push({ name: 'stickyNotes' })
    }
  }
}
