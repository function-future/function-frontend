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
    return {}
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
    goToAssignmentDetail (id, batchCode) {
      this.$router.push({
        name: 'assignmentDetail',
        params: {
          id: id
        },
        query: {
          batchCode: batchCode
        }
      })
    }
  }
}
