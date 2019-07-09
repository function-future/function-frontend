import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
let marked = require('marked')

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
    ]),
    stickyNoteCompiledMarkdown () {
      return marked(this.stickyNotes.description)
    }
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
