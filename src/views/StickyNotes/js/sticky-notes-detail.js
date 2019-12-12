import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
let marked = require('marked')

export default {
  name: 'stickyNotes',
  components: {
    BaseCard
  },
  data () {
    return {
      stickyNote: {}
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'stickyNotes',
      'accessList'
    ]),
    stickyNotesDescription () {
      return this.stickyNote.description || 'Insert Sticky Notes Here...'
    },
    stickyNoteCompiledMarkdown () {
      return marked(this.stickyNotesDescription)
    }
  },
  methods: {
    ...mapActions([
      'fetchStickyNotes',
      'toast'
    ]),
    initPage () {
      this.fetchStickyNotes({
        callback: this.successFetchStickyNote,
        fail: this.fetchStickyNoteFailed
      })
    },
    successFetchStickyNote () {
      this.stickyNote = this.stickyNotes[0] || ''
    },
    fetchStickyNoteFailed () {
      this.toast({
        data: {
          message: 'Fail to load sticky note detail, please refresh the page',
          type: 'is-danger'
        }
      })
    },
    goToEditStickyNote () {
      this.$router.push({ name: 'editStickyNote' })
    }
  }
}
