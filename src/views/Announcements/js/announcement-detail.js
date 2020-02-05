import { mapActions, mapGetters } from 'vuex'
const ModalDeleteConfirmation = () => import('@/components/modals/ModalDeleteConfirmation')
let marked = require('marked')

export default {
  name: 'announcementDetail',
  components: {
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
      'initialState',
      'toast'
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
      this.toast({
        data: {
          message: 'Fail to load announcement detail',
          type: 'is-danger'
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

      this.deleteAnnouncementById({
        data,
        callback: this.successDeleteAnnouncementById,
        fail: this.failDeleteAnnouncementById
      })
    },
    successDeleteAnnouncementById () {
      this.$router.push({ name: 'announcements' })
      this.toast({
        data: {
          message: 'Successfully delete announcement',
          type: 'is-success'
        }
      })
    },
    failDeleteAnnouncementById () {
      this.toast({
        data: {
          message: 'Fail to delete announcement',
          type: 'is-danger'
        }
      })
    }
  }
}
