import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'

export default {
  name: 'announcementForm',
  components: {
    Editor
  },
  data () {
    return {
      announcementDetail: {},
      images: [],
      isSubmitting: false
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
      'uploadResource',
      'toast',
      'showBottomNavBar',
      'hideBottomNavBar'
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
      this.toast({
        data: {
          message: 'Fail to load announcement detail',
          type: 'is-danger'
        }
      })
    },
    setAnnouncementDetail () {
      this.announcementDetail = {
        id: this.announcement.id || '',
        title: this.announcement.title || '',
        summary: this.announcement.summary || '',
        description: this.announcement.description || ''
      }
      this.images = [ ...this.announcement.files ]
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
      let imageIds =
        this.images
          .filter(i => this.announcementDetail.description.includes(i.file.full))
          .map(i => i.id)
      this.isSubmitting = true
      let data = {
        ...this.announcementDetail,
        files: imageIds
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
      this.toast({
        data: {
          message: 'Successfully created new announcement',
          type: 'is-success'
        }
      })
    },
    failSendCreateAnnouncementData () {
      this.isSubmitting = false
      this.toast({
        data: {
          message: 'Fail to create new announcement',
          type: 'is-danger'
        }
      })
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
      this.toast({
        data: {
          message: 'Successfully update announcement',
          type: 'is-success'
        }
      })
      this.initialState()
    },
    failSendUpdateAnnouncementData () {
      this.isSubmitting = false
      this.toast({
        data: {
          message: 'Fail to update announcement',
          type: 'is-danger'
        }
      })
    },
    cancel () {
      this.$router.push({ name: 'announcements' })
    },
    $imgAdd ($file) {
      this.uploadingFile = true
      let data = new FormData()
      data.append('file', $file)
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
      this.$refs.editor.addImage(response.file.full)
      this.images.push(response)
    },
    failUploadResource () {
      this.uploadingFile = false
      this.toast({
        data: {
          message: 'Fail to upload image, please delete the image and re-upload',
          type: 'is-danger'
        }
      })
    }
  }
}
