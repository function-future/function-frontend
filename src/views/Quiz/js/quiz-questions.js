import { mapActions, mapGetters } from 'vuex'
import QuizModal from '@/components/modals/QuizModal'
import Timer from '@/components/quiz/Timer'
import ListItem from '@/components/list/ListItem'

export default {
  name: 'QuizQuestions',
  components: {
    QuizModal,
    Timer,
    ListItem
  },
  data () {
    return {
      currentNumber: 0,
      customNavigation: true,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      isStepsClickable: true,
      selectedAnswer: '',
      answers: [],
      isLoading: true,
      result: '',
      showPointModal: false,
      trialsLeft: 0,
      isSubmitting: false
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
    if (this.isSubmitting) {
      next()
      return
    }
    const answer = window.confirm('Changes you made may not be saved')
    if (!!answer)
      next()
    else next(false)
  },
  computed: {
    ...mapGetters([
      'quiz',
      'studentQuizQuestions',
      'currentUser'
    ])
  },
  methods: {
    ...mapActions([
      'fetchStudentQuizQuestions',
      'submitAnswers'
    ]),
    optionLabel (index) {
      switch (index) {
        case 0:
          return 'A'
        case 1:
          return 'B'
        case 2:
          return 'C'
        case 3:
          return 'D'
      }
    },
    initPage () {
      this.fetchStudentQuizQuestions({
        data: {
          batchCode: this.currentUser.batchCode,
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
      this.isSubmitting = true
      let payload = []
      this.studentQuizQuestions.forEach((item, idx) => {
        payload.push({
          number: idx + 1,
          optionId: this.answers[idx] ? this.answers[idx] : ''
        })
      })
      this.submitAnswers({
        data: {
          batchCode: this.currentUser.batchCode,
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
      this.$refs.timer.pause()
    },
    failedSubmitStudentQuiz () {
      this.isSubmitting = false
      this.$toasted.error('Something went wrong')
    },
    highlightedOption (option) {
      return this.answers.includes(option) ? 'active' : ''
    },
    restart () {
      this.$router.go()
    },
    finish () {
      this.$router.push({
        name: 'scoringAdmin'
      })
    },
    reloadHandler (event) {
      if (!this.isSubmitting) {
        event.returnValue = 'Page reload'
        return null
      }
    },
    select (option, index) {
      console.log(this.currentNumber)
      console.log(this.answers)
      console.log(option === this.answers[this.currentNumber])
      this.answers[index] = option
    },
  }
}
