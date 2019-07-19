import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'

export default {
  name: 'files',
  components: {
    BaseCard,
    BaseButton,
    ModalDeleteConfirmation
  },
  data () {
    return {
      isLoading: false,
      selectedId: '',
      previousFolderId: '',
      showDeleteConfirmationModal: false,
      fileList: [],
      folderList: []
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'accessList'
    ])
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchFiles'
    ]),
    initPage () {
      this.isLoading = true
      const data = {
        parentId: 'root'
      }
      this.fetchFiles({
        data: data,
        callback: this.successFetchFiles,
        fail: this.failFetchFiles
      })
    },
    successFetchFiles (res) {
      this.isLoading = false
      this.previousFolderId = res.parentId
      this.fileList = res.content.filter(i => { return i.type === 'FILE' })
      this.folderList = res.content.filter(i => { return i.type === 'FOLDER' })
    },
    failFetchFiles () {
      this.isLoading = false
      this.$toasted.error('Fail to load files, please try again')
    },
    showLimitedPreviewText (text) {
      let maximumCharacters = 15
      if (text.length > maximumCharacters) {
        return text.slice(0, maximumCharacters) + '...'
      }
      return text
    },
    goToFolder () {},
    goToPreviousFolder () {},
    downloadFileFromUrl () {},
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    deleteThisFile () {}
  }
}
