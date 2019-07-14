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
      questions: [],
      answers: []
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'studentQuizQuestions'
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
      this.questions = this.studentQuizQuestions
    },
    failedFetchingStudentQuizQuestions () {
      this.$toasted.error('Something went wrong')
    },
    selectOption (optionId) {
      this.answers[this.currentNumber] = {
        number: this.currentNumber + 1,
        optionId
      }
    },
  viewQuestion (number) {
      this.currentNumber = number - 1
  },
    viewNextQuestion () {
      if (this.currentNumber !== this.questions.length) this.currentNumber++
    },
    viewPreviousQuestion () {
      if (this.currentNumber !== 0) this.currentNumber--
    },
    submitQuiz () {
      this.submitAnswers({
        data: {
          studentId: 'sample-id',
          quizId: this.$route.params.quizId
        },
        payload: [ ...this.answers ],
        callback: this.successSubmitStudentQuiz,
        fail: this.failedSubmitStudentQuiz
      })
    },
    successSubmitStudentQuiz () {
      this.$toasted.success('Succeed')
    },
    failedSubmitStudentQuiz () {
      this.$toasted.error('Something went wrong')
    }
  }
}
