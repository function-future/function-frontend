import { mapActions, mapGetters } from 'vuex'
import BaseCard from '@/components/BaseCard'
import BaseButton from '@/components/BaseButton'
import ModalDeleteConfirmation from '@/components/modals/ModalDeleteConfirmation'
import BasePagination from '@/components/BasePagination'

export default {
  name: 'QuestionBanks',
  components: {
    BaseCard,
    BaseButton,
    ModalDeleteConfirmation,
    BasePagination
  },
  data () {
    return {
      paging: {
        page: 1,
        size: 10,
        totalRecords: 13
      },
      showDeleteConfirmationModal: false,
      selectedId: ''
    }
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
      'fetchQuestionBankList',
      'deleteQuestionBankById'
    ]),
    initPage () {
      this.fetchQuestionBankList({
        data: {
          page: this.paging.page,
          pageSize: this.paging.size
        },
        callback: this.successFetchingQuestionBankList,
        fail: this.failFetchingQuestionBankList
      })
    },
    successFetchingQuestionBankList (paging) {
      this.paging.page = paging.page
      this.paging.pageSize = paging.size
      this.paging.totalRecords = paging.totalRecords
    },
    failFetchingQuestionBankList () {
      this.$toasted.error('Something went wrong')
    },
    addQuestionBank () {
      this.$router.push({name: 'addQuestionBank'})
    },
    goToQuestionBankQuestions (id) {
      this.$router.push({
        name: 'questionBankQuestionList',
        params: {
          bankId: id
        }
      })
    },
    goToQuestionBankDetail (id) {
      this.$router.push({
        name: 'questionBankDetail',
        params: {
          bankId: id
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
    deleteThisQuestionBank () {
      this.deleteQuestionBankById({
        data: {
          id: this.selectedId
        },
        callback: this.successDeletingQuestionBank,
        fail: this.failDeletingQuestionBank
      })
    },
    successDeletingQuestionBank () {
      this.$toasted.success('Successfully deleted question bank')
      this.closeDeleteConfirmationModal()
    },
    failDeletingQuestionBank () {
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
    },
  }
}
