import { mapGetters, mapActions } from 'vuex'
import BaseCard from '@/components/BaseCard'
import ModalRenameFileFolder from '@/components/modals/ModalRenameFileFolder'

export default {
  name: 'modal-file-detail',
  components: {
    BaseCard,
    ModalRenameFileFolder
  },
  data () {
    return {
      fileDetail: {},
      isLoading: false,
      isUploading: false,
      showRenameFileFolderModal: false,
      uploadProgress: 0
    }
  },
  props: {
    id: String
  },
  computed: {
    ...mapGetters([
      'accessList'
    ])
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions([
      'downloadFile',
      'getFileDetail',
      'updateFile'
    ]),
    initData () {
      this.isLoading = true
      const data = {
        parentId: this.$route.params.parentId,
        id: this.id
      }
      this.getFileDetail({
        data,
        callback: this.successGetFileDetail,
        fail: this.failGetFileDetail
      })
    },
    successGetFileDetail (res) {
      this.isLoading = false
      this.fileDetail = res.content
    },
    failGetFileDetail () {
      this.isLoading = false
      this.fileDetail = {}
      this.$toasted.error('Fail to get file detail, please try again')
    },
    close () {
      this.$emit('close')
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
    onFileChange (e) {
      this.isUploading = true
      this.file = e.target.files[0]
      this.upload(this.file)
    },
    constructFormData (file, type, isRenameMode) {
      let data = JSON.stringify({
        name: isRenameMode ? file.name : this.fileDetail.name,
        type: type
      })
      let formData = new FormData()
      formData.append('data', data)
      isRenameMode ? formData.append('file', '') : formData.append('file', file)
      return formData
    },
    upload (file) {
      let data = {
        parentId: this.$route.params.parentId,
        id: this.fileDetail.id,
        content: this.constructFormData(file, 'FILE', false)
      }
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress (progressEvent) {
          this.uploadProgress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      }
      this.updateFile({
        data: data,
        configuration: config,
        callback: this.successUpdateFile,
        fail: this.failUpdateFile
      })
    },
    successUpdateFile () {
      this.isUploading = false
      this.$toasted.success('Successfully updated file')
      this.initData()
    },
    failUpdateFile () {
      this.isUploading = false
      this.$toasted.error('Fail to update file, please try again')
    },
    openRenameFileFolderModal (title) {
      this.showRenameFileFolderModal = true
    },
    closeRenameFileFolderModal () {
      this.showRenameFileFolderModal = false
    },
    renameFileFolderFromModal (title) {
      let newTitle = { name: title }
      let data = {
        parentId: this.$route.params.parentId,
        id: this.fileDetail.id,
        content: this.constructFormData(newTitle, this.fileDetail.type, true)
      }
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      this.updateFile({
        data: data,
        configuration: config,
        callback: this.successRenameFile,
        fail: this.failRenameFile
      })
    },
    successRenameFile () {
      this.closeRenameFileFolderModal()
      this.$toasted.success('Rename successful')
      this.initData()
    },
    failRenameFile () {
      this.closeRenameFileFolderModal()
      this.$toasted.error('Rename failed, please try again')
    }
  }
}
