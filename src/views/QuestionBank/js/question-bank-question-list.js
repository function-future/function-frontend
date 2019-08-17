import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'QuestionBankAddQuestion',
  components: {
    BaseButton,
    BaseCard,
    ModalDeleteConfirmation,
    BasePagination
  },
  data () {
    return {
      showDeleteConfirmationModal: false,
      selectedId: '',
      paging: {
        page: 1,
        size: 10,
        totalRecords: 0
      }
    }
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
      'fetchQuestionBankQuestionList',
      'deleteQuestionById'
    ]),
    initPage () {
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
    successFetchingQuestionBankQuestionList (paging) {
      this.paging = paging
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
    },
    openDeleteConfirmationModal (id) {
      this.selectedId = id
      this.showDeleteConfirmationModal = true
    },
    closeDeleteConfirmationModal () {
      this.selectedId = ''
      this.showDeleteConfirmationModal = false
    },
    deleteThisQuestion () {
      this.deleteQuestionById({
        data: {
          id: this.selectedId,
          bankId: this.$route.params.bankId
        },
        callback: this.successDeletingQuestion,
        fail: this.failDeletingQuestion
      })
    },
    successDeletingQuestion () {
      this.$toasted.success('Successfully deleted question')
      this.closeDeleteConfirmationModal()
      this.initPage()
    },
    failDeletingQuestion () {
      this.$toasted.error('Something went wrong')
    },
    loadPage (page) {
      this.paging.page = page
      this.initPage()
    },
    loadPreviousPage () {
      this.paging.page = this.paging.page - 1
      this.initPage()
    },
    loadNextPage () {
      this.paging.page = this.paging.page + 1
      this.initPage()
    }
  }
}
