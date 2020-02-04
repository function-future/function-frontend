import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
let marked = require('marked')

export default {
  name: 'QuizDetail',
  components: {
    ListItem,
    ModalDeleteConfirmation
  },
  data () {
    return {
      quizDetail: {
        title: '',
        description: '',
        endDate: new Date(),
        timeLimit: 0,
        trials: 0,
        questionCount: 0
      },
      showDeleteConfirmationModal: false,
      isMinutes: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'quiz',
      'accessList',
      'currentUser',
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.quizDetail.description)
    },
    trialsExist() {
      return !!this.quizDetail && !!this.quizDetail.trials
    }
  },
  methods: {
    ...mapActions([
      'fetchQuizById',
      'updateQuizDetail',
      'deleteQuizById',
      'fetchStudentQuizDetail',
      'toast'
    ]),
    initPage () {
      if (this.currentUser && this.currentUser.role === 'STUDENT')
        this.getStudentQuizDetail()
      else
        this.getAdminQuizDetail()
    },
    getStudentQuizDetail() {
      this.fetchStudentQuizDetail({
        data: {
          batchCode: this.currentUser.batchCode,
          quizId: this.$route.params.quizId
        },
        callback: this.successFetchingQuizById,
        fail: this.failFetchingQuizById
      })
    },
    getAdminQuizDetail() {
      this.fetchQuizById({
        data: {
          batchCode: this.$route.params.batchCode,
          id: this.$route.params.quizId
        },
        callback: this.successFetchingQuizById,
        fail: this.failFetchingQuizById
      })
    },
    successFetchingQuizById (response) {
      this.quizDetail = { ...response.quiz }
      this.quizDetail.endDate = new Date(this.quizDetail.endDate)
      if (this.quizDetail.timeLimit >= 60)
        this.quizDetail.timeLimit = Math.floor(this.quizDetail.timeLimit / 60)
      else this.isMinutes = true
      this.quizDetail.trials = response.trials
    },
    failFetchingQuizById () {
      this.toast({
        data: {
          message: 'Fail to load quiz',
          type: 'is-danger'
        }
      })
    },
    goToEditQuiz () {
      this.$router.push({
        name: 'editQuiz',
        params: {
          batchCode: this.$route.params.batchCode,
          id: this.$route.params.quizId
        }
      })
    },
    deleteThisQuiz () {
      this.deleteQuizById({
        data: {
          batchCode: this.$route.params.batchCode,
          id: this.$route.params.quizId
        },
        callback: this.successDeletingQuiz,
        fail: this.failedDeletingQuiz
      })
    },
    successDeletingQuiz () {
      this.$router.push({
        name: 'scoringAdmin'
      })
      this.toast({
        data: {
          message: 'Successfully deleted quiz',
          type: 'is-success'
        }
      })
    },
    failedDeletingQuiz () {
      this.toast({
        data: {
          message: 'Fail to delete quiz',
          type: 'is-danger'
        }
      })
    },
    goToStudentQuiz () {
      this.$router.push({
        name: 'studentQuizQuestions',
        params: {
          quizId: this.$route.params.quizId
        }
      })
    }
  }
}
