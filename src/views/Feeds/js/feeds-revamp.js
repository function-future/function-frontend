import { mapActions, mapGetters } from 'vuex'
const ListItem = () => import('@/components/list/ListItem')
const EmptyState = () => import('@/components/emptyState/EmptyState')
const NotificationsIcon = () => import('@/views/Notifications/NotificationsIcon')
const SkeletonBox = () => import('@/components/skeletonBox/SkeletonBox')

let marked = require('marked')
const MAX_STICKY_NOTE_PREVIEW_LENGTH = 200

export default {
  name: 'feeds',
  components: {
    ListItem,
    EmptyState,
    NotificationsIcon,
    SkeletonBox
  },
  data () {
    return {
      stickyNote: {},
      announcements: [],
      paging: {
        page: 1,
        size: 5
      },
      isLoadingAnnouncement: true,
      failLoadAnnouncement: false,
      isLoadingStickyNotes: true
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
    },
    announcementEmpty () {
      return !(this.announcements && this.announcements.length)
    },
    profileIcon () {
      if (this.loggedIn) return 'user-circle'
      return 'sign-in-alt'
    }
  },
  methods: {
    ...mapActions([
      'fetchStickyNotes',
      'fetchAnnouncements',
      'toast'
    ]),
    loadStickyNote () {
      this.isLoadingStickyNotes = true
      this.fetchStickyNotes({
        callback: this.successLoadStickyNote,
        fail: this.failLoadStickyNote
      })
    },
    successLoadStickyNote () {
      this.isLoadingStickyNotes = false
      this.stickyNote = this.stickyNotes[0] || ''
    },
    failLoadStickyNote () {
      this.isLoadingStickyNotes = false
      this.toast({
        data: {
          message: 'Fail to load sticky note detail, please refresh the page',
          type: 'is-danger'
        }
      })
    },
    goToStickyNotesDetail () {
      this.$router.push({ name: 'stickyNotes' })
    },
    stickyNotesDescriptionPreview (description) {
      if (!description) return 'Currently no important information is available'
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
      this.failLoadAnnouncement = false
    },
    failLoadAnnouncementList () {
      this.toast({
        data: {
          message: 'Fail to load announcement list',
          type: 'is-danger'
        }
      })
      this.isLoadingAnnouncement = false
      this.failLoadAnnouncement = true
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
      announcement.description = announcement.description.replace(/<img([\w\W]+?)>/g, '')
      announcement.description = announcement.description.replace(/<hr>/g, '')
      return this.showLimitedPreviewText(announcement.description)
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
