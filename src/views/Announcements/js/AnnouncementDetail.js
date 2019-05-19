import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'announcementDetail',
  components: {
    BaseCard,
    ModalDeleteConfirmation
  },
  created () {
    this.getAnnouncementDetail()
  },
  data () {
    return {
      showDeleteConfirmationModal: false
    }
  },
  computed: {
    ...mapGetters([
      'announcement'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAnnouncementById',
      'deleteAnnouncement'
    ]),
    getAnnouncementDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }
      this.fetchAnnouncementById({
        data,
        callback: () => {
        },
        fail: () => {
          this.$toasted.error('Fail to load announcement detail')
        }
      })
    },
    goToEditAnnouncement () {
      this.$router.push({
        name: 'editAnnouncement',
        params: { id: this.$route.params.id }
      })
    },
    openDeleteConfirmationModal () {
      this.showDeleteConfirmationModal = true
    },
    deleteThisAnnouncement () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }

      this.deleteAnnouncement({
        data,
        callback: () => {
          this.$router.push({ name: 'announcements' })
          this.$toasted.success('successfully delete announcement')
        },
        fail: () => {
          this.$toasted.error('Fail to delete announcement')
        }
      })
    }
  }
}
