import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'

export default {
  name: 'QuestionBanks',
  components: {
    BaseCard,
    BaseButton
  },
  data () {
    return {}
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'questionBanks'
    ])
  },
  methods: {
    ...mapActions([
      'fetchQuestionBankList'
    ]),
    initPage () {
      this.fetchQuestionBankList({
        data: {
          page: 0,
          pageSize: 10
        },
        fail: this.failFetchingQuestionBankList
      })
    },
    failFetchingQuestionBankList () {
      this.$toasted.error('Something went wrong')
    },
    addQuestionBank () {
      this.$router.push({name: 'addQuestionBank'})
    },
    // TODO: Make component for the above method
    goToQuestionBankDetail (id) {
      this.$router.push({
        name: 'questionBankQuestionList',
        params: {
          bankId: id
        }
      })
    }
    // TODO: Make component for the above method
  }
}
