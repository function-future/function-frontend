import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCreateFolder from '@/components/modals/ModalCreateFolder'

export default {
  name: 'files',
  components: {
    BaseCard,
    BaseButton,
    ModalDeleteConfirmation,
    ModalCreateFolder
  },
  data () {
    return {
      isLoading: false,
      selectedId: '',
      currentFolder: '',
      previousFolderId: '',
      showDeleteConfirmationModal: false,
      showCreateModal: false,
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
      'fetchFiles',
      'createFolder'
    ]),
    initPage () {
      this.isLoading = true
      const data = {
        parentId: this.$route.params.parentId
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
      this.$route.params.parentId === 'root'
        ? this.currentFolder = 'Root Folder'
        : this.currentFolder = this.folderList[0].parentId
    },
    failFetchFiles () {
      this.isLoading = false
      this.fileList = []
      this.folderList = []
      this.$toasted.error('Fail to load files, please try again')
    },
    showLimitedPreviewText (text) {
      let maximumCharacters = 15
      if (text.length > maximumCharacters) {
        return text.slice(0, maximumCharacters) + '...'
      }
      return text
    },
    goToFolder (id) {
      this.$router.push({
        name: 'folder',
        params: { parentId: id }
      })
    },
    goToPreviousFolder () {
      this.$router.push({
        name: 'folder',
        params: { parentId: this.previousFolderId }
      })
    },
    downloadFileFromUrl () {},
    openDeleteConfirmationModal (id, type) {
      this.selectedId = id
      this.selectedFileType = type.toLowerCase()
      this.showDeleteConfirmationModal = true
    },
    onFileChange (e) {},
    createFolderFromModal (title) {
      this.showCreateModal = false
      const data = {
        parentId: this.$route.params.parentId,
        content: {
          name: title,
          type: 'FOLDER'
        }
      }
      this.createFolder({
        data: data,
        callback: this.successCreateFolder,
        fail: this.failCreateFolder
      })
    },
    successCreateFolder () {
      this.$toasted.success('Folder created')
      this.initPage()
    },
    failCreateFolder () {
      this.$toasted.error('Fail to create folder, please try again')
    },
    deleteThisFile () {}
  },
  watch: {
    $route () {
      this.initPage()
    }
  }
}