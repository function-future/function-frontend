import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'QuestionBankAddQuestion',
  components: {
    BaseButton,
    BaseCard
  },
  data () {
    return {}
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'questionList'
    ])
  },
  methods: {
    ...mapActions([
      'fetchQuestionBankQuestionList'
    ]),
    initPage () {
      this.fetchQuestionBankQuestionList({
        data: {
          bankId: this.$route.params.bankId
        },
        fail: this.failFetchingQuestionBankQuestionList
      })
    },
    failFetchingQuestionBankQuestionList () {
      this.$toasted.error('Something went wrong')
    },
    redirectToAddQuestion () {
      this.$router.push({
        name: 'questionBankAddQuestion'
      })
    },
    redirectToQuestionDetail (id) {
      this.$router.push({
        name: 'questionBankQuestionDetail',
        params: {
          bankId: this.$route.params.bankId,
          questionId: id
        }
      })
    }
  }
}
