import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'
import EmptyState from '@/components/emptyState/EmptyState'
import Websocket from '@/mixins/Websocket'
import config from '@/config/index'
import notificationApi from '@/api/controller/notifications'

let marked = require('marked')
const MAX_STICKY_NOTE_PREVIEW_LENGTH = 200

export default {
  name: 'feeds',
  components: {
    ListItem,
    EmptyState
  },
  mixins: {
    Websocket
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
      notificationSubscription: null,
      notificationStyle: {
        color: 'white'
      }
    }
  },
  created () {
    this.loadStickyNote()
    this.loadAnnouncementList()
    this.checkNotification()
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
  watch: {
    isSocketConnected: function () {
      if (this.isSocketConnected) {
        window.alert('masuk')
        this.notificationSubscription = this.subscribe(
          config.api.communication.topic.notification(this.currentUser.id),
          this.notificationSubscriptionCallback
        )
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchStickyNotes',
      'fetchAnnouncements',
      'toast'
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
      if (name === 'notifications') {this.notificationStyle.color = 'white'}
      this.$router.push({ name: name })
    },
    checkNotification () {
      notificationApi.getTotalUnseen(response => {
        if (response.data.total > 0) {
          this.notificationStyle.color = 'red'
        }
      }, this.errorHandler)
    },
    removeNotificationSubscription: function () {
      this.notificationSubscription.unsubscribe()
      this.notificationSubscription = null
    },
    notificationSubscriptionCallback: function (data) {
      console.log('notif-in')
      this.notificationStyle.color = 'red'
    }
  },
  destroyed () {
    this.removeNotificationSubscription()
  }
}
