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
      'fetchQuestionDetail'
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
        //Update Action
      }
      this.editMode = !this.editMode
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
