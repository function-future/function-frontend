import { mapActions, mapGetters } from 'vuex'
import BaseInput from '@/components/BaseInput'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'JudgingDetail',
  components: {
    BaseInput,
    BaseCard,
    BaseButton,
    BaseTextArea
  },
  data () {
    return {
      judgingDetail: {
        name: '',
        description: '',
        students: []
      },
      selectedStudents: [],
      isLoading: true,
      editMode: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'judging',
      'students'
    ]),
    // selectedStudent () {
    //   let chosen = []
    //   this.judgingDetail.studentIds.forEach((item, index) => {
    //     this.students.find((student) => {
    //       console.log(student)
    //     })
    //   })
    // }
  },
  methods: {
    ...mapActions([
      'fetchJudgingDetail',
      'updateJudging',
      'fetchUsersByRole',
      'setStudentList'
    ]),
    initPage () {
      this.fetchJudgingDetail({
        data: {
          batchCode: this.$route.params.batchCode,
          judgingId: this.$route.params.judgingId
        },
        callback: this.successFetchingJudgingDetail,
        fail: this.failedFetchingJudgingDetail
      })
    },
    successFetchingJudgingDetail () {
      this.fetchUsersByRole({
        data: {
          page: 1,
          size: 10,
          role: 'STUDENT',
        },
        callback: this.successFetchingUsersByRole,
        fail: this.failedFetchingUsersByRole
      })
      this.judgingDetail = { ...this.judging }
    },
    successFetchingUsersByRole (response) {
      this.setStudentList({ data: response.data })
      this.judging.studentIds.forEach((item) => {
        this.selectedStudents.push(this.students.find((student) => student.id === item))
      })
      this.isLoading = false
    },
    failedFetchingUsersByRole (err) {
      console.log(err)
    },
    failedFetchingJudgingDetail () {
      this.$toasted.error('Something went wrong')
    },
    goToComparison () {
      this.$router.push({
        name: 'comparison',
        params: {
          judgingId: this.$route.params.judgingId
        }
      })
    }
  }
}
