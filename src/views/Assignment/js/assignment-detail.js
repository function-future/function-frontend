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
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'assignment'
    ])
  },
  methods: {
    ...mapActions([
      'createAssignment',
      'fetchAssignmentDetail'
    ]),
    initPage () {
      this.fetchAssignmentDetail({
        data: {
          id: this.$route.params.id,
          batchCode: 3
        },
        callback: this.successFetchingAssignmentDetail,
        fail: this.failFetchingAssignmentDetail
      })
    // TODO Unit test this, add more functionalities to VUE file, add editMode
    // TODO Move mockApi, and controller, and store(?) to their own directory
    },
    successFetchingAssignmentDetail () {
      this.assignmentDetail = { ...this.assignment }
    },
    failFetchingAssignmentDetail () {
      this.$toasted.error('Something went wrong')
      this.$router.push({name: 'assignments'})
    },
    editAssignment () {
      this.editMode = !this.editMode
    },
    cancel () {

    },
    saveASsignment () {

    },
  }
}
