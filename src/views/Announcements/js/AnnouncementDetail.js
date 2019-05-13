import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import config from '@/config/index'

export default {
  name: 'announcementDetail',
  components: {
    BaseCard
  },
  created () {
    this.getAnnouncementDetail()
  },
  computed: {
    ...mapGetters([
      'announcement'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAnnouncementById'
    ]),
    getAnnouncementDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }
      this.fetchAnnouncementById({ data })
    },
    goToEditAnnouncement () {
      this.$router.push({
        name: 'editAnnouncement',
        params: { id: this.announcement.id }
      })
    }
  }
}
