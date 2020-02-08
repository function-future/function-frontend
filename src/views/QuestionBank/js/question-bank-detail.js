import { mapActions, mapGetters } from 'vuex'
const ListItem = () => import('@/components/list/ListItem')
const EmptyState = () => import('@/components/emptyState/EmptyState')
const ModalDeleteConfirmation = () => import('@/components/modals/ModalDeleteConfirmation')
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'QuestionBankDetail',
  components: {
    ListItem,
    EmptyState,
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
      infiniteId: +new Date(),
      isLoading: false,
      failLoadQuestion: false
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
    },
    questionEmpty() {
      return !(this.questions && this.questions.length)
    }
  },
  methods: {
    ...mapActions([
      'fetchQuestionBankDetail',
      'fetchQuestionBankQuestionList',
      'deleteQuestionBankById',
      'deleteQuestionById',
      'toast'
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
      this.toast({
        data: {
          message: 'Fail to load question bank',
          type: 'is-danger'
        }
      })
    },
    getQuestionList($state) {
      this.isLoading = true
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
      this.isLoading = false
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
      this.isLoading = false
      this.failLoadQuestion = true
      this.toast({
        data: {
          message: 'Fail to load questions',
          type: 'is-error'
        }
      })
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
      this.toast({
        data: {
          message: 'Successfully delete question bank',
          type: 'is-success'
        }
      })
      this.$router.push({
        name: 'scoringAdmin'
      })
    },
    failedDeletingBank() {
      this.toast({
        data: {
          message: 'Fail to delete question bank',
          type: 'is-danger'
        }
      })
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
      this.questions = []
      this.paging = {
        page: 1,
        size: 10,
        totalRecords: 10
      }
      this.infiniteId += 1
      this.toast({
        data: {
          message: 'Successfully deleted question',
          type: 'is-success'
        }
      })
    },
    failedDeletingQuestion () {
      this.showDeleteConfirmationModal = false
      this.toast({
        data: {
          message: 'Fail to delete question bank',
          type: 'is-danger'
        }
      })
    }
  }

}
