import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'
import BaseSelect from '@/components/BaseSelect'
export default {
  name: 'AddQuiz',
  components: {
    BaseCard,
    BaseButton,
    BaseInput,
    BaseSelect
  },
  data () {
    return {
      questionBankList: []
    }
  },
  mounted () {
    const container = document.querySelector('.scrollable-container')
    container.addEventListener('scroll', e => {
      if (Math.ceil(container.scrollTop + container.clientHeight) >= container.scrollHeight) {
        this.initPage()
      }
    })
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
        callback: this.successFetchingQuestionBankList,
        fail: this.failFetchingQuestionBankList
      })
    },
    successFetchingQuestionBankList () {
      this.questionBankList = [
        ...this.questionBankList,
        ...this.questionBanks
      ]
      console.log(this.questionBankList)
    },
    failFetchingQuestionBankList () {
      this.$toasted.error('Something went wrong')
    }
  }
}
