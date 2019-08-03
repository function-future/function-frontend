import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import BaseSelect from '@/components/BaseSelect'
import ModalSelectBatch from '@/components/modals/ModalSelectBatch'

export default {
  name: 'userForm',
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea,
    BaseSelect,
    ModalSelectBatch
  },
  props: [
    'studentMode',
    'editMode'
  ],
  data () {
    return {
      isSubmitting: false,
      isLoading: false,
      showSelectBatchModal: false,
      maximumSizeAlert: false,
      avatarPreview: '',
      userDetail: {
        role: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        avatar: '',
        avatarId: '',
        university: '',
        batch: {
          code: '',
          id: '',
          name: ''
        }
      },
      roles: [
        {
          value: 'ADMIN',
          name: 'Admin'
        },
        {
          value: 'JUDGE',
          name: 'Judge'
        },
        {
          value: 'MENTOR',
          name: 'Mentor'
        }
      ]
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'initialState',
      'fetchUserById',
      'createUser',
      'updateUser',
      'uploadProfilePicture'
    ]),
    initPage () {
      this.initialState()
      if (this.editMode) {
        this.isLoading = true
        this.getUserDetail()
      }
    },
    getUserDetail () {
      let id = { 'id': this.$route.params.id }
      let data = { ...id }
      this.fetchUserById({
        data,
        callback: this.successFetchUserById,
        fail: this.failFetchUserById
      })
    },
    successFetchUserById () {
      this.isLoading = false
      this.setUserDetail()
    },
    failFetchUserById () {
      this.$toasted.error('Fail to load user detail')
    },
    setUserDetail () {
      this.avatarPreview = this.user.avatar
      this.userDetail = this.user
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
      this.userDetail.avatarId = response.id
      this.avatarPreview = response.file.full
    },
    failUploadProfilePicture () {
      this.$toasted.error('Fail to upload image, please try again')
    },
    cancel () {
      this.$router.push({ name: 'users' })
    },
    validateBeforeSubmit (callback) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          callback()
        }
      })
    },
    save () {
      this.validateBeforeSubmit(this.validationSuccess)
    },
    validationSuccess () {
      this.isSubmitting = true
      let userData = {
        id: this.userDetail.id || '',
        role: this.userDetail.role,
        email: this.userDetail.email,
        name: this.userDetail.name,
        phone: this.userDetail.phone,
        address: this.userDetail.address,
        avatar: [ this.userDetail.avatarId ]
      }
      if (this.studentMode) {
        userData = {
          ...userData,
          role: 'STUDENT',
          batch: this.userDetail.batch.code,
          university: this.userDetail.university
        }
      }
      this.sendData(userData)
    },
    sendData (data) {
      if (this.editMode) {
        this.updateUser({
          data,
          callback: this.successCreateOrEditUser,
          fail: this.failCreateOrEditUser
        })
      } else {
        this.createUser({
          data,
          callback: this.successCreateOrEditUser,
          fail: this.failCreateOrEditUser
        })
      }
    },
    successCreateOrEditUser () {
      this.initialState()
      this.$router.push({ name: 'users' })
      let msg = ''
      this.editMode ? msg = 'save edited' : msg = 'created new'
      this.$toasted.success('Successfully ' + msg + ' user')
    },
    failCreateOrEditUser () {
      this.isSubmitting = false
      let msg = ''
      this.editMode ? msg = 'save edited' : msg = 'create new'
      this.$toasted.error('Fail to ' + msg + ' user')
    },
    selectBatch (code) {
      this.userDetail.batch.code = code
      this.showSelectBatchModal = false
    },
    closeModal () {
      this.showSelectBatchModal = false
    }
  }
}
