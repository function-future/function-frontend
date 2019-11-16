import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseTextArea from '@/components/BaseTextArea'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'QuestionBankQuestionDetail',
  components: {
    BaseCard,
    BaseButton,
    BaseTextArea,
    BaseInput
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
      'updateQuestion'
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
      this.$toasted.error('Something went wrong')
    },
    actionButtonClicked () {
      if (this.editMode) {
        this.question.options.find((option, index) => {if (option.correct) delete this.questionDetail.options[index].correct })
        this.submittedQuestion = JSON.parse(JSON.stringify(this.questionDetail))
        this.submittedQuestion.options[this.selectedAnswer].correct = true
        this.updateQuestion({
          payload: {...this.submittedQuestion},
          data: {
            bankId: this.$route.params.bankId,
            questionId: this.$route.params.questionId
          },
          callback: this.successUpdatingQuestion,
          fail: this.failUpdatingQuestion
        })
      }
      this.editMode = !this.editMode
    },
    successUpdatingQuestion () {
      this.$toasted.success(`Success updating question ${this.$route.params.questionId}`)
      this.$router.push({
        name: 'questionBankQuestionList',
        params: {
          bankId: this.$route.params.bankId
        }
      })
    },
    failUpdatingQuestion () {
      this.$toasted.error('Something went wrong')
    },
    cancelButtonClicked () {
      if (this.editMode) {
        this.initPage()
        this.selectedAnswer = ''
        this.editMode = !this.editMode
        return
      }
      this.$router.push({
        name: 'questionBankQuestionList',
        params: {
          bankId: this.$route.params.bankId
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
    deleteQuestion () {

    }
  }
}
