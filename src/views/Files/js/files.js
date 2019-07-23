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
      showFileUploadModal: false,
      isUploading: false,
      fileList: [],
      folderList: [],
      fileUploadList: [],
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
      'createFolder',
      'uploadFile',
      'deleteFile',
      'downloadFile'
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
    downloadFileFromUrl (url) {
      let configuration = { responseType: 'arraybuffer' }
      url = url.replace('8080', '10001')
      this.downloadFile({
        data: url,
        configuration,
        callback: this.successDownloadFile,
        fail: this.failDownloadFile
      })
    },
    successDownloadFile (response) {
      this.forceFileDownload(response)
    },
    forceFileDownload (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      document.body.appendChild(link)
      link.click()
    },
    failDownloadFile () {
      this.$toasted.error('Fail to download file, please try again')
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
    constructFormData (file, type) {
      let data = JSON.stringify({
        name: file.name,
        type: type
      })
      let formData = new FormData()
      formData.append(data, file)
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
      this.fileUploadList[0].progress = 100
      this.isUploading = false
      this.resetPage()
    },
    failUploadFile () {
      this.fileUploadList[0].progress = 101
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
    },
    successDeleteFile () {
      this.$toasted.success('successfully delete file')
      this.closeDeleteConfirmationModal()
    },
    failDeleteFile () {
      this.$toasted.error('Fail to delete file, please try again')
      this.closeDeleteConfirmationModal()
    },
    closeDeleteConfirmationModal () {
      this.showDeleteConfirmationModal = false
      this.selectedId = ''
    }
  },
  watch: {
    $route () {
      this.resetPage()
    }
  }
}
