import { mapActions, mapGetters } from 'vuex'
import Editor from '@/components/editor/Editor'

export default {
  name: 'AssignmentForm',
  components: {
    Editor
  },
  props: [
    'editMode'
  ],
  data () {
    return {
      assignmentDetail: {
        title: '',
        description: '',
        file: {},
        fileId: '',
        deadline: null
      },
      date: new Date(),
      minDate: new Date(),
      filePreviewName: ''
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
      'fetchAssignmentDetail',
      'updateAssignmentDetail',
      'createAssignment',
      'uploadMaterial'
    ]),
    initPage () {
      if (this.editMode) {
        this.getAssignmentDetail()
      }
    },
    getAssignmentDetail () {
      this.fetchAssignmentDetail({
        data: {
          id: this.$route.params.assignmentId,
          batchCode: this.$route.params.batchCode
        },
        callback: this.successFetchingAssignmentDetail,
        fail: this.failedFetchingAssignmentDetail
      })
    },
    successFetchingAssignmentDetail (response) {
      this.assignmentDetail = { ...response }
      if (this.assignmentDetail.file)
        this.filePreviewName = this.assignmentDetail.file.name
    },
    failedFetchingAssignmentDetail () {
      this.$toasted.error('Something went wrong')
      this.$router.go(-1)

    },
    onFileChange (e) {
      if (!e.target.files.length) return
      this.assignmentDetail.file = e.target.files[0]
      this.materialUpload(this.assignmentDetail.file)
    },
    materialUpload (file) {
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
      this.assignmentDetail.fileId = response.id
      this.filePreviewName = this.assignmentDetail.file.name
    },
    failUploadMaterial () {
      this.filePreviewName = 'Fail to upload file, please try again'
      this.$toasted.error('Fail to upload file, please try again')
    },
    cancel () {
      this.$router.go(-1)
    },
    saveAssignment () {
      if (this.editMode) {
        this.editAssignment()
      }
      else {
        this.addAssignment()
      }
    },
    editAssignment () {
      let payload = { ...this.assignmentDetail }
      payload.deadline = new Date(this.date).getTime()
      payload.files = [ this.assignmentDetail.fileId ] || []
      this.updateAssignmentDetail({
        data: {
          batchCode: this.$route.params.batchCode,
          id: this.$route.params.assignmentId
        },
        payload,
        callback: this.successUpdatingAssignment,
        fail: this.failedUpdatingAssignment
      })
    },
    successUpdatingAssignment () {
      this.$toasted.success('Successfully updated assignment')
      this.$router.push({
        name: 'assignmentDetail',
        params: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.$route.params.assignmentId
        }
      })
    },
    failedUpdatingAssignment () {
      this.$toasted.error('Something went wrong')
    },
    addAssignment () {
      let payload = { ...this.assignmentDetail }
      payload.deadline = new Date(this.date).getTime()
      payload.files = [ this.assignmentDetail.fileId ] || []
      this.createAssignment({
        data: {
          batchCode: this.$route.params.batchCode
        },
        payload,
        callback: this.successCreatingAssignment,
        fail: this.failedCreatingAssignment
      })
    },
    successCreatingAssignment () {
      this.$toasted.success('Successfully created assignment')
      this.$router.push({
        name: 'questionBanks'
      })
    },
    failedCreatingAssignment () {
      this.$toasted.error('Something went wrong')
    }
  }
}
