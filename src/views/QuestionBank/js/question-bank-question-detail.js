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
      selectAnswerCardStyle: {
        'padding': '10px 20px',
        'margin': '10px 0'
      }
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'question'
    ]),
    cancelButtonText () {
      return this.editMode ? 'Cancel' : 'Return'
    },
    actionButtonText () {
      return this.editMode ? 'Save' : 'Edit'
    }
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
    }
  }
}
