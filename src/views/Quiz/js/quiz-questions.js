import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import QuizModal from '@/components/modals/QuizModal'

export default {
  name: 'QuizQuestions',
  components: {
    BaseCard,
    BaseButton,
    QuizModal
  },
  data () {
    return {
      currentNumber: '',
      selectedAnswer: '',
      answers: [],
      isLoading: true,
      result: '',
      showPointModal: false,
      trialsLeft: 0
    }
  },
  created () {
    this.initPage()
  },
  mounted () {
    window.addEventListener('beforeunload', this.reloadHandler)
  },
  beforeDestroy () {
    window.removeEventListener('beforeunload', this.reloadHandler)
  },
  beforeRouteLeave (to, from, next) {
    if (confirm('Changes you made may not be saved.'))
      next()
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
          studentId: this.currentUser.id,
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
    successSubmitStudentQuiz (response) {
      this.result = response.data.point
      this.trialsLeft = response.data.trials
      this.showPointModal = true
    },
    failedSubmitStudentQuiz () {
      this.$toasted.error('Something went wrong')
    },
    highlightedOption (option) {
      return this.answers.includes(option) ? 'active' : ''
    },
    restart () {
      this.currentNumber = ''
      this.selectedAnswer = ''
      this.answers = []
      this.isLoading = true
      this.result = ''
      this.showPointModal = false
      this.initPage()
    },
    finish () {
      this.$router.push({
        name: 'studentQuizzes',
        params: {
          studentId: this.currentUser.id,
          page: 1,
          pageSize: 10
        }
      })
    },
    reloadHandler (event) {
      event.returnValue = 'Page reload'
      return null
    }
  }
}
