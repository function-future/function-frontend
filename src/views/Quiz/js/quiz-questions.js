import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'QuizQuestions',
  components: {
    BaseCard,
    BaseButton
  },
  data () {
    return {
      currentNumber: '',
      selectedAnswer: '',
      answers: [],
      isLoading: true
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'studentQuizQuestions',
      'currentUser'
    ])
  },
  methods: {
    ...mapActions([
      'fetchStudentQuizQuestions',
      'submitAnswers'
    ]),
    initPage () {
      this.fetchStudentQuizQuestions({
        data: {
          studentId: 'sample-id',
          quizId: this.$route.params.quizId
        },
        callback: this.successFetchingStudentQuizQuestions,
        fail: this.failedFetchingStudentQuizQuestions
      })
    },
    successFetchingStudentQuizQuestions () {
      this.currentNumber = 0
      this.isLoading = false
    },
    failedFetchingStudentQuizQuestions () {
      this.$toasted.error('Something went wrong')
    },
    viewQuestion (number) {
      this.currentNumber = number - 1
    },
    viewNextQuestion () {
      if (this.currentNumber !== this.studentQuizQuestions.length - 1) this.currentNumber++
    },
    viewPreviousQuestion () {
      if (this.currentNumber !== 0) this.currentNumber--
    },
    submitQuiz () {
      let payload = []
      this.studentQuizQuestions.forEach((item, idx) => {
        payload.push({
          number: idx + 1,
          optionId: this.answers[idx] ? this.answers[idx] : ''
        })
      })
      this.submitAnswers({
        data: {
          studentId: this.currentUser.id,
          quizId: this.$route.params.quizId
        },
        payload,
        callback: this.successSubmitStudentQuiz,
        fail: this.failedSubmitStudentQuiz
      })
    },
    successSubmitStudentQuiz () {
      this.$toasted.success('Quiz submitted')
      this.$router.push({
        name: 'studentQuizzes',
        params: {
          studentId: this.currentUser.id,
          page: 1,
          pageSize: 10
        }
      })
    },
    failedSubmitStudentQuiz () {
      this.$toasted.error('Something went wrong')
    },
    highlightedOption (option) {
      return this.answers.includes(option) ? 'active' : ''
    }
  }
}
