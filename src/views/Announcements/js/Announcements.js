import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'announcements',
  components: {
    BaseButton,
    BaseCard,
    ModalDeleteConfirmation
  },
  data () {
    return {
      paging: {
        page: 0,
        size: 10
      },
      selectedId: '',
      showDeleteConfirmationModal: false
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
      'fetchAnnouncements',
      'deleteAnnouncementById'
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
      this.fetchAnnouncements({
        data,
        callback: () => {},
        fail: () => {
          this.$toasted.error('Fail to load announcement list')
        }
      })
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
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    closeDeleteConfirmationModal () {
      this.selectedId = ''
      this.showDeleteConfirmationModal = false
    },
    deleteThisAnnouncement () {
      let id = { 'id': this.selectedId }
      let data = { ...id }

      this.deleteAnnouncementById({
        data,
        callback: () => {
          this.$router.push({ name: 'announcements' })
          this.$toasted.success('successfully delete announcement')
          this.showDeleteConfirmationModal = false
        },
        fail: () => {
          this.$toasted.error('Fail to delete announcement')
        }
      })
    }
  }
}
