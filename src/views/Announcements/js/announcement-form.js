import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'announcementForm',
  components: {
    BaseInput,
    BaseButton,
    BaseTextArea
  },
  data () {
    return {
      announcementDetail: {},
      img_file: {},
      imageIds: [],
      isSubmitting: false,
      pos: ''
    }
  },
  props: [
    'editMode'
  ],
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'announcement'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAnnouncementById',
      'createAnnouncement',
      'updateAnnouncement',
      'initialState',
      'uploadResource'
    ]),
    initPage () {
      this.initialState()
      if (this.editMode) {
        this.getAnnouncementDetail()
      }
    },
    getAnnouncementDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }
      this.fetchAnnouncementById({
        data,
        callback: this.successFetchAnnouncementById,
        fail: this.failFetchAnnouncementById
      })
    },
    successFetchAnnouncementById () {
      this.setAnnouncementDetail()
    },
    failFetchAnnouncementById () {
      this.$toasted.error('Fail to load announcement detail')
    },
    setAnnouncementDetail () {
      this.announcementDetail = {
        id: this.announcement.id || '',
        title: this.announcement.title || '',
        summary: this.announcement.summary || '',
        description: this.announcement.description || ''
      }
      this.imageIds = [ ...this.announcement.files.map(i => i.id) ]
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    sendAnnouncement () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.isSubmitting = true
      let data = {
        ...this.announcementDetail,
        files: this.imageIds
      }
      this.editMode ? this.sendUpdateAnnouncementData(data) : this.sendCreateAnnouncementData(data)
    },
    sendCreateAnnouncementData (data) {
      this.createAnnouncement({
        data,
        callback: this.successSendCreateAnnouncementData,
        fail: this.failSendCreateAnnouncementData
      })
    },
    successSendCreateAnnouncementData () {
      this.initialState()
      this.$router.push({ name: 'announcements' })
      this.$toasted.success('Successfully created new announcement')
    },
    failSendCreateAnnouncementData () {
      this.isSubmitting = false
      this.$toasted.error('Fail to create new announcement')
    },
    sendUpdateAnnouncementData (data) {
      this.updateAnnouncement({
        data,
        callback: this.successSendUpdateAnnouncementData,
        fail: this.failSendUpdateAnnouncementData
      })
    },
    successSendUpdateAnnouncementData () {
      this.$router.push({
        name: 'announcementDetail',
        params: { id: this.announcementDetail.id }
      })
      this.$toasted.success('Successfully update announcement')
      this.initialState()
    },
    failSendUpdateAnnouncementData () {
      this.isSubmitting = false
      this.$toasted.error('Fail to update announcement')
    },
    cancel () {
      this.$router.push({ name: 'announcements' })
    },
    $imgAdd (pos, $file) {
      this.uploadingFile = true
      this.pos = pos
      let data = new FormData()
      data.append('file', $file)
      this.img_file[pos] = $file
      let configuration = { headers: { 'Content-Type': 'multipart/form-data' } }

      this.uploadResource({
        data,
        configuration,
        callback: this.successUploadResource,
        fail: this.failUploadResource
      })
    },
    successUploadResource (response) {
      this.uploadingFile = false
      this.$refs.md.$img2Url(this.pos, response.file.full)
      this.imageIds.push(response.id)
    },
    failUploadResource () {
      this.$toasted.error('Fail to upload image, please delete the image and re-upload')
    },
    $imgDel (pos) {
      delete this.img_file[pos]
    }
  }
}
