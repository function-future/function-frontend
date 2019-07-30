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
      editMode: false
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
    },
    failFetchingQuestionDetail () {
      this.$toasted.error('Something went wrong')
    },
    actionButtonClicked () {
      if (this.editMode) {
        const selectedIndex = document.querySelector('input[name="correct-answer"]:checked').value
        let defaultIndex
        this.question.options.find((option, index) => {if (option.correct) defaultIndex = index })
        delete this.questionDetail.options[defaultIndex].correct
        this.submittedQuestion = JSON.parse(JSON.stringify(this.questionDetail))
        this.submittedQuestion.options[selectedIndex].correct = true
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
        document.location.reload()
        // TODO: Fix this pls, find a way to reload radio button that doesnt reload the page
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
