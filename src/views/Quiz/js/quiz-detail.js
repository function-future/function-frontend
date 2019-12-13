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
      'accessList'
    ]),
    descriptionCompiledMarkdown: function () {
      return marked(this.quizDetail.description)
    }
  },
  methods: {
    ...mapActions([
      'fetchQuizById',
      'updateQuizDetail',
      'deleteQuizById'
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
      this.$toasted.error('Something went wrong')
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
      this.$toasted.success('Successfully deleted this quiz')
    },
    failedDeletingQuiz () {
      this.$toasted.error('Something went wrong')
    }
  }
}
