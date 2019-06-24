import { mapActions, mapGetters } from 'vuex'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseTextArea from '@/components/BaseTextArea'

export default {
  name: 'AddQuestionBank',
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
      }
    }
  },
  methods: {
    ...mapActions([
      'createQuestionBank'
    ]),
    cancelButtonClicked () {
      this.$router.push({
        name: 'questionBanks',
        queries: {
          page: 0,
          pageSize: 10
        }
      })
    },
    saveButtonClicked () {
      this.createQuestionBank({
        payload: this.questionBankDetail,
        callback: this.successCreatingQuestionBank,
        fail: this.failCreatingQuestionBank
      })
    },
    successCreatingQuestionBank () {
      this.$toasted.success('Question bank created')
      this.$router.push({
        name: 'questionBanks',
        queries: {
          page: 0,
          pageSize: 10
        }
      })
    },
    failCreatingQuestionBank () {
      this.$toasted.error('Something went wrong')
    }
  }
}
