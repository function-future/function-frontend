
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
      stickyNote: {},
      announcements: [],
      paging: {
        page: 1,
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
        callback: this.successLoadStickyNote,
        fail: this.failLoadStickyNote
      })
    },
    successLoadStickyNote () {
      this.stickyNote = this.stickyNotes[0]
    },
    failLoadStickyNote () {
      this.$toasted.error('Fail to load sticky note detail, please refresh the page')
    },
    loadAnnouncementList () {
      this.paging = { ...this.paging }
      let data = { ...this.paging }
      this.fetchAnnouncements({
        data,
        callback: this.successLoadAnnouncementList,
        fail: this.failLoadAnnouncementList
      })
    },
    successLoadAnnouncementList () {
      this.announcements = this.announcementList
    },
    failLoadAnnouncementList () {
      this.$toasted.error('Fail to load announcement list')
    }
    // stickyNotesDescriptionPreview (stickyNote) {
    //   if (stickyNote) {
    //     if (stickyNote.description.length > 100) {
    //       return stickyNote.description.substr(0, 100) + '...'
    //     } else {
    //       return stickyNote.description
    //     }
    //   }
  }
}
