import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
let marked = require('marked')

export default {
  name: 'announcementDetail',
  components: {
    BaseCard,
    ModalDeleteConfirmation
  },
  created () {
    this.initialState()
    this.getAnnouncementDetail()
  },
  data () {
    return {
      showDeleteConfirmationModal: false,
      announcementDescriptionMarkdown: ''
    }
  },
  computed: {
    ...mapGetters([
      'announcement',
      'accessList'
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.announcementDescriptionMarkdown)
    }
  },
  methods: {
    ...mapActions([
      'fetchAnnouncementById',
      'deleteAnnouncementById',
      'initialState'
    ]),
    getAnnouncementDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }
      this.fetchAnnouncementById({
        data,
        callback: this.successGetAnnouncementDetail,
        fail: this.failGetAnnouncementDetail
      })
    },
    successGetAnnouncementDetail () {
      this.announcementDescriptionMarkdown = this.announcement.description
    },
    failGetAnnouncementDetail () {
      this.$toasted.error('Fail to load announcement detail')
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

      this.deleteAnnouncementById({
        data,
        callback: this.successDeleteAnnouncementById,
        fail: this.failDeleteAnnouncementById
      })
    },
    successDeleteAnnouncementById () {
      this.$router.push({ name: 'announcements' })
      this.$toasted.success('Successfully delete announcement')
    },
    failDeleteAnnouncementById () {
      this.$toasted.error('Fail to delete announcement')
    }
  }
}
