import { mapActions, mapGetters } from 'vuex'
import UserListItem from '@/components/list/UserListItem'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'ReportPage',
  components: {
    UserListItem,
    InfiniteLoading
  },
  data () {
    return {
      studentList: [],
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
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
      'setStudentList',
      'toast'
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
      if (response.data.length) {
        this.studentList.push(...response.data)
        this.setStudentList({ data: response.data })
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
      console.log(this.studentList)
    },
    failedFetchingStudentList () {
      this.toast({
        data: {
          message: 'Fail to load student list',
          type: 'is-error'
        }
      })
    },
    batch (user) {
      return user.role === 'STUDENT' ? user.batch.name : ''
    }
  }
}
