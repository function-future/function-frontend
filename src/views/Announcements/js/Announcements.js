// @ is an alias to /src
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'announcements',
  components: {
    BaseButton,
    BaseCard
  },
  methods: {
    goToAnnouncementDetail () {
      this.$router.push({
        name: 'announcementDetail',
        params: { id: '1' }
      })
    },

    goToEditAnnouncement () {
      this.$router.push({
        name: 'editAnnouncement',
        params: { id: '1' }
      })
    },

    setAnnouncementsList (response) {
      if (response.code === 200) {
        this.announcements = response.data
      }
    }
  }
}
