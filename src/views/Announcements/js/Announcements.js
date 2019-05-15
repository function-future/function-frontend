import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'announcements',
  components: {
    BaseButton,
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
    this.loadAnnouncementList()
  },
  computed: {
    ...mapGetters([
      'announcementList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAnnouncements'
    ]),
    goToAnnouncementDetail (id) {
      this.$router.push({
        name: 'announcementDetail',
        params: { id: id }
      })
    },
    goToAddAnnouncement () {
      this.$router.push({
        name: 'addAnnouncement'
      })
    },
    goToEditAnnouncement (id) {
      this.$router.push({
        name: 'editAnnouncement',
        params: { id: id }
      })
    },
    loadAnnouncementList () {
      this.paging = { ...this.paging }
      let data = { ...this.paging }
      this.fetchAnnouncements({ data })
    },
    textPreview: function (announcement) {
      if (announcement.summary) {
        return this.showLimitedPreviewText(announcement.summary)
      } else {
        return this.showLimitedPreviewText(announcement.description)
      }
    },
    showLimitedPreviewText: function (text) {
      let maximumCharacters = 70
      if (text.length > 70) {
        return text.slice(0, maximumCharacters) + '...'
      }
      return text
    }
  }
}
