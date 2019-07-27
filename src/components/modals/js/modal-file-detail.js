import { mapGetters, mapActions } from 'vuex'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'modal-file-detail',
  components: {
    BaseCard
  },
  data () {
    return {
      fileDetail: {},
      isLoading: false
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
      'getFileDetail'
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
    }
  }
}
