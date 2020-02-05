import { mapActions, mapGetters } from 'vuex'
const ListItem = () => import('@/components/list/ListItem')
let marked = require('marked')

export default {
  name: 'stickyNotes',
  components: {
    ListItem
  },
  data () {
    return {
      stickyNote: {},
      isLoading: false
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
      this.isLoading = true
      this.fetchStickyNotes({
        callback: this.successFetchStickyNote,
        fail: this.fetchStickyNoteFailed
      })
    },
    successFetchStickyNote () {
      this.stickyNote = this.stickyNotes[0] || ''
      this.isLoading = false
    },
    fetchStickyNoteFailed () {
      this.isLoading = false
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
