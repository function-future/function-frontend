import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import config from '@/config/index'

export default {
  name: 'feeds',
  components: {
    BaseCard
  },
  data () {
    return {
      paging: {
        page: 0,
        size: 10
      }
    }
  },
  created () {
    this.fetchStickyNotes()
    this.loadAnnouncementList()
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
    loadAnnouncementList () {
      this.paging = { ...this.paging }
      let data = { ...this.paging }
      this.fetchAnnouncements({ data })
    }
  }
}
