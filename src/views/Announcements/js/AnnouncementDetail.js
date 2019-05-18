import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'

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
      this.fetchAnnouncementById({ data }).then(() => {
      }, () => {
        this.$toasted.error('Fail to load announcement detail')
      })
    },
    goToEditAnnouncement () {
      this.$router.push({
        name: 'editAnnouncement',
        params: { id: this.$route.params.id }
      })
    }
  }
}
