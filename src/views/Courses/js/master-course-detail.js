import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import axios from 'axios'
let marked = require('marked')

export default {
  name: 'masterCourseDetail',
  components: {
    BaseCard,
    BaseButton,
    BaseTextArea
  },
  data () {
    return {
      masterCourseDetail: {
        id: '',
        title: '',
        description: '',
        material: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'masterCourse'
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.masterCourseDetail.description)
    }
  },
  created () {
    this.initPage()
  },
  methods: {
    ...mapActions([
      'fetchMasterCourseById'
    ]),
    initPage () {
      this.initMasterCourse()
    },
    initMasterCourse () {
      let data = {
        id: this.$route.params.id
      }
      this.fetchMasterCourseById({
        data,
        callback: this.successFetchMasterCourseById,
        fail: this.failFetchMasterCourseById
      })
    },
    successFetchMasterCourseById () {
      this.masterCourseDetail = this.masterCourse
    },
    failFetchMasterCourseById () {
      this.$toasted.error('Fail to load master course detail, please refresh the page')
    },
    downloadMaterial (url) {
      axios({ method: 'get', url: url, responseType: 'arraybuffer' })
        .then(response => { this.forceFileDownload(response) })
        .catch(() => console.log('error occurred'))
    },
    goToEditCourse () {},
    deleteCourse () {},
    forceFileDownload (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      document.body.appendChild(link)
      link.click()
    }
  }
}
