import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
export default {
  name: 'Assignment',
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    BaseSelect
  },
  data () {
    return {
      filters: [
        'Batch 1',
        'Batch 2',
        'Batch 3'
      ],
      sorts: [
        'Title',
        'Deadline',
        'Upload Date'
      ],
      selectedFilter: '',
      selectedSort: '',
      searchValue: ''
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'assignmentList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchAssignmentList'
    ]),
    initPage () {
      this.fetchAssignmentList({
        data: {
          batchCode: 'futur3',
          page: 0,
          pageSize: 10
        },
        fail: this.failFetchingAssignmentList
      })
    },
    failFetchingAssignmentList () {
      this.$toasted.error('Something went wrong')
    },
    addAssignment () {
      this.$router.push({name: 'addAssignment'})
    },
    isComplete(deadline) {
      return deadline < new Date() ? 'Done' : 'Ongoing'
    },
    goToAssignmentDetail (id) {
      this.$router.push({
        name: 'assignmentDetail',
        params: {
          id: id
        }
      })
    }
  }
}
