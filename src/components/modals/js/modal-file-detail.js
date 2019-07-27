import { mapGetters, mapActions } from 'vuex'
import BaseCard from '@/components/BaseCard'

export default {
  name: 'modal-file-detail',
  components: {
    BaseCard
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ])
  },
  methods: {
    ...mapActions([
      'downloadFile'
    ]),
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
