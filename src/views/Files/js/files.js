import { mapActions, mapGetters } from 'vuex'
import config from '@/config/index'
import InfiniteLoading from 'vue-infinite-loading'
const ModalDeleteConfirmation = () => import('@/components/modals/ModalDeleteConfirmation')
const ModalCreateFolder = () => import('@/components/modals/ModalCreateFolder')
const ModalRenameFileFolder = () => import('@/components/modals/ModalRenameFileFolder')
const ModalFileUploadProgress = () => import('@/components/modals/ModalFileUploadProgress')
const ModalFileVersion = () => import('@/components/modals/ModalFileVersion')
const EmptyState = () => import('@/components/emptyState/EmptyState')

export default {
  name: 'files',
  components: {
    ModalDeleteConfirmation,
    ModalCreateFolder,
    ModalRenameFileFolder,
    ModalFileUploadProgress,
    ModalFileVersion,
    EmptyState,
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
      showFileVersionModal: false,
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
    },
    breadcrumbsMobile () {
      return this.paths[this.paths.length - 2] || ''
    },
    currentFolderName () {
      let name = (this.paths && this.paths[this.paths.length - 1] && this.paths[this.paths.length - 1].name) || 'Files'
      return name.length > 15 ? name.substr(0, 15) + '...' : name
    }
  },
  methods: {
    ...mapActions([
      'fetchFiles',
      'createFolder',
      'uploadFile',
      'deleteFile',
      'downloadFile',
      'updateFile',
      'toast'
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
      this.toast({
        data: {
          message: 'Fail to load files, please try again',
          type: 'is-danger'
        }
      })
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
      if (!id) {
        this.$router.push({ name: 'feeds' })
        return
      }
      this.$router.push({
        name: 'folder',
        params: { parentId: id }
      })
    },
    openFilePreview (id) {
      // TODO:: file preview on new branch
      // this.$router.push(this.baseUrl + id)
      console.log('ADD FILE PREVIEW WITH PLUGINS. id: ' + id)
    },
    closeFileDetail () {
      this.$router.push({
        name: 'folder',
        params: { parentId: this.$route.params.parentId }
      })
    },
    openFileVersion (id) {
      this.selectedId = id
      this.showFileVersionModal = true
    },
    closeFileVersion () {
      this.selectedId = ''
      this.showFileVersionModal = false
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
      this.toast({
        data: {
          message: 'Folder created',
          type: 'is-success'
        }
      })
      this.resetPage()
    },
    failCreateFolder () {
      this.toast({
        data: {
          message: 'Fail to create folder, please try again',
          type: 'is-danger'
        }
      })
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
      this.toast({
        data: {
          message: 'successfully delete file',
          type: 'is-success'
        }
      })
    },
    failDeleteFile () {
      this.toast({
        data: {
          message: 'Fail to delete file, please try again',
          type: 'is-danger'
        }
      })
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
      this.toast({
        data: {
          message: 'Rename successful',
          type: 'is-success'
        }
      })
      this.resetPage()
    },
    failUpdateFile () {
      this.closeRenameFileFolderModal()
      this.toast({
        data: {
          message: 'Rename failed, please try again',
          type: 'is-danger'
        }
      })
    }
  },
  watch: {
    '$route.params.parentId' () {
      this.resetPage()
    }
  }
}
