import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseTextArea from '@/components/BaseTextArea'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'


export default {
  name: 'QuestionBankAddQuestion',
  components: {
    BaseCard,
    BaseButton,
    BaseTextArea,
    BaseInput
  },
  data () {
    return {
      selectedAnswer: '',
      question: {
        text: '',
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
      submittedQuestion: {}
    }
  },
  methods: {
    ...mapActions([
      'createQuestion'
    ]),
    saveButtonClicked () {
      const index = document.querySelector('input[name="correct-answer"]:checked').value
      this.submittedQuestion = JSON.parse(JSON.stringify(this.question))
      this.submittedQuestion.options[index].correct = true
      this.createQuestion({
        payload: {...this.submittedQuestion},
        data: {
          bankId: this.$route.params.bankId
        },
        callback: this.successCreatingQuestion,
        fail: this.failCreatingQuestion
      })
    },
    successCreatingQuestion () {
      this.$toasted.success('Question added')
      this.$router.push({
        name: 'questionBankQuestionList',
        params: {
          bankId: this.$route.params.bankId
        }
      })
    },
    failCreatingQuestion () {
      this.$toasted.error('Something went wrong')
    },
    cancelButtonClicked () {
      this.$router.push({
        name: 'questionBankQuestionList',
        params: {
          bankId: this.$route.params.bankId
        }
      })
    }
  }
}
