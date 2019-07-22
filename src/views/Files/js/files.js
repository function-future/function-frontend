import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCreateFolder from '@/components/modals/ModalCreateFolder'
import ModalFileUploadProgress from '@/components/modals/ModalFileUploadProgress'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'files',
  components: {
    BaseCard,
    BaseButton,
    ModalDeleteConfirmation,
    ModalCreateFolder,
    ModalFileUploadProgress,
    InfiniteLoading
  },
  data () {
    return {
      state: '',
      selectedId: '',
      currentFolder: '',
      paths: [],
      showDeleteConfirmationModal: false,
      showCreateModal: false,
      fileList: [],
      folderList: [],
      paging: {
        page: 1,
        size: 10
      },
      infiniteId: +new Date()
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'accessList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchFiles',
      'createFolder'
    ]),
    initPage ($state) {
      this.state = $state
      const data = {
        parentId: this.$route.params.parentId,
        page: this.paging.page,
        size: this.paging.size
      }
      this.fetchFiles({
        data: data,
        callback: this.successFetchFiles,
        fail: this.failFetchFiles
      })
    },
    successFetchFiles (res) {
      if (res.content.length) {
        this.paging.page++
        this.paths = res.paths
        this.fileList = this.fileList.concat(res.content.filter(i => { return i.type === 'FILE' }))
        this.folderList = this.folderList.concat(res.content.filter(i => { return i.type === 'FOLDER' }))
        this.$route.params.parentId === 'root'
          ? this.currentFolder = 'Root Folder'
          : this.currentFolder = this.folderList[0].parentId
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failFetchFiles () {
      this.fileList = []
      this.folderList = []
      this.$toasted.error('Fail to load files, please try again')
    },
    resetPage () {
      this.paging.page = 1
      this.fileList = []
      this.folderList = []
      this.infiniteId += 1
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
    goToPreviousFolder (path) {
      this.$router.push({
        name: 'folder',
        params: { parentId: path }
      })
    },
    downloadFileFromUrl () {},
    openDeleteConfirmationModal (id, type) {
      this.selectedId = id
      this.selectedFileType = type.toLowerCase()
      this.showDeleteConfirmationModal = true
    },
    onFileChange (e) {
      this.file = e.target.files[0]
      this.upload(this.file)
    },
    upload (file) {},
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
      this.resetPage()
    },
    failCreateFolder () {
      this.$toasted.error('Fail to create folder, please try again')
    },
    deleteThisFile () {}
  },
  watch: {
    $route () {
      this.resetPage()
    }
  }
}
