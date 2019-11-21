import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'profile',
  data () {
    return {
      maximumSizeAlert: false,
      changeProfilePictureConfirmation: false,
      uploadingProfilePicture: false,
      updatingProfilePicture: false,
      avatarPreview: '',
      newAvatar: '',
      userDetail: {}
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    ...mapActions([
      'fetchProfile',
      'uploadProfilePicture',
      'sendProfilePictureId',
      'toast'
    ]),
    initPage () {
      this.fetchProfile({
        callback: this.successFetchProfile,
        fail: this.failFetchProfile
      })
    },
    successFetchProfile () {
      this.avatarPreview = this.profile.avatar || require('@/assets/profile-picture-placeholder.png')
    },
    failFetchProfile () {
      this.toast({
        data: {
          message: 'Fail to load profile',
          type: 'is-danger'
        }
      })
    },
    goToChangePassword () {
      this.$router.push({ name: 'changePassword' })
    },
    onFileChange (e) {
      this.newImage = e.target.files[0]
      let files = e.target.files
      if (files[0].size > 1000000) {
        this.maximumSizeAlert = true
      } else {
        this.maximumSizeAlert = false
        this.imageUpload()
      }
    },
    imageUpload () {
      this.uploadingProfilePicture = true
      let formData = new FormData()
      formData.append('file', this.newImage)
      let data = {
        source: 'USER',
        resources: formData
      }
      data = { ...data }
      let configuration = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.uploadProfilePicture({
        data,
        configuration,
        callback: this.successUploadProfilePicture,
        fail: this.failUploadProfilePicture
      })
    },
    successUploadProfilePicture (response) {
      this.uploadingProfilePicture = false
      this.changeProfilePictureConfirmation = true
      this.newAvatar = response
      this.avatarPreview = response.file.full
    },
    failUploadProfilePicture () {
      this.uploadingProfilePicture = false
      this.toast({
        data: {
          message: 'Fail to upload image, please try again',
          type: 'is-danger'
        }
      })
    },
    sendUpdatedProfilePictureId () {
      this.updatingProfilePicture = true
      const data = {
        avatar: [ this.newAvatar.id ]
      }
      this.sendProfilePictureId({
        data,
        callback: this.successSendProfilePictureId,
        fail: this.failSendProfilePictureId
      })
    },
    successSendProfilePictureId () {
      this.updatingProfilePicture = false
      this.changeProfilePictureConfirmation = false
      this.toast({
        data: {
          message: 'successfully updated profile picture',
          type: 'is-success'
        }
      })
      this.initPage()
    },
    failSendProfilePictureId () {
      this.updatingProfilePicture = false
      this.toast({
        data: {
          message: 'Fail to save new profile picture, please try again',
          type: 'is-danger'
        }
      })
    },
    cancelChangeProfilePicture () {
      this.changeProfilePictureConfirmation = false
      this.initPage()
    }
  }
}
