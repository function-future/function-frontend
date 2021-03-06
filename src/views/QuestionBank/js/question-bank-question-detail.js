import { mapActions, mapGetters } from 'vuex'
const ModalDeleteConfirmation = () => import('@/components/modals/ModalDeleteConfirmation')

export default {
  name: 'QuestionBankQuestionDetail',
  components: {
    ModalDeleteConfirmation
  },
  data () {
    return {
      selectedAnswer: '',
      questionDetail: {
        label: '',
        options: [
          {
            label: ''
          },
          {
            label: ''
          },
          {
            label: ''
          },
          {
            label: ''
          }
        ]
      },
      submittedQuestion: {},
      editMode: false,
      showDeleteConfirmationModal: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'question',
      'accessList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchQuestionDetail',
      'deleteQuestionById',
      'toast'
    ]),
    initPage () {
      this.fetchQuestionDetail({
        data: {
          bankId: this.$route.params.bankId,
          questionId: this.$route.params.questionId
        },
        callback: this.successFetchingQuestionDetail,
        fail: this.failFetchingQuestionDetail
      })
    },
    successFetchingQuestionDetail () {
      this.questionDetail = {...this.question}
      this.questionDetail.options.forEach((item, idx) => {
        if (item.correct) {
          this.selectedAnswer = idx
        }
      })
    },
    failFetchingQuestionDetail () {
      this.toast({
        data: {
          message: 'Fail to load question',
          type: 'is-danger'
        }
      })
    },
    header (idx) {
      switch (idx) {
        case 0:
          return 'Option A'
        case 1:
          return 'Option B'
        case 2:
          return 'Option C'
        case 3:
          return 'Option D'
      }
    },
    redirectToEditPage () {
      this.$router.push({
        name: 'editQuestion',
        params: {
          bankId: this.$route.params.bankId,
          questionId: this.$route.params.questionId
        }
      })
    },
    deleteQuestion () {
      this.deleteQuestionById({
        data: {
          bankId: this.$route.params.bankId,
          id: this.$route.params.questionId
        },
        callback: this.successDeletingQuestion,
        fail: this.failedDeletingQuestion
      })
    },
    successDeletingQuestion () {
      this.toast({
        data: {
          message: 'Successfully deleted question',
          type: 'is-success'
        }
      })
      this.$router.push({
        name: 'questionBankDetail',
        params: {
          bankId: this.$route.params.bankId
        }
      })
    },
    failedDeletingQuestion () {
      this.toast({
        data: {
          message: 'Fail to delete question',
          type: 'is-danger'
        }
      })
      this.showDeleteConfirmationModal = false
    }
  }
}
