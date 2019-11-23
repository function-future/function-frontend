import { mapActions, mapGetters } from 'vuex'
import ListItem from '@/components/list/ListItem'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'QuestionBankDetail',
  components: {
    ListItem,
    ModalDeleteConfirmation,
    InfiniteLoading
  },
  data () {
    return {
      questionBankDetail: {
        title: '',
        description: ''
      },
      questions: [],
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      },
      editMode: false,
      showDeleteConfirmationModal: false,
      state: '',
      selectedId: '',
      infiniteId: +new Date()
    }
  },
  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'questionBank',
      'questionList',
      'accessList'
    ]),
    deleteModalMessage() {
      return !!this.selectedId ? 'Are you sure you want to delete this question?' : 'Are you sure you want to delete this question bank?'
    }
  },
  methods: {
    ...mapActions([
      'updateQuestionBank',
      'fetchQuestionBankDetail',
      'fetchQuestionBankQuestionList',
      'deleteQuestionBankById',
      'deleteQuestionById'
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
    getQuestionList($state) {
      this.state = $state
      this.fetchQuestionBankQuestionList({
        data: {
          bankId: this.$route.params.bankId,
          page: this.paging.page,
          size: this.paging.size
        },
        callback: this.successFetchingQuestionBankQuestionList,
        fail: this.failFetchingQuestionBankQuestionList
      })
    },
    successFetchingQuestionBankQuestionList (paging, response) {
      this.paging = paging
      if (response.length) {
        this.questions.push(...response)
        this.paging.page++
        this.state.loaded()
      } else {
        this.state.complete()
      }
    },
    failFetchingQuestionBankQuestionList () {
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
    },
    redirectToEditQuestionBankForm() {
      this.$router.push({
        name: 'editQuestionBank',
        params: {
          id: this.$route.params.bankId
        }
      })
    },
    redirectToQuestionForm() {
      this.$router.push({
        name: 'addQuestion',
        params: {
          bankId: this.$route.params.bankId
        }
      })
    },
    redirectToEditQuestionForm(id) {
      this.$router.push({
        name: 'editQuestion',
        params: {
          bankId: this.$route.params.bankId,
          questionId: id
        }
      })
    },
    redirectToQuestionDetail(id) {
      this.$router.push({
        name: 'questionBankQuestionDetail',
        params: {
          questionId: id,
          bankId: this.$route.params.bankId
        }
      })
    },
    openDeleteConfirmationModal(id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    closeDeleteConfirmationModal () {
      this.selectedId = ''
      this.showDeleteConfirmationModal = false
    },
    deleteItem() {
      !!this.selectedId ? this.deleteThisQuestion() : this.deleteThisBank()
    },
    deleteThisBank() {
      this.deleteQuestionBankById({
        data: {
          id: this.$route.params.bankId
        },
        callback: this.successDeletingBank,
        fail: this.failedDeletingBank
      })
    },
    successDeletingBank() {
      this.showDeleteConfirmationModal = false
      this.$toasted.success('Successfully deleted question bank')
      this.$router.push({
        name: 'scoringAdmin'
      })
    },
    failedDeletingBank() {
      this.$toasted.error('Something went wrong')
      this.showDeleteConfirmationModal = false
    },
    deleteThisQuestion() {
      this.deleteQuestionById({
        data: {
          bankId: this.$route.params.bankId,
          id: this.selectedId
        },
        callback: this.successDeletingQuestion,
        fail: this.failedDeletingQuestion
      })
    },
    successDeletingQuestion () {
      this.showDeleteConfirmationModal = false
      this.$toasted.success('Successfully deleted this question')
      this.$router.go()
    },
    failedDeletingQuestion () {
      this.showDeleteConfirmationModal = false
      this.$toasted.error('Something went wrong')
    }
  }

}
