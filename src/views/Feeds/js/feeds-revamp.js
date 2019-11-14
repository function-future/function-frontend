import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'
let marked = require('marked')
const MAX_STICKY_NOTE_PREVIEW_LENGTH = 200

export default {
  name: 'feeds',
  components: {
    ListItem
  },
  data () {
    return {
      stickyNote: {},
      announcements: [],
      paging: {
        page: 1,
        size: 5
      },
      isLoadingAnnouncement: true
    }
  },
  created () {
    this.loadStickyNote()
    this.loadAnnouncementList()
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'menuList',
      'stickyNotes',
      'announcementList'
    ]),
    loggedIn () {
      return Object.keys(this.currentUser).length
    },
    stickyNotesAvailable () {
      return Object.keys(this.stickyNote).length
    }
  },
  methods: {
    ...mapActions([
      'fetchStickyNotes',
      'fetchAnnouncements'
    ]),
    loadStickyNote () {
      this.fetchStickyNotes({
        callback: this.successLoadStickyNote,
        fail: this.failLoadStickyNote
      })
    },
    successLoadStickyNote () {
      this.stickyNote = this.stickyNotes[0] || ''
    },
    failLoadStickyNote () {
      this.$toasted.error('Fail to load sticky note detail, please refresh the page')
    },
    goToStickyNotesDetail () {
      this.$router.push({ name: 'stickyNotes' })
    },
    stickyNotesDescriptionPreview (description) {
      if (!description) return 'Important information will appear as sticky notes here'
      if (description.length > MAX_STICKY_NOTE_PREVIEW_LENGTH) {
        return marked(description.substr(0, MAX_STICKY_NOTE_PREVIEW_LENGTH) + '...')
      } else {
        return marked(description)
      }
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
    goToAnnouncementPage () {
      this.$router.push({ name: 'announcements' })
    },
    goToAnnouncementDetail (id) {
      this.$router.push({
        name: 'announcementDetail',
        params: { id: id }
      })
    },
    showLimitedPreviewText: function (text) {
      let maximumCharacters = 200
      return text.length > maximumCharacters ? text.slice(0, maximumCharacters) + '...' : text
    },
    announcementPreview: function (announcement) {
      return this.showLimitedPreviewText(announcement.description.replace(/<img([\w\W]+?)>/g, ''))
    },
    goToProfile () {
      if (!this.loggedIn) {
        this.$router.push({ query: { auth: 'login' } })
        return
      }
      this.$router.push({ name: 'account' })
    },
    goToPage (name) {
      this.$router.push({ name: name })
    }
  }
}
