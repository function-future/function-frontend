import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import { mapActions, mapGetters } from 'vuex'
let marked = require('marked')

export default {
  name: 'AssignmentDetail',
  components: {
    ModalDeleteConfirmation
  },
  data () {
    return {
      dates: [],
      minDate: new Date(),
      assignmentDetail: {
        title: '',
        description: '',
        deadline: null,
        file: '',
        fileId: ''
      },
      uploadingFile: false,
      filePreviewName: '',
      file: {},
      showDeleteConfirmationModal: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'assignment',
      'accessList'
    ]),
    isFileIdNull: function () {
      return this.assignmentDetail.fileId ? this.assignmentDetail.fileId : ''
    },
    descriptionCompiledMarkdown: function () {
      return marked(this.assignmentDetail.description)
    }
  },
  methods: {
    ...mapActions([
      'fetchAssignmentDetail',
      'downloadCourseMaterial',
      'deleteAssignmentById',
      'toast'
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
      this.dates.push(new Date(this.assignmentDetail.uploadedDate))
      this.dates.push(new Date(this.assignmentDetail.deadline))
      this.assignmentDetail.fileId = this.isFileIdNull
      this.filePreviewName = this.isFileIdNull
    },
    failFetchingAssignmentDetail () {
      this.toast({
        data: {
          message: 'Fail to load assignment',
          type: 'is-danger'
        }
      })
      this.$router.push({name: 'assignments'})
    },
    deleteThis () {
      this.deleteAssignmentById({
        data: {
          batchCode: this.$route.params.batchCode,
          id: this.$route.params.assignmentId
        }
      })
    },
    goToEditAssignment () {
      this.$router.push({
        name: 'editAssignment',
        params: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.assignmentDetail.id
        }
      })
    },
    goToRoomList () {
      this.$router.push({
        name: 'assignmentRooms',
        params: {
          batchCode: this.$route.params.batchCode,
          assignmentId: this.assignmentDetail.id
        }
      })
    }
  }
}
