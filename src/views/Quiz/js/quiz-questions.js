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
      isSubmitting: false,
      quizDetail: {
        timeLimit: 1
      }
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
      'fetchStudentQuizTimeLimit',
      'submitAnswers',
      'toast'
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
    getTimeLimit () {
      this.fetchStudentQuizTimeLimit({
        data: {
          batchCode: this.currentUser.batchCode,
          quizId: this.$route.params.quizId
        },
        callback: this.successFetchingTimeLimit,
        fail: this.failedFetchingTimeLimit
      })
    },
    successFetchingTimeLimit (response) {
      this.quizDetail.timeLimit = response
      this.isLoading = false
    },
    failedFetchingTimeLimit () {
      this.toast({
        data: {
          message: 'Failed to start quiz',
          type: 'is-error'
        }
      })
      this.$router.push({
        name: 'quizDetail',
        params: {
          quizId: this.quizDetail.id,
          batchCode: this.currentUser.batchCode
        }
      })
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
      this.quizDetail = { ...this.quiz }
      this.currentNumber = 0
      this.getTimeLimit()
    },
    failedFetchingStudentQuizQuestions () {
      this.toast({
        data: {
          message: 'Fail to load the questions, please try again',
          type: 'is-danger'
        }
      })
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
      this.toast({
        data: {
          message: 'Fail to submit your answers',
          type: 'is-danger'
        }
      })
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
      this.answers[index] = option
    },
  }
}
