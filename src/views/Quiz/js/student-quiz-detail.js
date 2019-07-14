import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import BaseInput from '@/components/BaseInput'

export default {
  name: 'StudentQuizDetail',
  components: {
    BaseButton,
    BaseCard,
    BaseTextArea,
    BaseInput
  },
  data () {
    return {
      editMode: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'studentQuizDetail',
      'currentUser'
    ]),
  },
  methods: {
    ...mapActions([
      'fetchStudentQuizDetail'
    ]),
    initPage () {
      this.fetchStudentQuizDetail({
        data: {
          studentId: 'sample-id',
          quizId: this.$route.params.quizId
        },
        callback: this.successFetchingStudentQuizDetail,
        fail: this.failFetchingStudentQuizDetail
      })
    },
    successFetchingStudentQuizDetail () {},
    failFetchingStudentQuizDetail () {
      this.$toasted.error('Something went wrong')
    },
    actionButtonClicked () {
      this.$router.push({
        name: 'studentQuizQuestions',
        params: {
          studentId: 'sample-id',
          quizId: this.$route.params.quizId
        }
      })
    },
    returnButtonClicked () {
      this.$router.push({
        name: 'studentQuizzes',
        params: {
          studentId: this.currentUser.id
        }
      })
    }
  }
}
