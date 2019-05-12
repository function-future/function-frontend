import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'announcements',
  components: {
    BaseButton,
    BaseCard
  },
  created () {
    this.fetchAnnouncements('data')
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

    goToEditAnnouncement (id) {
      this.$router.push({
        name: 'editAnnouncement',
        params: { id: id }
      })
    }
  }
}
