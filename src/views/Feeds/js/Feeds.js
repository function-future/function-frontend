import BaseCard from '@/components/BaseCard.vue'
import config from '@/config/index'

export default {
  name: 'feeds',
  components: {
    BaseCard
  },
  data () {
    return {
      stickyNotes: {
        noteTitle: '',
        noteDescription: '',
        updatedAt: ''
      }
    }
  },
  created () {
    this.$http.get(config.api.core.stickyNotes.get)
      .then(res => this.setStickyNotes(res.data))
      .catch(err => console.log(err))
  },
  methods: {
    goToStickyNotesDetail () {
      this.$router.push({ name: 'stickyNotes' })
    },

    setStickyNotes (response) {
      if (response.code === 404) {
        this.stickyNotes.noteTitle = 'Sticky Notes'
        this.stickyNotes.noteDescription = 'Sticky notes will appear here'
      } else if (response.code === 200) {
        this.stickyNotes = response.data
      }
    }
  }
}
