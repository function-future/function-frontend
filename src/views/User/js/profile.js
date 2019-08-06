import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import BaseSelect from '@/components/BaseSelect'
import ModalChangeProfilePicturePreview from '@/components/modals/ModalChangeProfilePicturePreview'

export default {
  name: 'profile',
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea,
    BaseSelect,
    ModalChangeProfilePicturePreview
  },
  data () {
    return {
      maximumSizeAlert: false,
      showModalChangeProfilePicture: false,
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
      'sendProfilePictureId'
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
      this.$toasted.error('Fail to load profile')
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
      this.showModalChangeProfilePicture = true
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
      this.newAvatar = response
    },
    failUploadProfilePicture () {
      this.$toasted.error('Fail to upload image, please try again')
    },
    sendUpdatedProfilePictureId () {
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
      this.$toasted.success('successfully updated profile picture')
      this.showModalChangeProfilePicture = false
      this.initPage()
    },
    failSendProfilePictureId () {
      this.$toasted.error('Fail to save new profile picture, please try again')
    }
  }
}
