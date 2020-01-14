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
      showDeleteConfirmationModal: false
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
      this.fetchQuizById({
        data: {
          batchCode: this.$route.params.batchCode,
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
      this.fetchStudentQuizDetail({
        data: {
          batchCode: this.currentUser.batchCode,
          quizId: this.$route.params.quizId
        },
        callback: this.successFetchingStudentQuiz,
        fail: this.failedFetchingStudentQuiz
      })
    },
    successFetchingStudentQuiz () {
      this.$router.push({
        name: 'studentQuizQuestions',
        params: {
          quizId: this.$route.params.quizId
        }
      })
    },
    failedFetchingStudentQuiz () {
      this.toast({
        data: {
          message: 'Can\'t start quiz, please check your remaining trials',
          type: 'is-danger'
        }
      })
    }
  }
}
