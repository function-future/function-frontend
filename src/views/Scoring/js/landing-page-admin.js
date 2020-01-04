import { mapGetters, mapActions } from 'vuex'
import ListItem from '@/components/list/ListItem'
import EmptyState from '@/components/emptyState/EmptyState'
import ModalSelectBatch  from "@/components/modals/ModalSelectBatch"
import ModalDeleteConfirmation from "@/components/modals/ModalDeleteConfirmation"
import ModalCopy from '@/components/modals/ModalCopy'
import InfiniteLoading from 'vue-infinite-loading'
let marked = require('marked')
export default {
  name: 'LandingPageAdmin',
  components: {
    ListItem,
    EmptyState,
    InfiniteLoading,
    ModalSelectBatch,
    ModalDeleteConfirmation,
    ModalCopy
  },
  data () {
    return {
      tabs: [
        { type: 'questionBanks', title: 'Question Banks', visible: false },
        { type: 'quizzes', title: 'Quizzes', visible: true },
        { type: 'assignments', title: 'Assignments', visible: true }
      ],
      selectedTab: 0,
      isLoading: false,
      failLoadItem: false,
      isVisibleDeleteModal: false,
      isVisibleCopyModal: false,
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      },
      items: [],
      selectedId:'',
      state: '',
      batches: [],
      batchCode: '',
      infiniteId: +new Date(),
      isPassedDeadline: false
    }
  },
  created () {
    this.checkCurrentUser()
    this.setQuery()
  },
    computed: {
    ...mapGetters([
      'accessList',
      'currentUser'
    ]),
    currentTabType () {
      return this.$route.query.tab
    },
    tabTitle() {
      switch (this.currentTabType) {
        case 'questionBanks':
          return 'Question Bank'
        case 'quizzes':
          return 'Quiz'
        case 'assignments':
          return 'Assignment'
      }
    },
    batchButtonText() {
      return this.batchCode || 'Select Batch'
    },
    loggedInRole() {
      return this.currentUser && this.currentUser.role
    },
    visibleBatchSelection() {
      return this.currentUser.role !== 'STUDENT' && this.currentTabType !== 'questionBanks'
    },
    listEmpty() {
      return !(this.items && this.items.length)
    },
    emptyStateSrc() {
      switch (this.currentTabType) {
        case 'questionBanks':
          return 'question-bank'
        case 'quizzes':
          return 'quiz'
        case 'assignments':
          return 'assignment'
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchQuestionBankList',
      'fetchQuizList',
      'fetchAssignmentList',
      'fetchBatches',
      'copyQuiz',
      'copyAssignment',
      'deleteQuestionBankById',
      'deleteQuizById',
      'deleteAssignmentById',
      'toast'
    ]),
    checkCurrentUser () {
      if (this.loggedInRole === 'ADMIN') {
        this.tabs[0].visible = true
      }
      else if (this.loggedInRole === 'STUDENT') {
        this.tabs.splice(0, 1)
        this.batchCode = this.currentUser.batchCode
      }
      else if (this.loggedInRole === 'JUDGE' || this.loggedInRole === 'MENTOR') {
        this.tabs.splice(0, 2)
      }
      this.selectedTab = this.tabs.findIndex(i => i.type === this.currentTabType)
    },
    setQuery () {
      if (this.selectedTab < 0 || this.selectedTab > this.tabs.length) this.selectedTab = 0
      if (this.tabs[this.selectedTab].type === this.currentTabType) return
      this.$router.replace({
        query: { tab: this.tabs[this.selectedTab].type }
      })
    },
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
      this.isLoading = true
      if (!!this.currentTabType) {
        switch (this.currentTabType) {
          case 'questionBanks':
            this.getQuestionBanks($state)
            break
          default:
            this.getBatchList($state)
            break
        }
      }
    },
    getBatchList ($state) {
      this.state = $state
      this.fetchBatches({
        callback: this.successFetchBatches,
        fail: this.failFetchBatches
      })
    },
    successFetchBatches (response) {
      if (!!this.batchCode) {
        this.currentTabType === 'quizzes' ? this.getQuizzes() : this.getAssignments()
        return
      }
      this.batches = response
      if (this.batches.length) {
        this.batchCode = response[0].code
      }
      else {
        this.batchCode = 'No batch found'
      }
    },
    failFetchBatches () {
      this.toast({
        data: {
          message: 'Fail to load batch list, please refresh the page',
          type: 'is-danger'
        }
      })
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
    getQuizzes() {
      this.fetchQuizList({
        data: {
          isPassedDeadline: this.isPassedDeadline,
          batchCode: this.batchCode,
          page: this.paging.page,
          pageSize: this.paging.size
        },
        callback: this.successFetchingListData,
        fail: this.failFetchingListData
      })
    },
    getAssignments() {
      this.fetchAssignmentList({
        data: {
          isPassedDeadline: this.isPassedDeadline,
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
      this.isLoading = false
      if (response.length) {
        this.items.push(...response)
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failFetchingQuestionBankList() {
      this.failLoadItem = true
      this.isLoading = false
      this.toast({
        data: {
          message: 'Fail to load question banks',
          type: 'is-danger'
        }
      })
      this.state.complete()
    },
    failFetchingListData () {
      this.failLoadItem = false
      this.toast({
        data: {
          message: 'Fail to load ' + this.tabTitle,
          type: 'is-danger'
        }
      })
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
      switch (this.currentTabType) {
        case 'questionBanks':
          this.$router.push({
            name: 'questionBankDetail',
            params: {
              bankId: id
            }
          })
          break
        case 'quizzes':
          this.$router.push({
            name: 'editQuiz',
            params: {
              quizId: id,
              batchCode: this.batchCode
            }
          })
          break
        case 'assignments':
          this.$router.push({
            name: 'assignmentDetail',
            params: {
              assignmentId: id,
              batchCode: this.batchCode
            }
          })
          break
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
      switch (this.currentTabType) {
        case 'questionBanks':
          this.deleteQuestionBank()
          break
        case 'quizzes':
          this.deleteQuiz()
          break
        case 'assignments':
          this.deleteAssignment()
          break
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
      this.toast({
        data: {
          message: 'Successfully deleted ' + this.tabTitle,
          type: 'is-success'
        }
      })
      this.closeDeleteConfirmationModal()
      this.resetData()
    },
    failDeletingItem () {
      this.toast({
        data: {
          message: 'Fail to delete ' + this.tabTitle,
          type: 'is-danger'
        }
      })
    },
    goToItemDetail(id) {
      switch (this.currentTabType) {
        case 'questionBanks':
          this.$router.push({
            name: 'questionBankDetail',
            params: {
              bankId: id
            }
          })
          break
        case 'quizzes':
          this.$router.push({
            name: 'quizDetail',
            params: {
              quizId: id,
              batchCode: this.batchCode
            }
          })
          break
        case 'assignments':
          this.$router.push({
            name: 'assignmentDetail',
            params: {
              assignmentId: id,
              batchCode: this.batchCode
            }
          })
          break
      }
    },
    selectBatch (code) {
      this.batchCode = code
      this.isVisibleBatchModal = false
    },
    closeModal () {
      this.isVisibleBatchModal = false
    },
    addItem() {
      switch (this.currentTabType) {
        case 'questionBanks':
          this.goToAddQuestionBank()
          break
        case 'quizzes':
          this.goToAddQuiz()
          break
        case 'assignments':
          this.goToAddAssignment()
          break
      }
    },
    goToAddQuestionBank() {
      this.$router.push({
        name: 'addQuestionBank'
      })
    },
    goToAddQuiz() {
      this.$router.push({
        name: 'addQuiz',
        params: {
          batchCode: this.batchCode
        }
      })
    },
    goToAddAssignment() {
      this.$router.push({
        name: 'addAssignment',
        params: {
          batchCode: this.batchCode
        }
      })
    },
    showCopyModal(id) {
      this.selectedId = id
      this.isVisibleCopyModal = true
    },
    copyItem(batchDestination) {
      if (this.currentTabType === 'quizzes') {
        this.copyQuiz({
          data: {
            batchCode: this.batchCode
          },
          payload: {
            batchCode: batchDestination,
            quizId: this.selectedId
          },
          callback: this.successCopyItem,
          fail: this.failCopyItem
        })
        return
      }
      this.copyAssignment({
        data: {
          batchCode: this.batchCode
        },
        payload: {
          batchCode: batchDestination,
          assignmentId: this.selectedId
        },
        callback: this.successCopyItem,
        fail: this.failCopyItem
      })
    },
    successCopyItem() {
      this.toast({
        data: {
          message: 'Successfully copied this ' + this.tabTitle,
          type: 'is-success'
        }
      })
      this.isVisibleCopyModal = false
    },
    failCopyItem() {
      this.toast({
        data: {
          message: 'Fail to copy this ' + this.tabTitle,
          type: 'is-danger'
        }
      })
      this.isVisibleCopyModal = false
    }
  },
  watch: {
    selectedTab() {
      this.setQuery()
    },
    currentTabType() {
      this.resetData()
    },
    batchCode() {
      this.resetData()
    },
    isPassedDeadline() {
      this.resetData()
    }
  }
}
