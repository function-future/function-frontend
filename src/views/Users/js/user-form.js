import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import BaseSelect from '@/components/BaseSelect'
import ModalProfilePicturePreview from '@/components/modals/ModalProfilePicturePreview'
import config from '@/config/index'

export default {
  components: {
    BaseButton,
    BaseInput,
    BaseTextArea,
    BaseSelect,
    ModalProfilePicturePreview
  },
  props: [
    'studentMode',
    'editMode'
  ],
  data () {
    return {
      maximumSizeAlert: false,
      userDetail: {
        role: '',
        email: '',
        name: '',
        phone: '',
        address: '',
        avatar: '',
        avatarId: [],
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
      'updateUser'
    ]),
    initPage () {
      this.initialState()
      if (this.editMode) {
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
      this.setUserDetail()
    },
    failFetchUserById () {
      this.$toasted.error('Fail to load user detail')
    },
    setUserDetail () {
      this.userDetail = this.user
    },
    onFileChange (e) {
      this.newImage = e.target.files[0]
      let files = e.target.files || e.dataTransfer.files
      if (files[0].size > 1000000) {
        this.maximumSizeAlert = true
      } else {
        this.createImage(files[0])
        this.imageUpload()
      }
    },
    createImage (file) {
      let reader = new FileReader()

      reader.onload = (e) => {
        this.user.avatar = e.target.result
      }
      reader.readAsDataURL(file)
    },
    imageUpload () {
      let formData = new FormData()
      formData.append('image', this.newImage)
      // continue post logic
      this.user.avatarId = []
    },
    cancel () {
      this.$router.push({ name: 'users' })
    },
    save () {
      let user = {
        id: this.userDetail.id || '',
        role: this.userDetail.role,
        email: this.userDetail.email,
        name: this.userDetail.name,
        phone: this.userDetail.phone,
        address: this.userDetail.address,
        avatarId: this.userDetail.avatarId
      }
      let student = {
        id: this.userDetail.id || '',
        role: 'STUDENT',
        email: this.userDetail.email,
        name: this.userDetail.name,
        phone: this.userDetail.phone,
        address: this.userDetail.address,
        avatarId: this.userDetail.avatarId,
        batchCode: this.userDetail.batch.code,
        university: this.userDetail.university
      }

      let data = {}
      this.studentMode ? data = { ...student } : data = { ...user }

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
      let msg = ''
      this.editMode ? msg = 'save edited' : msg = 'create new'
      this.$toasted.error('Fail to ' + msg + ' user')
    }
  }
}
