import { mapActions, mapGetters } from 'vuex'
import ReportCard from '@/components/users/ReportCard'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'ReportPage',
  components: {
    ReportCard,
    InfiniteLoading
  },
  data () {
    return {
      studentList: [],
      paging: {
        page: 1,
        size: 10,
        totalRecords: 20
      },
      state: ''
    }
  },
  created () {},
  computed: {
    ...mapGetters([
      'students'
    ])
  },
  methods: {
    ...mapActions([
      'getBatchReport',
      'setStudentList'
    ]),
    initStudents ($state) {
      this.state = $state
      let data = {
        page: this.paging.page,
        size: this.paging.size,
        batchCode: this.$route.params.batchCode
      }
      this.getBatchReport({
        data,
        callback: this.successFetchingStudentList,
        fail: this.failedFetchingStudentList
      })
    },
    successFetchingStudentList (response) {
      this.paging = response.paging
      this.studentList.push(...response.data)
      if (response.data.length) {
        this.setStudentList({ data: response.data })
        this.studentList.push(this.students)
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failedFetchingStudentList () {
      this.$toasted.error('Something went wrong')
    }
  }
}
