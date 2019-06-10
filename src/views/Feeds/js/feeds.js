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
    this.loadStickyNote()
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
    loadStickyNote () {
      this.fetchStickyNotes({
        callback: () => {},
        fail: () => {
          this.$toasted.error('Fail to load sticky note detail, please refresh the page')
        }
      })
    },
    loadAnnouncementList () {
      this.paging = { ...this.paging }
      let data = { ...this.paging }
      this.fetchAnnouncements({
        data,
        callback: () => {},
        fail: () => {
          this.$toasted.error('Fail to load announcement list')
        }
      })
    }
  }
}