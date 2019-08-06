import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
import BasePagination from '@/components/BasePagination'
let marked = require('marked')

export default {
  name: 'StudentAssignment',
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    BaseSelect,
    BasePagination
  },
  data () {
    return {
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      }
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'studentAssignments',
      'currentUser'
    ])
  },
  methods: {
    ...mapActions([
      'fetchStudentAssignmentList'
    ]),
    initPage () {
      this.fetchStudentAssignmentList({
        data: {
          batchCode: 'future3',
          assignmentId: 'asg',
          studentId: this.currentUser.id,
          page: this.paging.page,
          size: this.paging.size
        },
        callback: this.successFetchingAssignmentList,
        fail: this.failFetchingAssignmentList
      })
    },
    successFetchingAssignmentList (paging) {
      this.paging = paging
    },
    failFetchingAssignmentList () {
      this.$toasted.error('Something went wrong')
    },
    isComplete(deadline) {
      return deadline < new Date() ? 'Done' : 'Ongoing'
    },
    goToRoomDetail (room) {
      this.$router.push({
        name: 'assignmentRoomDetail',
        params: {
          batchCode: room.assignment.batchCode,
          assignmentId: room.assignment.id,
          roomId: room.id
        },
      })
    },
    loadPage (page) {
      this.paging.page = page
      this.initPage()
    },
    loadPreviousPage () {
      this.paging.page = this.paging.page - 1
      this.initPage()
    },
    loadNextPage () {
      this.paging.page = this.paging.page + 1
      this.initPage()
    },
    descriptionCompiledMarkdown: function (description) {
      return marked(description)
    }
  }
}
