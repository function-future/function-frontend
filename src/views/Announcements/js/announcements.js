import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'announcements',
  components: {
    BaseButton,
    BaseCard,
    ModalDeleteConfirmation,
    BasePagination
  },
  data () {
    return {
      isLoading: false,
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
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
      'announcementList',
      'accessList'
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
      this.isLoading = true
      this.paging = { ...this.paging }
      let data = { ...this.paging }
      this.fetchAnnouncements({
        data,
        callback: this.successLoadAnnouncementList,
        fail: this.failLoadingAnnouncementList
      })
    },
    successLoadAnnouncementList (paging) {
      this.isLoading = false
      this.paging = paging
    },
    failLoadingAnnouncementList () {
      this.isLoading = false
      this.$toasted.error('Fail to load announcement list')
    },
    textPreview: function (announcement) {
      if (announcement.summary) {
        return this.showLimitedPreviewText(announcement.summary.replace(/\!\[.*\]\(.*\)/,''))
      } else {
        return this.showLimitedPreviewText(announcement.description.replace(/\!\[.*\]\(.*\)/,''))
      }
    },
    showLimitedPreviewText: function (text) {
      let maximumCharacters = 250
      if (text.length > maximumCharacters) {
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
        callback: this.successDeleteAnnouncementById,
        fail: this.failDeleteAnnouncementById
      })
      this.closeDeleteConfirmationModal()
    },
    successDeleteAnnouncementById () {
      this.loadAnnouncementList()
      this.$toasted.success('successfully delete announcement')
    },
    failDeleteAnnouncementById () {
      this.$toasted.error('Fail to delete announcement')
    },
    loadPage (page) {
      this.paging.page = page
      this.loadAnnouncementList()
    },
    loadPreviousPage () {
      this.paging.page = this.paging.page - 1
      this.loadAnnouncementList()
    },
    loadNextPage () {
      this.paging.page = this.paging.page + 1
      this.loadAnnouncementList()
    }
  }
}
