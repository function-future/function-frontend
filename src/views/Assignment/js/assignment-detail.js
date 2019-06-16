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
      assignmentDetail: {
        title: '',
        description: '',
        deadline: new Date(),
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
    console.log(this.assignmentDetail.deadline)
    this.initPage()
    console.log(this.assignmentDetail.deadline)
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
      console.log(this.assignmentDetail.deadline)
      // TODO Unit test this, disable v-calendar on editMode = false, callback function is executed after initPage is finished so wrong data on initPage
    },
    successFetchingAssignmentDetail () {
      this.assignmentDetail = { ...this.assignment }
      this.assignmentDetail.deadline = new Date(this.assignmentDetail.deadline)
      alert()
      console.log(this.assignmentDetail.deadline)
    },
    failFetchingAssignmentDetail () {
      this.$toasted.error('Something went wrong')
      this.$router.push({name: 'assignments'})
    },
    editAssignment () {
      this.editMode = !this.editMode
    },
    cancel () {
      this.initPage()
      this.editMode = !this.editMode
    },
    saveAssignment () {
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
    },
    failUpdatingAssignment () {
      this.$toasted.error('Something went wrong, please try again')
    }
  }
}
