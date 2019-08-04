import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'
import BaseButton from '@/components/BaseButton'
import BaseSelect from '@/components/BaseSelect'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AssignmentDetail',
  components: {
    BaseInput,
    BaseTextArea,
    BaseButton,
    BaseSelect
  },
  data () {
    return {
      displayedDates: {
        start: null,
        end: null
      },
      assignmentDetail: {
        title: '',
        description: '',
        deadline: null,
        file: []
      },
      editMode: false,
      uploadingFile: false,
      filePreviewName: '',
      file: {}
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'assignment',
      'accessList'
    ])
  },
  methods: {
    ...mapActions([
      'updateAssignmentDetail',
      'fetchAssignmentDetail',
      'downloadCourseMaterial',
      'uploadMaterial'
    ]),
    initPage () {
      this.fetchAssignmentDetail({
        data: {
          id: this.$route.params.assignmentId,
          batchCode: this.$route.params.batchCode
        },
        callback: this.successFetchingAssignmentDetail,
        fail: this.failFetchingAssignmentDetail
      })
    },
    successFetchingAssignmentDetail () {
      this.assignmentDetail = { ...this.assignment }
      this.assignmentDetail.deadline = new Date(this.assignmentDetail.deadline)
      this.displayedDates.start = this.assignmentDetail.deadline
      this.displayedDates.end = this.assignmentDetail.deadline
      this.filePreviewName = this.assignmentDetail.file || ''
    },
    failFetchingAssignmentDetail () {
      this.$toasted.error('Something went wrong')
      this.$router.push({name: 'assignments'})
    },
    editAssignment () {
      this.editMode = !this.editMode
      this.displayedDates.start = this.assignmentDetail.deadline < new Date() ? this.assignmentDetail.deadline : new Date()
      this.displayedDates.end = null
    },
    cancel () {
      this.successFetchingAssignmentDetail()
      this.editMode = !this.editMode
    },
    saveAssignment () {
      let payload = {
        title: this.assignmentDetail.title,
        description: this.assignmentDetail.description,
        deadline: this.assignmentDetail.deadline,
        files: this.assignmentDetail.file
      }
      payload.deadline = new Date(payload.deadline).getTime()
      this.updateAssignmentDetail({
        payload,
        data: {
          batchCode: this.$route.params.batchCode,
          id: this.$route.params.assignmentId
        },
        callback: this.successUpdatingAssignment,
        fail: this.failUpdatingAssignment
      })
    },
    successUpdatingAssignment () {
      this.$toasted.success('Succeed updating assignment')
      this.editMode = !this.editMode
      this.displayedDates.start = this.assignmentDetail.deadline
      this.displayedDates.end = this.assignmentDetail.deadline
    },
    failUpdatingAssignment () {
      this.$toasted.error('Something went wrong, please try again')
    },
    goToRoomList () {
      this.$router.push({
        name: 'assignmentRooms',
        params: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.assignmentDetail.id
        }
      })
    },
    onFileChange (e) {
      this.file = e.target.files[0]
      this.materialUpload(this.file)
    },
    materialUpload (file) {
      this.uploadingFile = true
      let formData = new FormData()
      formData.append('file', file)
      let data = {
        source: 'ASSIGNMENT',
        resources: formData
      }
      data = { ...data }
      let configuration = { headers: { 'Content-Type': 'multipart/form-data' } }
      this.uploadMaterial({
        data,
        configuration,
        callback: this.successUploadMaterial,
        fail: this.failUploadMaterial
      })
    },
    successUploadMaterial (response) {
      this.uploadingFile = false
      this.assignmentDetail.file = [ response.id ]
      this.filePreviewName = this.file.name
    },
    failUploadMaterial () {
      this.uploadingFile = false
      this.filePreviewName = 'Fail to upload material, please try again'
      this.$toasted.error('Fail to upload material, please try again')
    }
  }
}
