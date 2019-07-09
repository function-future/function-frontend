import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseTextArea from '@/components/BaseTextArea'
import BaseInput from '@/components/BaseInput'

export default {
  name: 'QuizDetail',
  components: {
    BaseButton,
    BaseCard,
    BaseTextArea,
    BaseInput
  },
  data () {
    return {
      editMode: false,
      quizDetail: {
        title: '',
        description: '',
        endDate: new Date(),
        timeLimit: 0,
        trials: 0,
        batchCode: '',
        questionCount: 0
      }
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'quiz'
    ]),
    isCalendarDisabled () {
      return this.editMode ? { placement: 'bottom', visibility: 'click' } : {visibility: null}
    },
    cancelButtonText () {
      return this.editMode ? 'Cancel' : 'Return'
    },
    actionButtonText () {
      return this.editMode ? 'Save' : 'Edit'
    }
  },
  methods: {
    ...mapActions([
      'fetchQuizById',
      'updateQuizDetail'
    ]),
    initPage () {
      this.fetchQuizById({
        data: {
          batchCode: this.$route.query.batchCode,
          id: this.$route.params.quizId
        },
        callback: this.successFetchingQuizById,
        fail: this.failFetchingQuizById
      })
    },
    successFetchingQuizById () {
      this.quizDetail = { ...this.quiz }
      this.quizDetail.endDate = new Date(this.quizDetail.endDate)
      this.quizDetail.timeLimit = Math.floor(this.quizDetail.timeLimit / 60)
    },
    failFetchingQuizById () {
      this.$toasted.error('Something went wrong')
    },
    actionButtonClicked () {
      if (this.editMode) {
        this.quizDetail.endDate = new Date(this.quizDetail.endDate).getTime()
        this.updateQuizDetail({
          payload: this.quizDetail,
          data: {
            batchCode: this.quizDetail.batchCode,
            id: this.$route.params.quizId
          },
          callback: this.successUpdatingQuiz,
          fail: this.failUpdatingQuiz
        })
      }
      this.editMode = !this.editMode
    },
    returnButtonClicked () {
      if (this.editMode) {
        this.initPage()
        this.editMode = !this.editMode
        return
      }
      this.$router.push({name: 'quizzes'})
    },
    successUpdatingQuiz () {
      this.$toasted.success(`Quiz ${this.$route.params.quizId} successfully updated`)
    },
    failUpdatingQuiz () {
      this.$toasted.error('Something went wrong')
    }
  }
}
