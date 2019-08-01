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
        id: '',
        title: '',
        description: '',
        deadline: null,
        // file: ''
      },
      editMode: false
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
      'fetchAssignmentDetail'
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
      this.displayedDates.end= this.assignmentDetail.deadline
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
      let payload = { ...this.assignmentDetail }
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
    }
  }
}
