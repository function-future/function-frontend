import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'modal-select-question-banks',
  components: {
    ListItem,
    InfiniteLoading
  },
  props: ['currentlySelected'],
  data () {
    return {
      questionBankList: [],
      selectedBank: [],
      selectedIds: [],
      paging: {
        page: 1,
        pageSize: 10,
        totalRecords: 0
      },
      state: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'questionBanks'
    ]),
    partialSelected () {
      return (this.selectedIds.length !== this.questionBankList.length) && this.selectedIds.length > 0
    },
    allSelected: {
      get() {
        return !!this.questionBankList.length ? this.selectedIds.length === this.questionBankList.length : false
      },
      set (value) {
        let temp = []
        if (!!value)
          temp = this.questionBankList.map(bank => bank.id)
        this.selectedIds = temp
      }
    }
  },
  created () {
    this.initialState()
  },
  methods: {
    ...mapActions([
      'fetchQuestionBankList',
      'setSelectedBank',
      'toast'
    ]),
    initialState () {
      this.selectedBank = [ ...this.currentlySelected ]
      this.selectedBank.forEach(bank => this.selectedIds.push(bank.id))
    },
    close () {
      this.$emit('close')
    },
    select (bankId) {
      if (this.selectedIds.find(value => value === bankId)) {
        this.selectedIds.splice(this.selectedIds.indexOf(bankId), 1)
      }
      else {
        this.selectedIds.push(bankId)
      }
    },
    selectBanks () {
      this.selectedBank = []
      this.selectedIds.forEach(id => {
        this.questionBankList.forEach(bank => {
          if (bank.id === id) {
            this.selectedBank.push(bank)
          }
        })
      })
      this.$emit('selected', this.selectedBank)
    },
    initQuestionBanks ($state) {
      this.isLoading = true
      this.state = $state
      let data = {
        page: this.paging.page,
        pageSize: this.paging.pageSize
      }
      this.fetchQuestionBankList({
        data,
        callback: this.successFetchingBankList,
        fail: this.failedFetchingBankList
      })
    },
    successFetchingBankList (response, paging) {
      this.paging = {
        page: paging.page,
        pageSize: paging.size
      }
      if (response.length) {
        this.setSelectedBank({ data: response })
        if (this.allSelected) {
          let temp = response.map(bank => bank.id)
          this.selectedIds = this.selectedIds.concat(temp)
        }
        this.questionBankList.push(...response)
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
      this.isLoading = false
    },
    failedFetchingBankList () {
      this.toast({
        data: {
          message: 'Fail to load question bank list',
          type: 'is-danger'
        }
      })
      this.isLoading = false
    }
  }
}
