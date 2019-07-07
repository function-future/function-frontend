import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import axios from 'axios'
let marked = require('marked')

export default {
  name: 'masterCourseDetail',
  components: {
    BaseCard,
    BaseButton,
    BaseTextArea,
    ModalDeleteConfirmation
  },
  data () {
    return {
      masterCourseDetail: {
        id: '',
        title: '',
        description: '',
        material: ''
      },
      showDeleteConfirmationModal: false
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
      'fetchMasterCourseById',
      'deleteMasterCourseById'
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
    forceFileDownload (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      document.body.appendChild(link)
      link.click()
    },
    goToEditMasterCourse () {
      this.$router.push({
        name: 'editMasterCourse',
        params: { id: this.$route.params.id }
      })
    },
    openDeleteConfirmationModal () {
      this.showDeleteConfirmationModal = true
    },
    deleteMasterCourse () {
      let data = { id: this.$route.params.id }

      this.deleteMasterCourseById({
        data,
        callback: this.successDeleteMasterById,
        fail: this.failDeleteMasterById
      })
    },
    successDeleteMasterById () {
      this.$router.push({ name: 'masterCourses' })
      this.$toasted.success('Successfully delete master course')
      this.showDeleteConfirmationModal = false
    },
    failDeleteMasterById () {
      this.$toasted.error('Fail to delete master course')
      this.showDeleteConfirmationModal = false
    },
  }
}