import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
let marked = require('marked')
const MAX_STICKY_NOTE_PREVIEW_LENGTH = 200

export default {
  name: 'feeds',
  components: {
    BaseCard
  },
  data () {
    return {
      stickyNote: {
        title: '',
        description: '',
        updatedAt: ''
      },
      announcements: [],
      paging: {
        page: 1,
        size: 5
      },
      isLoadingAnnouncement: false
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
      this.isLoadingAnnouncement = true
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
      this.isLoadingAnnouncement = false
    },
    failLoadAnnouncementList () {
      this.$toasted.error('Fail to load announcement list')
      this.isLoadingAnnouncement = false
    },
    stickyNotesDescriptionPreview (description) {
      if (description.length > MAX_STICKY_NOTE_PREVIEW_LENGTH) {
        return marked(description.substr(0, MAX_STICKY_NOTE_PREVIEW_LENGTH) + '...')
      } else {
        return marked(description)
      }
    },
    showLimitedPreviewText: function (text) {
      let maximumCharacters = 175
      return text.length > maximumCharacters ? text.slice(0, maximumCharacters) + '...' : text
    },
    announcementPreview: function (announcement) {
      if (announcement.summary) {
        return this.showLimitedPreviewText(announcement.summary.replace(/\!\[.*\]\(.*\)/,''))
      } else {
        return this.showLimitedPreviewText(announcement.description.replace(/\!\[.*\]\(.*\)/,''))
      }
    }
  }
}
