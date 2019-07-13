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
        batch: 'Batch 3',
        // file: ''
      },
      batches: [
        'Batch One',
        'Batch Second',
        'Batch 3'
      ],
      editMode: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'assignment'
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
          id: this.$route.params.id,
          batchCode: this.$route.query.batchCode
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
      this.assignmentDetail.deadline = new Date(this.assignmentDetail.deadline).getTime()
      this.updateAssignmentDetail({
        payload: this.assignmentDetail,
        data: {
          batchCode: this.$route.query.batchCode,
          id: this.$route.params.id
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
    }
  }
}
