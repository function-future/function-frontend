import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'userForm',
  props: [
    'studentMode',
    'editMode'
  ],
  data () {
    return {
      isSubmitting: false,
      isLoading: false,
      maximumSizeAlert: false,
      avatarPreview: require('@/assets/profile-picture-placeholder.png'),
      userDetail: {
        role: null,
        email: '',
        name: '',
        phone: '',
        address: '',
        avatar: '',
        avatarId: '',
        university: '',
        batch: {
          code: null,
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
      ],
      batches: [],
      isFetchingBatches: true
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    userAvatarId () {
      return this.userDetail.avatarId ? [ this.userDetail.avatarId ] : []
    },
    roleFromQueryParam () {
      return (this.$route.query && this.$route.query.role) || null
    }
  },
  methods: {
    ...mapActions([
      'initialState',
      'fetchUserById',
      'createUser',
      'updateUser',
      'uploadProfilePicture',
      'fetchBatches',
      'toast',
      'showBottomNavBar',
      'hideBottomNavBar'
    ]),
    initPage () {
      this.initialState()
      this.initBatches()
      this.setSelectedRoleBasedOnQueryParam()
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
      this.isLoading = false
      this.toast({
        data: {
          message: 'Fail to load user detail',
          type: 'is-danger'
        }
      })
    },
    setUserDetail () {
      this.avatarPreview = require('@/assets/profile-picture-placeholder.png')
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
      this.toast({
        data: {
          message: 'Fail to upload image, please try again',
          type: 'is-danger'
        }
      })
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
        avatar: this.userAvatarId
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
      this.toast({
        data: {
          message: 'Successfully ' + msg + ' user',
          type: 'is-success'
        }
      })
    },
    failCreateOrEditUser () {
      this.isSubmitting = false
      let msg = ''
      this.editMode ? msg = 'save edited' : msg = 'create new'
      this.toast({
        data: {
          message: 'Fail to ' + msg + ' user',
          type: 'is-danger'
        }
      })
    },
    initBatches () {
      this.fetchBatches({
        callback: this.successFetchBatches,
        fail: this.failFetchBatches
      })
    },
    successFetchBatches (response) {
      this.isFetchingBatches = false
      this.batches = response
    },
    failFetchBatches () {
      this.toast({
        data: {
          message: 'Fail to fetch batches, please try again',
          type: 'is-danger'
        }
      })
    },
    setSelectedRoleBasedOnQueryParam () {
      if (this.editMode) return
      this.userDetail.role = this.roleFromQueryParam
    }
  }
}
