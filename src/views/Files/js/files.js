import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import ModalCreateFolder from '@/components/modals/ModalCreateFolder'
import ModalRenameFileFolder from '@/components/modals/ModalRenameFileFolder'
import ModalFileUploadProgress from '@/components/modals/ModalFileUploadProgress'
import ModalFileDetail from '@/components/modals/ModalFileDetail'
import InfiniteLoading from 'vue-infinite-loading'
import config from '@/config/index'

export default {
  name: 'files',
  components: {
    BaseCard,
    BaseButton,
    ModalDeleteConfirmation,
    ModalCreateFolder,
    ModalRenameFileFolder,
    ModalFileUploadProgress,
    ModalFileDetail,
    InfiniteLoading
  },
  data () {
    return {
      state: '',
      selectedId: '',
      selectedType: '',
      paths: [],
      showDeleteConfirmationModal: false,
      showCreateModal: false,
      showRenameFileFolderModal: false,
      showFileUploadModal: false,
      isUploading: false,
      file: {},
      fileList: [],
      folderList: [],
      fileUploadList: [],
      paging: {
        page: 1,
        size: 10
      },
      infiniteId: +new Date(),
      currentTitle: ''
    }
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'accessList'
    ]),
    baseUrl () {
      return config.app.pages.files.root + '/' + this.$route.params.parentId + '/'
    },
    FileDetail () {
      return this.$route.params.id ? 'ModalFileDetail' : ''
    },
    breadcrumbs () {
      if (this.paths.length > 4) {
        return [
          ...this.paths.slice(0, 2),
          { name: '...' },
          ...this.paths.slice(this.paths.length - 2, this.paths.length)
        ]
      }
      return this.paths
    }
  },
  methods: {
    ...mapActions([
      'fetchFiles',
      'createFolder',
      'uploadFile',
      'deleteFile',
      'downloadFile',
      'updateFile'
    ]),
    initPage ($state) {
      this.state = $state
      let data = {
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
      this.paths = res.paths
      if (res.content.length) {
        this.paging.page++
        this.fileList = this.fileList.concat(res.content.filter(i => { return i.type === 'FILE' }))
        this.folderList = this.folderList.concat(res.content.filter(i => { return i.type === 'FOLDER' }))
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
      this.file = {}
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
      if (!id) return
      this.$router.push({
        name: 'folder',
        params: { parentId: id }
      })
    },
    openFileDetail (id) {
      this.$router.push(this.baseUrl + id)
    },
    closeFileDetail () {
      this.$router.push({
        name: 'folder',
        params: { parentId: this.$route.params.parentId }
      })
    },
    openDeleteConfirmationModal (id, type) {
      this.selectedId = id
      this.selectedFileType = type.toLowerCase()
      this.showDeleteConfirmationModal = true
    },
    onFileChange (e) {
      this.isUploading = true
      this.showFileUploadModal = true
      this.file = e.target.files[0]
      let file = {
        name: this.file.name,
        progress: 0
      }
      this.fileUploadList.unshift(file)
      this.upload(this.file)
    },
    constructFormData (file, type, isRenameMode) {
      let data = JSON.stringify({
        name: file.name,
        type: type
      })
      let formData = new FormData()
      formData.append('data', data)
      type === 'FOLDER' || isRenameMode
        ? formData.append('file', '')
        : formData.append('file', file)
      return formData
    },
    upload (file) {
      let data = {
        parentId: this.$route.params.parentId,
        content: this.constructFormData(file, 'FILE')
      }
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress (progressEvent) {
          this.fileUploadList[0].progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      }
      this.uploadFile({
        data: data,
        configuration: config,
        callback: this.successUploadFile,
        fail: this.failUploadFile
      })
    },
    successUploadFile () {
      this.fileUploadList[0].progress = 101
      this.isUploading = false
      this.resetPage()
    },
    failUploadFile () {
      this.file.size > 200000000 ? this.fileUploadList[0].progress = 103 : this.fileUploadList[0].progress = 102
      this.file = {}
      this.isUploading = false
    },
    closeFileUploadModal () {
      this.showFileUploadModal = false
      this.fileUploadList = []
    },
    createFolderFromModal (title) {
      this.showCreateModal = false
      let folder = { name: title }
      let config = { headers: { 'Content-Type': 'multipart/form-data' } }
      let data = {
        parentId: this.$route.params.parentId,
        content: this.constructFormData(folder, 'FOLDER')
      }
      this.createFolder({
        data: data,
        configuration: config,
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
    deleteThisFile () {
      let data = {
        parentId: this.$route.params.parentId,
        id: this.selectedId
      }
      this.deleteFile({
        data,
        callback: this.successDeleteFile,
        fail: this.failDeleteFile
      })
      this.closeDeleteConfirmationModal()
    },
    successDeleteFile () {
      this.resetPage()
      this.$toasted.success('successfully delete file')
    },
    failDeleteFile () {
      this.$toasted.error('Fail to delete file, please try again')
    },
    closeDeleteConfirmationModal () {
      this.showDeleteConfirmationModal = false
      this.selectedId = ''
    },
    openRenameFileFolderModal (id, title, type) {
      this.showRenameFileFolderModal = true
      this.selectedId = id
      this.selectedType = type
      this.currentTitle = title
    },
    closeRenameFileFolderModal () {
      this.showRenameFileFolderModal = false
      this.selectedId = ''
      this.selectedType = ''
      this.currentTitle = ''
    },
    renameFileFolderFromModal (title) {
      let newTitle = { name: title }
      let data = {
        parentId: this.$route.params.parentId,
        id: this.selectedId,
        content: this.constructFormData(newTitle, this.selectedType, true)
      }
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      this.updateFile({
        data: data,
        configuration: config,
        callback: this.successUpdateFile,
        fail: this.failUpdateFile
      })
    },
    successUpdateFile () {
      this.closeRenameFileFolderModal()
      this.$toasted.success('Rename successful')
      this.resetPage()
    },
    failUpdateFile () {
      this.closeRenameFileFolderModal()
      this.$toasted.error('Rename failed, please try again')
    }
  },
  watch: {
    '$route.params.parentId' () {
      this.resetPage()
    }
  }
}
