import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'
import EmptyState from '@/components/emptyState/EmptyState'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
let marked = require('marked')

export default {
  name: 'announcements',
  components: {
    ListItem,
    EmptyState,
    ModalDeleteConfirmation
  },
  data () {
    return {
      isLoading: false,
      failLoadAnnouncement: false,
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
    ]),
    announcementEmpty () {
      return !(this.announcementList && this.announcementList.length)
    }
  },
  methods: {
    ...mapActions([
      'fetchAnnouncements',
      'deleteAnnouncementById',
      'toast'
    ]),
    goToAnnouncementDetail (id) {
      id && this.$router.push({
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
      this.failLoadAnnouncement = false
      this.paging = paging
    },
    failLoadingAnnouncementList () {
      this.isLoading = false
      this.failLoadAnnouncement = true
      this.toast({
        data: {
          message: 'Fail to load announcement list',
          type: 'is-danger'
        }
      })
    },
    textPreview: function (announcement) {
      return marked(this.showLimitedPreviewText(announcement.description.replace(/<img([\w\W]+?)>/g, '')))
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
    },
    loadPage (page) {
      this.paging.page = page
      this.loadAnnouncementList()
    }
  }
}
