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
      questionBankList: [],
      page: 1,
      selectedBank: []
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
    ...mapGetters('questionBanks', [
      'questionBanks'
    ])
  },
  methods: {
    ...mapActions('questionBanks', [
      'fetchQuestionBankList',
      'setSelectedBank'
    ]),
    initPage () {
      this.fetchQuestionBankList({
        data: {
          page: this.page,
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
      this.page++
    },
    failFetchingQuestionBankList () {
      this.$toasted.error('Something went wrong')
    },
    questionBankSelected (id) {
      const idx = this.selectedBank.indexOf(id)
      idx !== -1 ? this.selectedBank.splice(idx, 1) : this.selectedBank.push(id)
    },
    toggleAllBank () {
      this.selectedBank.length === this.questionBankList.length ? this.deselectAll() : this.selectAll()
    },
    deselectAll () {
      let items = document.getElementsByName('selected-banks')
      for (let i = items.length-1; i >= 0; i--) {
        if (this.selectedBank.indexOf(items[i].value !== -1)) {
          items[i].checked = false
          this.selectedBank.splice(i, 1)
        }
      }
    },
    selectAll () {
      let items = document.getElementsByName('selected-banks')
      for (let i = 0; i < items.length; i++) {
        if (!this.selectedBank.includes(items[i].value)) {
          items[i].checked = true
          this.selectedBank.push(items[i].value)
        }
      }
    },
    goToAddQuizDetail () {
      this.setSelectedBank({
        payload: this.selectedBank
      })
      this.$router.push({
        name: 'addQuizDetail'
      })
    }
  }
}
