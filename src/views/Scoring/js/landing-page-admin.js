import { mapGetters, mapActions } from 'vuex'
import ListItem from "@/components/list/ListItem"
import ModalSelectBatch  from "@/components/modals/ModalSelectBatch"
import ModalDeleteConfirmation from "@/components/modals/ModalDeleteConfirmation"
import InfiniteLoading from 'vue-infinite-loading'
let marked = require('marked')
export default {
  name: 'LandingPageAdmin',
  components: {
    ListItem,
    InfiniteLoading,
    ModalSelectBatch,
    ModalDeleteConfirmation
  },
  data () {
    return {
      isLoading: false,
      isVisibleBatchModal: false,
      isVisibleDeleteModal: false,
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      },
      items: [],
      selectedTab: 0,
      selectedId:'',
      state: '',
      batchCode: 'futurre3',
      infiniteId: +new Date()
    }
  },
  computed: {
    ...mapGetters([
      'accessList'
    ]),
    batchButtonText() {
      return this.batchCode || 'Select Batch'
    },
    tabTitle() {
      return (this.selectedTab === 0) ? 'Question Bank' : (this.selectedTab === 1) ? 'Quiz' : 'Assignment'
    }
  },
  methods: {
    ...mapActions([
      'fetchQuestionBankList',
      'fetchQuizList',
      'fetchAssignmentList',
      'deleteQuestionBankById',
      'deleteQuizById',
      'deleteAssignmentById'
    ]),
    resetData() {
      this.paging = {
        page: 1,
        size: 10,
        totalRecords: 10
      }
      this.items = []
      this.state = ''
      this.infiniteId += 1
    },
    getListData($state) {
      if (this.selectedTab === 0) {
        this.getQuestionBanks($state)
      }
      else if (this.selectedTab === 1) {
        this.getQuizzes($state)
      }
      else {
        this.getAssignments($state)
      }
    },
    getQuestionBanks($state) {
      this.state = $state
      this.fetchQuestionBankList({
        data: {
          page: this.paging.page,
          pageSize: this.paging.size
        },
        callback: this.successFetchingListData,
        fail: this.failFetchingQuestionBankList
      })
    },
    getQuizzes($state) {
      this.state = $state
      this.fetchQuizList({
        data: {
          batchCode: this.batchCode,
          page: this.paging.page,
          pageSize: this.paging.size
        },
        callback: this.successFetchingListData,
        fail: this.failFetchingListData
      })
    },
    getAssignments($state) {
      this.state = $state
      this.fetchAssignmentList({
        data: {
          batchCode: this.batchCode,
          page: this.paging.page,
          pageSize: this.paging.size
        },
        callback: this.successFetchingListData,
        fail: this.failFetchingListData
      })
    },
    successFetchingListData (response, paging) {
      this.paging = paging
      if (response.length) {
        this.items.push(...response)
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failFetchingQuestionBankList() {
      this.$toasted.error('Something went wrong')
      this.state.complete()
    },
    failFetchingListData () {
      this.$toasted.error('Please select batch')
      this.state.complete()
    },
    textPreview(markdown) {
      return marked(this.showLimitedPreviewText(markdown.replace(/\!\[.*\]\(.*\)/,'')))
    },
    showLimitedPreviewText: function (text) {
      let maximumCharacters = 250
      if (text.length > maximumCharacters) {
        return text.slice(0, maximumCharacters) + '...'
      }
      return text
    },
    goToEditItem(id) {
      if (this.selectedTab === 0) {
        this.$router.push({
          name: 'questionBankDetail',
          params: {
            bankId: id
          }
        })
      }
      else if (this.selectedTab === 1) {
        this.$router.push({
          name: 'quizDetail',
          params: {
            quizId: id,
            batchCode: this.batchCode
          }
        })
      }
      else if (this.selectedTab === 2) {
        this.$router.push({
          name: 'assignmentDetail',
          params: {
            assignmentId: id,
            batchCode: this.batchCode
          }
        })
      }
    },
    openDeleteConfirmationModal (id) {
      this.isVisibleDeleteModal = true
      this.selectedId = id
    },
    closeDeleteConfirmationModal () {
      this.isVisibleDeleteModal = false
      this.selectedId = ''
    },
    deleteItem() {
      if (this.selectedTab === 0) {
        this.deleteQuestionBank()
      }
      else if (this.selectedTab === 1) {
        this.deleteQuiz()
      }
      else if (this.selectedTab === 2) {
        this.deleteAssignment()
      }
    },
    deleteQuestionBank() {
      this.deleteQuestionBankById({
        data: {
          id: this.selectedId
        },
        callback: this.successDeletingItem,
        fail: this.failDeletingItem
      })
    },
    deleteQuiz() {
      this.deleteQuizById({
        data: {
          batchCode: this.batchCode,
          id: this.selectedId
        },
        callback: this.successDeletingItem,
        fail: this.failDeletingItem
      })
    },
    deleteAssignment() {
      this.deleteAssignmentById({
        data: {
          batchCode: this.batchCode,
          id: this.selectedId
        },
        callback: this.successDeletingItem,
        fail: this.failDeletingItem
      })
    },
    successDeletingItem () {
      this.$toasted.success('Successfully deleted ' + this.tabTitle)
      this.closeDeleteConfirmationModal()
      this.resetData()
    },
    failDeletingItem () {
      this.$toasted.error('Something went wrong')
    },
    goToItemDetail(id) {
      if (this.selectedTab === 0) {
        this.$router.push({
          name: 'questionBankQuestionList',
          params: {
            bankId: id
          }
        })
      }
      else if (this.selectedTab === 1) {
        this.$router.push({
          name: 'quizDetail',
          params: {
            quizId: id,
            batchCode: this.batchCode
          }
        })
      }
      else {
        this.$router.push({
          name: 'assignmentDetail',
          params: {
            assignmentId: id,
            batchCode: this.batchCode
          }
        })
      }
    },
    selectBatch (code) {
      this.batchCode = code
      this.isVisibleBatchModal = false
    },
    closeModal () {
      this.isVisibleBatchModal = false
    }
  },
  watch: {
    selectedTab() {
      this.resetData()
    },
    batchCode() {
      this.resetData()
    }
  }
}
