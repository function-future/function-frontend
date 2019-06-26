import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'QuestionBankDetail',
  components: {
    BaseInput,
    BaseTextArea,
    BaseButton
  },
  data () {
    return {
      questionBankDetail: {
        title: '',
        description: ''
      },
      editMode: false
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'questionBank'
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
      'updateQuestionBank',
      'fetchQuestionBankDetail'
    ]),
    initPage () {
      this.fetchQuestionBankDetail({
        data: {
          bankId: this.$route.params.bankId
        },
        callback: this.successFetchingQuestionBankDetail,
        fail: this.failFetchingQuestionBankDetail
      })
    },
    successFetchingQuestionBankDetail () {
      this.questionBankDetail = {...this.questionBank}
    },
    failFetchingQuestionBankDetail () {
      this.$toasted.error('Something went wrong')
    },
    cancelButtonClicked () {
      if (this.editMode) {
        this.initPage()
        this.editMode = !this.editMode
        return
      }
      this.$router.push({
        name: 'questionBanks'
      })
    },
    actionButtonClicked () {
      if (this.editMode) {
        this.updateQuestionBank({
          data: {
            bankId: this.$route.params.bankId
          },
          payload: {...this.questionBankDetail},
          callback: this.successUpdatingQuestionBank,
          fail: this.failUpdatingQuestionBank
        })
      }
      this.editMode = !this.editMode
    },
    successUpdatingQuestionBank () {
      this.$toasted.success(`Success updating question bank ${this.$route.params.bankId}`)
      this.$router.push({
        name: 'questionBanks'
      })
    },
    failUpdatingQuestionBank () {
      this.$toasted.error('Something went wrong')
    }
  }
}
