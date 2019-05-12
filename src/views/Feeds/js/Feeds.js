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
    this.fetchAnnouncements('data')
  },
  computed: {
    ...mapGetters([
      'stickyNotes',
      'announcementList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchStickyNotes',
      'fetchAnnouncements'
    ]),
    goToStickyNotesDetail () {
      this.$router.push({ name: 'stickyNotes' })
    },
    goToAnnouncementPage () {
      this.$router.push({ name: 'announcements' })
    },
    goToAnnouncementDetail (id) {
      this.$router.push({
        name: 'announcementDetail',
        params: { id: id }
      })
    },
    setStickyNotes (response) {
      if (response.code === 404) {
        this.stickyNotes.noteTitle = 'Sticky Notes'
        this.stickyNotes.noteDescription = 'Sticky notes will appear here'
      } else if (response.code === 200) {
        this.stickyNotes = response.data
      }
    },
    setAnnouncementsList (response) {
      if (response.code === 200) {
        this.announcements = response.data
      }
    }
  }
}
