import { mapGetters, mapActions } from 'vuex'
import ListItem from '@/components/list/ListItem'

export default {
  name: 'modal-file-version',
  components: {
    ListItem
  },
  data () {
    return {
      fileDetail: {},
      isLoading: false,
      isUploading: false,
      disableUpload: false
    }
  },
  props: [ 'id' ],
  computed: {
    ...mapGetters([
      'accessList',
      'currentUser'
    ]),
    author () {
      return (this.fileDetail && this.fileDetail.author && this.fileDetail.author.name)
    },
    ownerOfTheFile () {
      return (this.currentUser.id === (this.fileDetail && this.fileDetail.author && this.fileDetail.author.id))
    }
  },
  created () {
    this.initData()
  },
  methods: {
    ...mapActions([
      'downloadFile',
      'getFileDetail',
      'updateFile',
      'toast'
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
      this.disableUpload = true
      this.isLoading = false
      this.fileDetail = {}
      this.toast({
        data: {
          message: 'Fail to get file detail, please try again',
          type: 'is-danger'
        }
      })
    },
    close () {
      this.$emit('close')
    },
    onFileChange (e) {
      this.isUploading = true
      this.file = e.target.files[0]
      this.upload(this.file)
    },
    constructFormData (file, type) {
      let data = JSON.stringify({
        name: this.fileDetail.name,
        type: type
      })
      let formData = new FormData()
      formData.append('data', data)
      formData.append('file', file)
      return formData
    },
    upload (file) {
      let data = {
        parentId: this.$route.params.parentId,
        id: this.fileDetail.id,
        content: this.constructFormData(file, 'FILE')
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
      this.isUploading = false
      this.toast({
        data: {
          message: 'Successfully updated file',
          type: 'is-success'
        }
      })
      this.initData()
    },
    failUpdateFile () {
      this.isUploading = false
      this.toast({
        data: {
          message: 'Fail to update file, please try again',
          type: 'is-danger'
        }
      })
    }
  }
}
