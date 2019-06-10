import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'stickyNotes',
  components: {
    BaseCard
  },
  created () {
    this.initPage()
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
    initPage () {
      this.fetchStickyNotes({
        callback: () => {},
        fail: this.fetchStickyNoteFailed
      })
    },
    fetchStickyNoteFailed () {
      this.$toasted.error('Fail to load sticky note detail, please refresh the page')
    },
    goToAddStickyNote () {
      this.$router.push({ name: 'editStickyNote' })
    }
  }
}
